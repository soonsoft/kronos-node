import { isFunction } from "../utils.mjs";

const SQLParameterPlaceholder = "?";

function buildClause(strings, values, parameters) {
    const result = [strings[0]];
    values = Array.isArray(values) ? values : [values];
    for(let i = 0; i < values.length; i++) {
        let value = values[i];
        result.push(setSqlParam(value, parameters), strings[i + 1]);
    }
    return result.join("");
}

function setSqlParam(value, parameters) {
    if(value instanceof SQLClause) {
        if(value instanceof SQLIfClause) {
            for(let fn of value.predicateList) {
                if(fn(value)) {
                    break;
                }
            }
        }
        parameters.push(...value.parameters);
        return value.clause;
    } else {
        parameters.push(value);
        return SQLParameterPlaceholder;
    }
}

function clause(strings, ...values) {
    let clause = new SQLClause();
    strings = Array.isArray(strings) ? strings : [strings];
    clause.clause = buildClause(strings, values, clause.parameters);
    return clause;
}

class SQLCommand {
    #parameters;
    #commandText;
    #getSqlParam;

    constructor(getSqlParam = null) {
        this.#parameters = [];
        this.#commandText = "";
        this.#getSqlParam = getSqlParam;
    }

    sql(strings, ...values) {
        this.#commandText = buildClause(strings, values, this.#parameters);
        if(this.#getSqlParam && isFunction(this.#getSqlParam)) {
            let parts = this.#commandText.split(SQLParameterPlaceholder);
            this.#commandText = parts.map((part, index) => {
                if(index < parts.length - 1) {
                    return part + this.#getSqlParam(index);
                }
                return part;
            }).join("");
        }
        return this;
    }

    in(values) {
        if(!Array.isArray(values)) {
            values = [values];
        }

        let result = [];
        let parameters = [];
        for(let value of values) {
            result.push(SQLParameterPlaceholder);
            parameters.push(value);
        }

        let clause = new SQLClause(`IN (${result.join(", ")})`, parameters);
        return clause;
    }

    between(start, end) {
        let clause = new SQLClause(`BETWEEN ${SQLParameterPlaceholder} AND ${SQLParameterPlaceholder}`);
        clause.addParameters(start, end);
        return clause;
    }

    forEach(strings, ...values) {
        return (data, joiner = "AND") => {
            data = Array.isArray(data) ? data : ( data === null || data === undefined ? [] : [data]);
            if (data.length === 0) {
                return "";
            }
            const result = [];
            const foreachClause = new SQLClause();
            for(let item of data) {
                const vals = values.map(v => typeof v === "string" ? item[v] : v);
                result.push(buildClause(strings, ...vals, foreachClause.parameters));
            }
            foreachClause.clause = result.join(` ${String(joiner).toUpperCase()} `);
            return foreachClause;
        };
    }

    if(predicate) {
        let predicateList = [];
        return (strings, ...values) => {
            let ifClause = new SQLIfClause("", [], predicateList);
            predicateList.push(sqlClause => {
                if(predicate) {
                    sqlClause.clause = buildClause(strings, values, sqlClause.parameters);
                }
                return predicate;
            });
            return ifClause;
        };
    }

    values(data, mapper = null) {
        let columns = [];
        let values = [];

        function setItem(item) {
            if(isFunction(mapper)) {
                item = mapper(item);
            }
            if(item.column) {
                columns.push(item.column);
            }
            if(item.value) {
                values.push(item.value);
            } else {
                values.push(item);
            }
        }

        if(Array.isArray(data)) {
            for(let item of data) {
                setItem(item);
            }
        } else if(typeof data === "object") {
            for(let key in data) {
                setItem({ column: key, value: data[key] });
            }
        } else {
            setItem(data);
        }

        let insert = new SQLClause();
        let result = [];
        if(columns.length > 0) {
            result.push(`(${columns.join(", ")})`);
        }
        if(values.length > 0) {
            result.push(`VALUES (${values.map(() => SQLParameterPlaceholder).join(", ")})`);
            insert.addParameters(...values);
        }

        insert.clause = result.join(" ");
        return insert;
    }

    sets(data, mapper = null) {
        let updateClause = new SQLClause();
        let sets = [];

        function setItem(item) {
            if(isFunction(mapper)) {
                item = mapper(item);
            }
            if(item && item.column) {
                sets.push(`${item.column} = ${SQLParameterPlaceholder}`);
                updateClause.addParameters(item.value);
            }
        }

        if(Array.isArray(data)) {
            for(let item of data) {
                setItem(item);
            }
        } else if(typeof data === "object") {
            for(let key in data) {
                setItem({ column: key, value: data[key] });
            }
        } else {
            throw new Error("Invalid data type for sets. Expected object or array.");
        }

        if(sets.length > 0) {
            updateClause.clause = `SET ${sets.join(", ")}`;
        } else {
            updateClause.clause = "";
        }
        return updateClause;
    }

    get commandText() {
        return this.#commandText;
    }

    get parameters() {
        return this.#parameters;
    }
}

class SQLClause {
    #clause;
    #parameters;

    constructor(clause, parameters = []) {
        this.#clause = clause || "";
        this.#parameters = Array.isArray(parameters) ? parameters : [];
    }

    addParameters(...params) {
        this.#parameters.push(...params);
    }

    get parameters() {
        return this.#parameters;
    }

    get clause() {
        return this.#clause;
    }

    set clause(value) {
        this.#clause = value || "";
    }
}

class SQLIfClause extends SQLClause {
    #predicateList;
    constructor(clause, parameters = [], predicateList) {
        super(clause, parameters);
        this.#predicateList = predicateList || [];
    }

    elseif(predicate) {
        return (strings, ...values) => {
            this.#predicateList.push(sqlClause => {
                if(predicate) {
                    sqlClause.clause = buildClause(strings, values, sqlClause.parameters);
                }
                return predicate;
            });
            return this;
        };
    }

    else(strings, ...values) {
        this.#predicateList.push(sqlClause => {
            sqlClause.clause = buildClause(strings, values, sqlClause.parameters);
            return true;
        });
        return this;
    }

    get predicateList() {
        return this.#predicateList;
    }
}

export {
    SQLCommand,
    clause
};