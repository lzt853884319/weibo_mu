const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params;
  ctx.body = {
    title: 'this is profile',
    username
  }
})
router.get('/:loadMore/:pageIndex', async (ctx, next) => {
  const {username, pageIndex} = ctx.params;
  ctx.body = {
    title: `this is loadMore APi`,
    username,
    pageIndex
  }
})

router.post('/login', async (ctx, next) => {
  const {username, password  } = ctx.request.body;
  ctx.body = {
    title: `this is login`,
    username,
    passworld
  }
})


module.exports = router
