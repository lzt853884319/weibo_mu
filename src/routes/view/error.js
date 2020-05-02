/**
 * @description catch error
 * @author drdp
 */

const router = require("koa-router")();

router.get("/error", async (ctx, _next) => {
    await ctx.render("error");
});

router.get("*", async (ctx, _next) => {
    await ctx.render("404");
});
module.exports = router;
