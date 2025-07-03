import { isFunction } from "../utils.mjs";

let loginStateStorage;
const DefaultOptions = {
    excludeUrls: ["/", "/auth/*", "/login", "/logout", "/index.html", "/content/*", "/scripts/*", "/favicon.ico"],
    accessTokenName: "Authorization"
};

class SecurityManager {
    constructor(userState, loginStateStorage) {
        this.loginStateStorage = loginStateStorage;
        this.userManager = null;
        this.roleManager = null;
        this.userProfile = null;
    }

    isAuthenticated() {
        return this.authenticationToken !== null;
    }

    getCurrentUser() {

    }

    getUserManager() {

    }

    getRoleManager() {

    }

    getUserProfile() {

    }

    setUserState(userInfo) {
        let userState = {
            userInfo: userInfo,
            authenticationToken: {
                accessToken: "",
                refreshToken: "",
            },
            expiredAt: new Date(Date.now() + 3600 * 1000) // 1小时后过期
        };
    }

    #setAuthenticationToken(userState) {
        this.authenticationToken = token;
    }
}

function createLoginStateInSessionStorage(ctx) {

}

async function prepareAuthenticationToken(ctx, loginStateStorage, tokenName) {
    let accessToken = ctx.request.headers[accessTokenName];
    let userState = await loginStateStorage.getUserState(accessToken);
    ctx.securityManager = new SecurityManager(userState, loginStateStorage);
}

// 身份验证
async function authentication(ctx) {
    console.log("身份验证");
    if(!ctx.securityManager.isAuthenticated()) {
        ctx.throw(401, "Unauthenticated");
    }
}

// 权限验证
async function authorization() {
    console.log("权限验证");
}

function checkInclude(ctx, excludeUrls) {
    let url = ctx.url;
    if(Array.isArray(excludeUrls)) {
        for(let pattern of excludeUrls) {
            if(urlMatch(pattern, url)) {
                return false;
            }
        }
    }
    return true;
}

// 通配符URL匹配函数，忽略大小写，支持*匹配任意字符
function urlMatch(pattern, url) {
    if(pattern === url) {
        return true;
    }
    // 转义正则特殊字符，除了*
    let regexStr = pattern.replace(/[-/\\^$+?.()|[\]{}]/g, "\\$&");
    // 将*替换为.*
    regexStr = regexStr.replace(/\*/g, ".*");
    // 整体匹配
    regexStr = `^${regexStr}$`;
    const regex = new RegExp(regexStr, 'i'); // 忽略大小写
    return regex.test(url);
}

/*
    opitons = {
        loginStateStorage: function() {},
        excludeUrls: ["/auth/*"],
        accessTokenName: "Authorization"
    }
*/
function securityManager(options = {}) {
    options = Object.assign({}, DefaultOptions, options);
    loginStateStorage = 
        isFunction(options.loginStateStorage) ? options.loginStateStorage() : createLoginStateInSessionStorage();
    return async function(ctx, next) {
        await prepareAuthenticationToken(ctx, loginStateStorage, options.accessTokenName);
        if(checkInclude(ctx, options.excludeUrls)) {
            await(authentication(ctx));
            await(authorization(ctx));
        }

        await next();
    };
}

export {
    securityManager
};