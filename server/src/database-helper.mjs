import mysql from 'mysql2/promise'
import config from './config.mjs';

const databaseEnabled = config.DATABASE_ENABLED;
let connectionPool = null;

if(databaseEnabled) {
    connectionPool = mysql.createPool({
        host: config.dataSource.HOST,
        port: config.dataSource.PORT,
        user: config.dataSource.USERNAME,
        password: config.dataSource.PASSWORD,
        database: config.dataSource.DATABASE,
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

async function execUpdate(sql, values) {
    let connection = null;
    try {
        connection = await getConnection();
        let [results] = await execCommand(connection, sql, values);
        return results.affectedRows;
    } catch(e) {
        throw e;
    } finally {
        if(connection) {
            connection.release();
        }
    }
}

async function execSelect(sql, values) {
    let connection = null;
    try {
        connection = await getConnection();
        let [results, fields] = await execCommand(connection, sql, values);
        return {
            data: results,
            fields
        };
    } catch(e) {
        throw e;
    } finally {
        if(connection) {
            connection.release();
        }
    }
}

async function beginTransaction(commands) {
    if(!Array.isArray(commands) || commands.length === 0) {
        return null;
    }

    let connection = null;
    let transactionCommit = true;
    try {
        connection = await getConnection();
        const execSelect = (sql, values) => {

        };
        const execUpdate = (sql, values) => {

        };
        for(let i = 0; i < commands.length; i++) {
            let command = commands[i];
            if(typeof command === "function") {
                command
            }
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
    }
}

export {
    execUpdate,
    execSelect,
    beginTransaction
};
