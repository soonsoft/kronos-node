
function buildClause(strings, values, parameters) {
    const result = [strings[0]];
    values = Array.isArray(values) ? values : [values];
    for(let i = 0; i < values.length; i++) {
        let value = values[i];
        if(value instanceof SQLClause) {
            if(value instanceof SQLIfClause) {
                for(let fn of value.predicateList) {
                    if(fn(value)) {
                        break;
                    }
                }
            }
            result.push(value.clause, strings[i + 1]);
            parameters.push(...value.parameters);
        } else {
            result.push("?", strings[i + 1]);
            parameters.push(value);
        }
    }
    return result.join("");
}

class SQLCommand {
    #parameters;
    #commandText;

    constructor() {
        this.#parameters = [];
        this.#commandText = "";
    }

    sql(strings, ...values) {
        this.#commandText = buildClause(strings, values, this.#parameters);
        return this.#commandText;
    }

    in(values) {
        if(!Array.isArray(values)) {
            values = [values];
        }

        let result = [];
        let parameters = [];
        for(let value of values) {
            result.push("?");
            parameters.push(value);
        }

        let clause = new SQLClause(`IN (${result.join(", ")})`, parameters);
        return clause;
    }

    between(start, end) {
        let clause = new SQLClause("BETWEEN ? AND ?");
        clause.addParameters(start, end);
        return clause;
    }

    forEach(strings, ...values) {
        return (data, joiner = "AND") => {
            data = Array.isArray(data) ? data : [data];
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
    SQLCommand
};