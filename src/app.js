const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const logger = require("koa-logger");

const session = require("koa-generic-session");
const redisStore = require("koa-redis");

// 路由
const index = require("./routes/index");
const users = require("./routes/users");
const errorViewRouter = require("./routes/view/error");
const { isProd } = require("./utils/env");
const {REDIS_CONF} = require("./conf/db");

// error handler

const onErrConfig = isProd ? {
  redirect: "error"
} : {};

onerror(app, onErrConfig);

// middlewares
app.use(bodyparser({
  enableTypes:["json", "form", "text"]
}));
app.use(json());
app.use(logger());
app.use(require("koa-static")(__dirname + "/public"));

app.use(views(__dirname + "/views", {
  extension: "ejs"
}));

app.keys = ["UDIasdf_keys"];
app.use(session({
  key: "weibo.sid", // cookie 的name  默认 koa.id
  prefix: "weibo:session", // redis key 的前缀 默认是 koa.sess
  cookie: {
    path: "/", // 根目录
    httpOnly: true, // 只能用服务器端改cookie
    maxAge: 24 * 60 * 60 * 1000, // 
  },
  // ttl: 24 * 60 * 60 * 1000, // redis过期时间  不写和cookie maxAge一样
  store: redisStore({
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routesa
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());
app.use(errorViewRouter.routes(), index.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  console.error("server error", err, ctx);
});

module.exports = app;
