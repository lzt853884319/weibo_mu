/**
 * @description user handle 路由
 * @author lzt 2020-05-02
 */

const router = require("koa-router")();
const {loginCheck} = require("../../middleware/loginCheck");
/**
 * 
 * @param {Object} ctx 
 */
const getLoginInfo = (ctx) => {
    let data = {
        isLogin: false
    };
    const userInfo = ctx.session.userInfo;
    if(userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        };
    }
    return data;
};

router.get("/login", async (ctx, _next) => {
    await ctx.render("login", getLoginInfo(ctx));
});
router.get("/register", async (ctx, _next) => {
    await ctx.render("register", getLoginInfo(ctx));
});

router.get("/setting", loginCheck, async (ctx, _next) => {
    await ctx.render("setting", ctx.session.userInfo);
});


module.exports = router;