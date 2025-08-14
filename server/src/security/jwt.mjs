import { jwtVerify, SignJWT } from "jose";

async function createJwtToken(userInfo, secretKey, expiresIn = '2h') {
    try {
        const jwt = await new SignJWT({ userInfo })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime(expiresIn)
            .sign(new TextEncoder().encode(secretKey));
        return jwt;
    } catch (error) {
        console.error("JWT creation failed:", error);
        return null;
    }
}

async function verifyJwtToken(token, secretKey) {
    try {
        const { payload } = await jwtVerify(token, new TextEncoder().encode(secretKey));
        return payload;
    } catch (error) {
        console.error("JWT verification failed:", error);
        return null;
    }
}

export { 
    createJwtToken, 
    verifyJwtToken 
};