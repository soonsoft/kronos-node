import config from "../src/config.mjs";
import { PostgreSQLHelper } from "../src/data/postgresql.mjs";
import { SQLCommand, SQL, $in, $between, $forEach, $if, $values, $sets, $clause } from "../src/data/sql.mjs";

// console.log(sql`SELECT * FROM users WHERE id = ${1}`); // 输出: SELECT * FROM users WHERE id = 1
// console.log(sql`SELECT * FROM users WHERE name = ${"John"} AND age > ${30}`); // 输出: SELECT * FROM users WHERE name = 'John' AND age > 30
// console.log(sql`SELECT * FROM users WHERE active = ${true}`); // 输出: SELECT * FROM users WHERE active = true

// let inClause = [1, 2, 3];
// console.log(sql`SELECT * FROM users WHERE id ${$in(inClause)}`); // 输出

// let data = [
//     { name: "Alice", age: 30 },
//     { name: "Bob", age: 25 },
//     { name: "Charlie", age: 35 }
// ];

// console.log(sql`SELECT * FROM users WHERE ${forEach`name = ${"name"}`(data, "and")}`); // 输出: SELECT * FROM users WHERE name 'Alice', 'Bob', 'Charlie'

// let cmd = new SQLCommand();
// cmd.sql`SELECT * FROM users WHERE id = ${1} AND name = ${"John"}`;
// console.log(`SQL = ${cmd.commandText}`); // 输出: SELECT * FROM users WHERE id = 1 AND name
// console.log(`Parameters = ${JSON.stringify(cmd.parameters)}`); // 输出: Parameters = []

// let betweenCmd = new SQLCommand();
// let id = 1;
// let name = "John";
// betweenCmd.sql`SELECT * FROM users WHERE id = ${id} and name = ${name} and age ${betweenCmd.between(18, 30)}`;
// console.log(`SQL = ${betweenCmd.commandText}`); // 输出: SELECT * FROM users WHER    E age between ? and ?
// console.log(`Parameters = ${JSON.stringify(betweenCmd.parameters)}`); // 输出: Parameters = [18, 30]

// let ifCmd = new SQLCommand();
// let id = -1;
// let name = "John";
// let age = 25;
// ifCmd.sql`
//     SELECT * FROM users WHERE id = ${id} 
//     ${ifCmd
//         .if(id > 0)`AND age = ${age}`
//         .elseif(id === 0)`AND name=${name}`
//         .else`AND name is null`}
// `;
// console.log(`SQL = ${ifCmd.commandText}`); // 输出: SELECT * FROM users WHERE id = 0 AND name is null
// console.log(`Parameters = ${JSON.stringify(ifCmd.parameters)}`); // 输出: Parameters = [0, "John"]

const dataSource = config.dataSource?.PostgreSQL;
let dbHelper = new PostgreSQLHelper(dataSource);
let id = "ccbf0e67-cd91-4e96-8602-d360b9521dcd";
let result = await dbHelper.execSelect(SQL(index => `$${index + 1}`)`SELECT * FROM auth_user WHERE user_id = ${id}`);
console.log("当前数据：", result);

let cellphone = "13800138000";
result = await dbHelper.execUpdate(SQL(index => `$${index + 1}`)`UPDATE auth_user SET cell_phone = ${cellphone} WHERE user_id = ${id}`);
console.log("更新结果：", result);

result = await dbHelper.execSelect(SQL(index => `$${index + 1}`)`SELECT * FROM auth_user WHERE user_id = ${id}`);
console.log("更新后数据：", result);

// 关闭
dbHelper.dispose();

