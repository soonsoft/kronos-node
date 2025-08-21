import pg from 'pg';
import { isEmpty } from '../utils.mjs';
import { SQLCommand } from './sql.mjs';

class PostgreSQLHelper {
    #dataSource;
    constructor(dataSource) {
        this.#dataSource = dataSource;
        this.pool = new pg.Pool({
            host: this.#dataSource.HOST,
            port: this.#dataSource.PORT,
            user: this.#dataSource.USERNAME,
            password: this.#dataSource.PASSWORD,
            database: this.#dataSource.DATABASE,
            max: 10
        });
    }

    async query(sql, params) {
        if(sql instanceof SQLCommand) {
            let cmd = sql;
            sql = cmd.commandText;
            params = cmd.parameters;
        }
        if(!Array.isArray(params)) {
            params = isEmpty(params) ? [] : [params];
        }
        const client = await this.pool.connect();
        try {
            const res = await client.query(sql, params);
            return res.rows;
        } finally {
            client.release();
        }
    }

    async close() {
        await this.pool.end();
    }
}

export {
    PostgreSQLHelper
}