const router = require('koa-router')()
const Redis = require('koa-redis')
const Wechat = require('../../controllers/wechat')

router.prefix('/wechat')

// 进入微信消息中间件
router.get('/wx-hear', Wechat.hear)
router.post('/wx-hear', Wechat.hear)

// 跳到授权的中间服务页面
router.get('/wx-oauth', Wechat.oauth)

// 通过code 获取用户信息
router.get('/userinfo', Wechat.userInfo)

/** 获取微信服务器IP地址 */
// router.get('/get_ip', async (ctx) => {
//   const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
//   const res = await Request({
//     url: url.getcallbackip,
//     params: {
//       access_token
//     }
//   })

//   ctx.body = res
// })

// /** 网络检测 */
// router.post('/check_network', async (ctx) => {
//   const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
//   const res = await Request({
//     method: 'post',
//     url: url.checknetwork,
//     params: {
//       access_token
//     },
//     data: {
//       action: "all",
//       check_operator: "DEFAULT"
//     }
//   })

//   ctx.body = res
// })

module.exports = router