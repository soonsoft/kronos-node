import { SQLCommand } from "../src/data/sql.mjs";

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

let ifCmd = new SQLCommand();
let id = -1;
let name = "John";
let age = 25;
ifCmd.sql`
    SELECT * FROM users WHERE id = ${id} 
    ${ifCmd
        .if`AND age = ${age}`(id > 0)
        .elseif`AND name=${name}`(id === 0)
        .else`AND name is null`}
`;
console.log(`SQL = ${ifCmd.commandText}`); // 输出: SELECT * FROM users WHERE id = 0 AND name is null
console.log(`Parameters = ${JSON.stringify(ifCmd.parameters)}`); // 输出: Parameters = [0, "John"]