import { jest, test, describe } from '@jest/globals';
import { createJwtToken, verifyJwtToken } from '../src/security/jwt.mjs';

describe('JWT 模块测试', () => {
    describe('createJwtToken', () => {
        test('应该生成有效的 JWT', async () => {
            const userInfo = { userId: 123, username: 'testUser' };
            const jwt = await createJwtToken(userInfo, 'myKey');
            expect(jwt).toBeDefined();
            expect(typeof jwt).toBe('string');
            expect(jwt.split('.').length).toBe(3); // JWT 应该有三个
            console.log("Generated JWT:", jwt);
        });
    });
});