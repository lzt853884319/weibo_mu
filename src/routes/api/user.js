/**
 * @description user API 路由
 * @author lzt
 */

//  接受参数  解析参数  返回结果

const router = require("koa-router")();
const {isExist, register} = require("../../controller/user");

router.prefix("/api/user");

// 注册
router.post("/register", async (ctx, _next) => {
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
module.exports = router;