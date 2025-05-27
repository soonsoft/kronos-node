import { router } from './src/router.mjs';
import * as crypto from 'crypto';
import config from './src/config.mjs';
import Koa from 'koa';
import { koaBody } from 'koa-body';
import logger from 'koa-logger';
import serve from 'koa-static';
import session from 'koa-session';

function createInMemorySessionStore() {
  const map = new Map();
  return {
    get: map.get.bind(map),
    set: map.set.bind(map),
    destroy: map.delete.bind(map),
  };
}

const app = new Koa();

// 全局错误中间件
app.use(async (ctx, next) => {
  try {
    await next();
    if (ctx.status === 404) throw new HttpException(404, 'Not Found');
  } catch (err) {
    ctx.status = err.code || 500;
    ctx.body = {
      code: ctx.status,
      message: err.message,
      request: `${ctx.method} ${ctx.path}`,
      timestamp: new Date().toISOString()
    };
    // 触发 Koa 的 error 事件
    ctx.app.emit('error', err, ctx);
  }
});

// 全局错误监听
app.on('error', (err, ctx) => {
  console.error('Error:', err.message, 'Path:', ctx.path);
});

// 请求数据处理
app.use(koaBody());

// (Optional) Log all requests to this server
app.use(logger());

// Serve the static frontend
app.use(serve('./client'));

// Manage sessions using an in-memory session store and signed, SameSite=Lax, HttpOnly cookies
app.keys = [crypto.randomBytes(8).toString('hex')];
app.use(session({ store: createInMemorySessionStore(), sameSite: 'lax', httpOnly: true }, app));

// Serve the backend routes
app.use(router.routes()).listen(config.SERVER_PORT);

console.log(`[INFO]: Server started at http://localhost:${config.SERVER_PORT}\n`);
