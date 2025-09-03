import pg from 'pg';
import { isEmpty } from '../utils.mjs';
import { SQLCommand } from './sql.mjs';
import { execCommand, prepareArguments, createCommandChain } from './database.mjs';

class PostgreSQLHelper {
    #dataSource;
    #connectionPool = null;

    constructor(dataSource) {
        this.#dataSource = dataSource;
        this.#connectionPool = new pg.Pool({
            host: this.#dataSource.HOST,
            port: this.#dataSource.PORT,
            user: this.#dataSource.USERNAME,
            password: this.#dataSource.PASSWORD,
            database: this.#dataSource.DATABASE,
            max: this.#dataSource.CONNECTION_LIMIT || 10
        });
    }

    async getConnection() {
        return await this.#connectionPool.connect();
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
            const res = await execCommand(connection, sql, sqlParams);
            return {
                data: res.rows,
                fields: res.fields
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
            let res = await execCommand(connection, sql, sqlParams);
            return res.rowCount;
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
    PostgreSQLHelper
}