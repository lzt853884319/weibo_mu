/**
 * @description user handle 路由
 * @author lzt 2020-05-02
 */

const router = require("koa-router")();

router.get("/login", async (ctx, _next) => {
    await ctx.render("login", {

    });
});
router.get("/register", async (ctx, _next) => {
    await ctx.render("register", {

    });
});

module.exports = router;