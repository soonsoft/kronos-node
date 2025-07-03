import { router } from './src/router.mjs';
import Koa, { HttpError } from 'koa';
import { koaBody } from 'koa-body';
import logger from 'koa-logger';
import serve from 'koa-static';
import session from 'koa-session';
import { securityManager } from './src/security/security-manager.mjs';
import * as crypto from 'crypto';
import config from './src/config.mjs';

function createInMemorySessionStore() {
  const map = new Map();
  return {
    get: map.get.bind(map),
    set: map.set.bind(map),
    destroy: map.delete.bind(map),
  };
}

const app = new Koa();

// 全局捕获异常并处理错误(全局返回JSON)
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    // 触发 Koa 的 error 事件
    ctx.app.emit('error', err, ctx);
    let errorCode = 0;
    if(err instanceof HttpError) {
      errorCode = err.status || err.statusCode;
    } else {
      errorCode = err.code;
    }
    errorCode = errorCode || 500;
    ctx.set("Content-Type", "application/json");
    ctx.status = 200;
    ctx.body = {
        code: errorCode,
        message: err.message,
        request: `[${ctx.method}] ${ctx.path}`,
        timestamp: new Date().toISOString()
    };
  }
});

// 全局错误监听
app.on('error', (err, ctx) => {
    console.error('Error:', err.message, 'Path:', ctx.path);
});

// 身份验证框架
app.use(securityManager());

// 请求数据处理
app.use(koaBody());

// (Optional) Log all requests to this server
app.use(logger());

// Serve the static frontend
app.use(serve('./client', {
    index: "index.html"
}));

// Manage sessions using an in-memory session store and signed, SameSite=Lax, HttpOnly cookies
app.keys = [crypto.randomBytes(8).toString('hex')];
app.use(session({ store: createInMemorySessionStore(), sameSite: 'lax', httpOnly: true }, app));

// Serve the backend routes
app.use(router.routes()).listen(config.SERVER_PORT);

console.log(`[INFO]: Server started at http://localhost:${config.SERVER_PORT}\n`);
