const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
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
  })
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
