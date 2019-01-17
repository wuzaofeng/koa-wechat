const router = require('koa-router')()
const Redis = require('koa-redis')
const Request = require('../../utils/request')
const url = require('../../config/url')
const Store = new Redis().client
const compiled = require('../../utils/ejs')
const config = require('../../config/config')

router.prefix('/wechat')

/** 获取acssess_token */
router.get('/access_token', async (ctx) => {
  const res = await Request({
    url: url.access_token,
    params: {
      grant_type: 'client_credential',
      appid: config.appID,
      secret: config.appsecret
    }
  })

  Store.hmset(config.redis.wechat, config.redis.access_token, res.access_token)
  Store.hmset(config.redis.wechat, config.redis.expires_in, res.expires_in)
  ctx.body = res
})

/** 获取微信服务器IP地址 */
router.get('/get_ip', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.getcallbackip,
    params: {
      access_token
    }
  })

  ctx.body = res
})

/** 网络检测 */
router.post('/check_network', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.checknetwork,
    params: {
      access_token
    },
    data: {
      action: "all",
      check_operator: "DEFAULT"
    }
  })

  ctx.body = res
})

/** 获取菜单 */
router.get('/get_menu', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.getmenu,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 删除所有菜单 */
router.get('/del_menu', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.delmenu,
    params: {
      access_token
    }
  })
  ctx.body = res
})

module.exports = router