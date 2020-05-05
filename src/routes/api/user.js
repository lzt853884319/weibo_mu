/**
 * @description user API 路由
 * @author lzt
 */

//  接受参数  解析参数  返回结果

const router = require("koa-router")();
const {isExist, register, login, deleteCurUser, changeInfo, changePassword} = require("../../controller/user");
const userValidate = require("../../validator/use");
const {generateValidator} = require("../../middleware/validator");
const {isTest} = require("../../utils/env");
const {loginCheck} = require("../../middleware/loginCheck");

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
router.post("/login", async (ctx, _next) => {
    const {userName, password} = ctx.request.body;
    ctx.body = await login(ctx, userName, password);
    // controller
});

// 删除
router.post("/delete", loginCheck, async (ctx, _next) => {
    if(isTest) {
        // 测试环境下删除自己
        const {userName} = ctx.session.userInfo;
        // 调用controller
        ctx.body = await deleteCurUser(userName);
    }
});


// 修改个人信息
router.patch("/changeInfo", loginCheck, generateValidator(userValidate), async (ctx, _next) => {
    const {city, picture, nickName} = ctx.request.body;
    ctx.body = await changeInfo(ctx, {city, picture, nickName});
    // controller
});

// 修改密码
router.patch("/changePassword", loginCheck, generateValidator(userValidate), async (ctx, _next) => {
    const {password, newPassword} = ctx.request.body;
    const {userName} = ctx.session.userInfo;
    ctx.body = await changePassword(userName, password, newPassword,)
});
module.exports = router;