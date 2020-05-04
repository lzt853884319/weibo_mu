/**
 * @description user API 路由
 * @author lzt
 */

//  接受参数  解析参数  返回结果

const router = require("koa-router")();
const {isExist, register, login} = require("../../controller/user");
const userValidate = require("../../validator/use");
const {generateValidator} = require("../../middleware/validator");

router.prefix("/api/user");

// 注册
router.post("/register", generateValidator(userValidate), async (ctx, _next) => {
    const {userName, password, gender} = ctx.request.body;
    ctx.body = await register({
        userName,
        password,
        gender
    });
});

// 用户是否存在
router.post("/isExist", async (ctx, _next) => {
    const {userName} = ctx.request.body;
    // controller
    ctx.body = await isExist(userName);
});

// 登录
router.post("./login", async (ctx, _next) => {
    const {userName, password} = ctx.request.body;
    ctx.body = await login(ctx, userName, password);
    // controller
});
module.exports = router;