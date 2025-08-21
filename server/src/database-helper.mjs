import mysql from 'mysql2/promise'
import config from './config.mjs';
import { isFunction, isNumber } from './utils.mjs';

const databaseEnabled = config.DATABASE_ENABLED;
const CHAIN_COMMANDS = Symbol('CHAIN_COMMANDS');
let connectionPool = null;

if(databaseEnabled) {
    const mysqlDataSource = config.dataSource.MySQL || {};
    connectionPool = mysql.createPool({
        host: mysqlDataSource.HOST,
        port: mysqlDataSource.PORT,
        user: mysqlDataSource.USERNAME,
        password: mysqlDataSource.PASSWORD,
        database: mysqlDataSource.DATABASE,
        connectionLimit: 10
    });
}

async function getConnection() {
    if(!databaseEnabled) {
        throw new Error("Database disabled.");
    }
    return await connectionPool.getConnection();
}

async function execCommand(connection, sql, values) {
    return await connection.query(sql, values);
}

async function execUpdate(sql, values, connection = null) {
    let connectionCount = 1;
    try {
        if(!connection) {
            connection = await getConnection();
        } else {
            connectionCount++;
        }
        let [results] = await execCommand(connection, sql, values);
        return results.affectedRows;
    } catch(e) {
        throw e;
    } finally {
        connectionCount--;
        if(connectionCount === 0 && connection) {
            connection.release();
        }
    }
}

async function execSelect(sql, values, connection = null) {
    let connectionCount = 1;
    try {
        if(!connection) {
            connection = await getConnection();
        } else {
            connectionCount++;
        }
        let [results, fields] = await execCommand(connection, sql, values);
        return {
            data: results,
            fields
        };
    } catch(e) {
        throw e;
    } finally {
        connectionCount--;
        if(connectionCount === 0 && connection) {
            connection.release();
        }
    }
}

/**
 * 事务处理，配合 sqlCommandChain 使用
 * @param {*} chain 
 * @returns 
 */
async function beginTransaction(chain) {
    if(isFunction(chain)) {
        chain = sqlCommandChain(chain);
    }
    if(!isCommandChain(chain)) {
        throw new TypeError("Invalid command chain.");
    }

    let connection = null;
    let transactionCommit = true;
    try {
        connection = await getConnection();
        const ctx = {
            connection,
            execSelect: async (sql, values) => {
                return await execSelect(sql, values, connection);
            },
            execUpdate: async (sql, values) => {
                return await execUpdate(sql, values, connection);
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

function sqlCommandChain(cmdFn) {
    const commandList = [];
    const chain = {
        addCommand
    };
    function addCommand(fn) {
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

    addCommand(cmdFn);

    Object.defineProperty(chain, CHAIN_COMMANDS, {
        enumerable: false,
        get: () => commandList,
        writable: false
    });
    return chain;
}

function isCommandChain(obj) {
    return obj && obj[CHAIN_COMMANDS] && Array.isArray(obj[CHAIN_COMMANDS]);
}

export {
    execUpdate,
    execSelect,
    beginTransaction,
    sqlCommandChain
};
