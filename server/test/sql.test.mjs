import { jest, test, describe } from '@jest/globals';
import { SQLCommand, SQL, $in, $between, $forEach, $if, $values, $sets, $clause } from '../src/data/sql.mjs';
import { isEmpty } from '../src/utils.mjs';

describe('SQL 生成器测试', () => {
    test('select 1', () => {
        let cmd = SQL`SELECT 1`;
        expect(cmd.commandText).toBe('SELECT 1');
        expect(cmd.parameters).toEqual([]);
    });

    test('select with where', () => {
        let cmd = SQL`SELECT * FROM users WHERE id = ${1}`;
        expect(cmd.commandText).toBe('SELECT * FROM users WHERE id = ?');
        expect(cmd.parameters).toEqual([1]);
    });

    test('select with multiple conditions', () => {
        let model = {
            name: "John",
            age: 30
        };
        let cmd = SQL`SELECT * FROM users WHERE name = ${model.name} AND age > ${model.age}`;
        expect(cmd.commandText).toBe('SELECT * FROM users WHERE name = ? AND age > ?');
        expect(cmd.parameters).toEqual(["John", 30]);
    });

    test('select with between', () => {
        let start = 18;
        let end = 30;
        let cmd = SQL`SELECT * FROM users WHERE age ${$between(start, end)}`;
        expect(cmd.commandText).toBe('SELECT * FROM users WHERE age BETWEEN ? AND ?');
        expect(cmd.parameters).toEqual([start, end]);
    });

    test('select with in clause', () => {
        let ids = [1, 2, 3];
        let cmd = SQL`SELECT * FROM users WHERE id ${$in(ids)}`;
        expect(cmd.commandText).toBe('SELECT * FROM users WHERE id IN (?, ?, ?)');
        expect(cmd.parameters).toEqual([1, 2, 3]);
    });

    describe('forEach clause', () => {
        test('select with empty forEach', () => {
            let data = [];

            let cmd = SQL`SELECT * FROM users WHERE ${$forEach`name = ${"name"}`(data, "AND") || $clause("1=1")}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE 1=1');
            expect(cmd.parameters).toEqual([]);
        });

        test('select with forEach', () => {
            let data = [
                { name: "Alice", age: 30 },
                { name: "Bob", age: 25 },
                { name: "Charlie", age: 35 }
            ];

            let cmd = SQL`SELECT * FROM users WHERE ${$forEach`name = ${"name"}`(data, "OR")}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE name = ? OR name = ? OR name = ?');
            expect(cmd.parameters).toEqual(["Alice", "Bob", "Charlie"]);
        });
    });

    test('select with if clause', () => {
        let id = 0;
        let name = "John";
        let age = 25;
        let cmd = SQL`
            SELECT * FROM users WHERE id = ${id} 
            ${$if(id > 0)`AND age = ${age}`
                .elseif(id === 0)`AND name = ${name}`
                .else`AND name is null`}
        `;
        let text = cmd.commandText.replace(/\s+/g, ' ').trim();
        expect(text).toBe('SELECT * FROM users WHERE id = ? AND name = ?');
        expect(cmd.parameters).toEqual([id, "John"]);
    });

    describe('insert with values', () => {
        test('insert with object values', () => {
            let user = {
                name: "Alice",
                age: 30
            };
            let cmd = SQL`INSERT INTO t_user ${$values(user)}`;
            expect(cmd.commandText).toBe('INSERT INTO t_user (name, age) VALUES (?, ?)');
            expect(cmd.parameters).toEqual(['Alice', 30]);
        });

        test('insert with object values and mapper', () => {
            let user = {
                name: "Alice",
                age: 30
            };
            let cmd = SQL`INSERT INTO t_user ${$values(user, item => {
                return {
                    column: `c_${item.column}`,
                    value: item.value
                };
            })}`;
            expect(cmd.commandText).toBe('INSERT INTO t_user (c_name, c_age) VALUES (?, ?)');
            expect(cmd.parameters).toEqual(['Alice', 30]);
        });

        test('insert with array values', () => {
            let user = ["Alice", 30];
            let cmd = SQL`INSERT INTO t_user ${$values(user)}`;
            expect(cmd.commandText).toBe('INSERT INTO t_user VALUES (?, ?)');
            expect(cmd.parameters).toEqual(['Alice', 30]);
        });

        test('inset with array values and mapper', () => {
            let users = [
                { name: "Alice"}, { age: 30 }
            ];
            let cmd = SQL`INSERT INTO t_user ${$values(users, item => {
                let key = Object.keys(item)[0];
                return {
                    column: `c_${key}`,
                    value: item[key]
                };
            })}`;
            expect(cmd.commandText).toBe('INSERT INTO t_user (c_name, c_age) VALUES (?, ?)');
            expect(cmd.parameters).toEqual(['Alice', 30]);
        });

        test('insert with single value', () => {

            let cmd = SQL`INSERT INTO t_user ${$values("Alice")}`;
            expect(cmd.commandText).toBe('INSERT INTO t_user VALUES (?)');
            expect(cmd.parameters).toEqual(['Alice']);
        });

        describe('update with sets', () => {
            test('update with object sets', () => {
                let user = {
                    name: "Alice",
                    age: 30,
                    status: null
                };
                let id = 1;
                let cmd = SQL`UPDATE t_user ${$sets(user)} WHERE id = ${id}`;
                expect(cmd.commandText).toBe('UPDATE t_user SET name = ?, age = ?, status = ? WHERE id = ?');
                expect(cmd.parameters).toEqual(['Alice', 30, null, id]);
            });

            test('update with object sets and mapper', () => {
                let user = {
                    id: 1,
                    name: "Alice",
                    age: 30,
                    status: null
                };
                let cmd = SQL`UPDATE t_user ${$sets(user, item => {
                    if(item.column !== 'id' && item.value !== null) {
                        return {
                            column: `c_${item.column}`,
                            value: item.value
                        };
                    }
                })} WHERE id = ${user.id}`;
                expect(cmd.commandText).toBe('UPDATE t_user SET c_name = ?, c_age = ? WHERE id = ?');
                expect(cmd.parameters).toEqual(['Alice', 30, user.id]);
            });
        });

        describe('delete with where', () => {
            test('delete with id', () => {
                let id = 1;
                let cmd = SQL`DELETE FROM t_user WHERE id = ${id}`;
                expect(cmd.commandText).toBe('DELETE FROM t_user WHERE id = ?');
                expect(cmd.parameters).toEqual([id]);
            });

            test('delete with multiple conditions', () => {
                let name = "Alice";
                let age = 30;
                let cmd = SQL`DELETE FROM t_user WHERE name = ${name} AND age > ${age}`;
                expect(cmd.commandText).toBe('DELETE FROM t_user WHERE name = ? AND age > ?');
                expect(cmd.parameters).toEqual(['Alice', 30]);
            });
        });

        test('complex sql command', () => {
            let id = 1;
            let name = "Alice";
            let ageStart = 20;
            let ageEnd = 30;
            let cmd = SQL`
                SELECT * FROM t_user 
                WHERE id = ${id} 
                    ${$if(!isEmpty(name))`AND name = ${name}`}
                    AND age ${$between(ageStart, ageEnd)} 
                    AND status ${$in([1, 2, 3])}
            `;
            let text = cmd.commandText.replace(/\s+/g, ' ').trim();
            expect(text).toBe('SELECT * FROM t_user WHERE id = ? AND name = ? AND age BETWEEN ? AND ? AND status IN (?, ?, ?)');
            expect(cmd.parameters).toEqual([id, name, ageStart, ageEnd, 1, 2, 3]);
        });

        test('change parameters placeholder', () => {
            let id = 1;
            let name = "Alice";
            let cmd = SQL(index => `$${index + 1}`)`SELECT * FROM users WHERE id = ${id} AND name = ${name}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE id = $1 AND name = $2');
            expect(cmd.parameters).toEqual([1, "Alice"]);
        });
    });
});