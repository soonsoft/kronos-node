import pg from 'pg';
import { isEmpty } from '../utils.mjs';
import { SQLCommand } from './sql.mjs';

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
            max: 10
        });
    }

    async getConnection() {
        return await this.#connectionPool.connect();
    }

    async execCommand(connection, sql, values) {
        return await connection.query(sql, values);
    }

    async execSelect(sql, params, connection = null) {
        if(sql instanceof SQLCommand) {
            let cmd = sql;
            sql = cmd.commandText;
            params = cmd.parameters;
        }
        if(!Array.isArray(params)) {
            params = isEmpty(params) ? [] : [params];
        }

        let connectionCount = 1;
        try {
            if(!connection) {
                connection = await this.getConnection();
            } else {
                connectionCount++;
            }
            const res = await this.execCommand(connection, sql, params);
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

    async execUpdate(sql, params, connection = null) {
        if(sql instanceof SQLCommand) {
            let cmd = sql;
            sql = cmd.commandText;
            params = cmd.parameters;
        }
        if(!Array.isArray(params)) {
            params = isEmpty(params) ? [] : [params];
        }

        let connectionCount = 1;
        try {
            if(!connection) {
                connection = await this.getConnection();
            } else {
                connectionCount++;
            }
            let res = await this.execCommand(connection, sql, params);
            return res.rowCount;
        } finally {
            connectionCount--;
            if(connectionCount === 0 && connection) {
                connection.release();
            }
        }
    }

    async dispose() {
        await this.#connectionPool.end();
    }
}

export {
    PostgreSQLHelper
}