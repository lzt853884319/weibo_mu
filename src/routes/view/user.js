/**
 * @description user handle 路由
 * @author lzt 2020-05-02
 */

const router = require("koa-router")();
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

module.exports = router;