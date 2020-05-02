const router = require("koa-router")();

router.get("/", async (ctx, _next) => {
  await ctx.render("index", {
    title: "Hello Koa 2!",
    name: "drdp",
    isMe: true,
    blogList: [{
      id: 1,
      title: "aaaa",
    },{
      id: 2,
      title: "bbbb",
    },
    {
      id: 1,
      title: "cccc",
    }]
  });
});

router.get("/json", async (ctx, _next) => {
  ctx.throw(400, "name required");
  ctx.body = {
    title: "koa2 json"
  };
});

module.exports = router;
