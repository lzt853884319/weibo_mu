/**
 * @description user API 路由
 * @author lzt
 */

const router = require("koa-router")();
const {isExist} = require("../../controller/user");

router.prefix("/api/user");

// 注册
router.post("/register", async (_ctx, _next) => {

});

// 用户是否存在
router.post("/isExist", async (ctx, _next) => {
    const {userName} = ctx.request.body;
    // controller
    ctx.body = await isExist(userName);
});
module.exports = router;