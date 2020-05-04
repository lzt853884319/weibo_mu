const router = require("koa-router")();
const {loginRedirect, loginCheck} = require("../middleware/loginCheck");

router.get("/", loginRedirect, async (ctx, _next) => {
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

router.get("/json", loginCheck, async (ctx, _next) => {
    ctx.body = {
        title: "koa2 json"
    };
});
router.get("/demo", async (ctx, _next) => {
    const session = ctx.session;
    if(null == session.viewNum) {
        session.viewNum = 0;
    } else {
        session.viewNum ++;
    }
    ctx.body = {
        title: "koa2 demo",
        viewNum: session.viewNum
    };
});

module.exports = router;
