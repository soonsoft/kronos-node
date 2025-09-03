import mysql from 'mysql2/promise'
import { execCommand, prepareArguments, createCommandChain } from './database.mjs';

class MySQLHelper {
    #dataSource;
    #connectionPool = null;

    constructor(dataSource) {
        this.#dataSource = dataSource;
        this.#connectionPool = mysql.createPool({
            host: this.#dataSource.HOST,
            port: this.#dataSource.PORT,
            user: this.#dataSource.USERNAME,
            password: this.#dataSource.PASSWORD,
            database: this.#dataSource.DATABASE,
            connectionLimit: this.#dataSource.CONNECTION_LIMIT || 10
        });
    }

    async getConnection() {
        return await this.#connectionPool.getConnection();
    }

    async execSelect(sqlText, params, connection = null) {
        let { sql, sqlParams } = prepareArguments(sqlText, params);
        let connectionCount = 1;
        try {
            if(!connection) {
                connection = await this.getConnection();
            } else {
                connectionCount++;
            }
            let [results, fields] = await execCommand(connection, sql, sqlParams);
            return {
                data: results,
                fields
            };
        } finally {
            connectionCount--;
            if(connectionCount === 0 && connection) {
                connection.release();
            }
        }
    }

    async execUpdate(sqlText, params, connection = null) {
        let { sql, sqlParams } = prepareArguments(sqlText, params);
        let connectionCount = 1;
        try {
            if(!connection) {
                connection = await this.getConnection();
            } else {
                connectionCount++;
            }
            let [results] = await execCommand(connection, sql, sqlParams);
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

    beginTransaction(cmdFn) {
        return createCommandChain(cmdFn, this);
    }

    async dispose() {
        await this.#connectionPool.end();
    }
}

export {
    MySQLHelper
}