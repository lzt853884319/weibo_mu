const router = require("koa-router")();

router.prefix("/users");

router.get("/", function (ctx, _next) {
  ctx.body = "this is a users response!";
});

router.get("/bar", function (ctx, _next) {
  ctx.body = "this is a users/bar response";
});

router.get("/profile/:username", async (ctx, _next) => {
  const {username} = ctx.params;
  ctx.body = {
    title: "this is profile",
    username
  };
});
router.get("/:loadMore/:pageIndex", async (ctx, _next) => {
  const {username, pageIndex} = ctx.params;
  ctx.body = {
    title: "this is loadMore APi",
    username,
    pageIndex
  };
});

router.post("/login", async (ctx, _ext) => {
  const {username, password  } = ctx.request.body;
  ctx.body = {
    title: "this is login",
    username,
    password
  };
});


module.exports = router;
