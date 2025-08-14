import { jest, test, describe } from '@jest/globals';
import { SQLCommand } from '../src/data/sql.mjs';

describe('SQL 生成器测试', () => {
    describe('select command', () => {
        test('select 1', () => {
            let cmd = new SQLCommand();
            cmd.sql`SELECT 1`;
            expect(cmd.commandText).toBe('SELECT 1');
            expect(cmd.parameters).toEqual([]);
        });

        test('select with where', () => {
            let cmd = new SQLCommand();
            cmd.sql`SELECT * FROM users WHERE id = ${1}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE id = ?');
            expect(cmd.parameters).toEqual([1]);
        });

        test('select with multiple conditions', () => {
            let model = {
                name: "John",
                age: 30
            };
            let cmd = new SQLCommand();
            cmd.sql`SELECT * FROM users WHERE name = ${model.name} AND age > ${model.age}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE name = ? AND age > ?');
            expect(cmd.parameters).toEqual(["John", 30]);
        });

        test('select with between', () => {
            let start = 18;
            let end = 30;
            let cmd = new SQLCommand();
            cmd.sql`SELECT * FROM users WHERE age ${cmd.between(start, end)}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE age BETWEEN ? AND ?');
            expect(cmd.parameters).toEqual([start, end]);
        });

        test('select with in clause', () => {
            let ids = [1, 2, 3];
            let cmd = new SQLCommand();
            cmd.sql`SELECT * FROM users WHERE id ${cmd.in(ids)}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE id IN (?, ?, ?)');
            expect(cmd.parameters).toEqual([1, 2, 3]);
        });

        test('select with forEach', () => {
            let data = [
                { name: "Alice", age: 30 },
                { name: "Bob", age: 25 },
                { name: "Charlie", age: 35 }
            ];
            let cmd = new SQLCommand();
            cmd.sql`SELECT * FROM users WHERE ${cmd.forEach`name = ${"name"}`(data, "OR")}`;
            expect(cmd.commandText).toBe('SELECT * FROM users WHERE name = ? OR name = ? OR name = ?');
            expect(cmd.parameters).toEqual(["Alice", "Bob", "Charlie"]);
        });

        test('select with if clause', () => {
            let id = 0;
            let name = "John";
            let age = 25;
            let cmd = new SQLCommand();
            cmd.sql`
                SELECT * FROM users WHERE id = ${id} 
                ${cmd
                    .if`AND age = ${age}`(id > 0)
                    .elseif`AND name = ${name}`(id === 0)
                    .else`AND name is null`}
            `;
            let text = cmd.commandText.replace(/\s+/g, ' ').trim();
            expect(text).toBe('SELECT * FROM users WHERE id = ? AND name = ?');
            expect(cmd.parameters).toEqual([id, "John"]);
        });
    });
});