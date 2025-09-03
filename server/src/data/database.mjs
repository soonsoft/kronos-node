import { SQLCommand } from "./sql.mjs";

async function execCommand(connection, sql, values) {
    return await connection.query(sql, values);
}

function prepareArguments(sql, sqlParams) {
    if(sql instanceof SQLCommand) {
        let cmd = sql;
        sql = cmd.commandText;
        sqlParams = cmd.parameters;
    }
    if(!Array.isArray(sqlParams)) {
        sqlParams = isEmpty(sqlParams) ? [] : [sqlParams];
    }
    return { sql, sqlParams };
}

function createCommandChain(cmdFn, dbHelper) {
    const commandList = [];
    const chain = {};
    Object.defineProperty(chain, CHAIN_COMMANDS, {
        enumerable: false,
        get: () => commandList,
        writable: false
    });
    chain.add = fn => addCommand(fn, chain);
    chain.commit = async () => await tryCommit(dbHelper, chain);
    
    if(isFunction(cmdFn)) {
        chain.add(cmdFn);
    }
    return chain;
}

function addCommand(fn, chain) {
    const commandList = chain[CHAIN_COMMANDS];
    if(isFunction(fn)) {
        commandList.push(fn);
    } else if(Array.isArray(fn)) {
        fn.forEach(f => {
            if(isFunction(f)) {
                commandList.push(f);
            }
        });
    }
    return chain;
}

async function tryCommit(dbHelper, chain) {
    let connection = null;
    let transactionCommit = true;
    try {
        connection = await dbHelper.getConnection();
        const ctx = {
            connection,
            execSelect: async (sqlText, params) => {
                return await dbHelper.execSelect(sqlText, params, connection);
            },
            execUpdate: async (sqlText, params) => {
                return await dbHelper.execUpdate(sqlText, params, connection);
            }
        };
        let commands = chain[CHAIN_COMMANDS];
        for(let i = 0; i < commands.length; i++) {
            let command = commands[i];
            let result = await command(ctx);
            ctx.result = result;
        }
    } catch(e) {
        transactionCommit = false;
        throw e;
    } finally {
        if(transactionCommit) {
            await connection.commit();
        } else {
            await connection.rollback();
        }
        return ctx.result;
    }
}

function isCommandChain(obj) {
    return obj && obj[CHAIN_COMMANDS] && Array.isArray(obj[CHAIN_COMMANDS]);
}


export {
    execCommand,
    prepareArguments,
    createCommandChain,
    isCommandChain
}