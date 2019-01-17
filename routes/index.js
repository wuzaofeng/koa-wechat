const router = require('koa-router')()
const Redis = require('koa-redis')
router.get('/', async (ctx, next) => {
  ctx.body = '傻逼猪头陈，傻逼死肥猫'
})

module.exports = router
