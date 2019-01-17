const router = require('koa-router')()
const Redis = require('koa-redis')
const Request = require('../../utils/request')
const url = require('../../config/url')
const config = require('../../config/config')
const Store = new Redis().client
router.prefix('/wechat/kfaccount')
/**
 * 需要开通微信认证，由于是个人订阅号无此功能
 * 详情请了解 https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140547
 */

/** 添加客服帐号 */
router.post('/add', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.kfaccount.add,
    params: {
      access_token
    },
    data: {
      "kf_account": "",
      "nickname": "客服1",
      "password": "pswmd5",
    }
  })
  ctx.body = res
})

/** 修改客服帐号 */
router.post('/update', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.kfaccount.update,
    params: {
      access_token
    },
    data: {
      "kf_account": "test1@test",
      "nickname": "客服1",
      "password": "pswmd5",
    }
  })
  ctx.body = res
})

/** 删除客服帐号 */
router.post('/delete', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.kfaccount.delete,
    params: {
      access_token
    },
    data: {
      "kf_account": "test1@test",
      "nickname": "客服1",
      "password": "pswmd5",
    }
  })
  ctx.body = res
})

/** 设置客服帐号的头像 */
router.post('/uploadheadimg', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.kfaccount.delete,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 客服帐号管理 */
router.get('/getkflist', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.kfaccount.get,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 客服接口-发消息 */
router.get('/send', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.kfaccount.send,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 客服输入状态 */
router.post('/typing', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.kfaccount.typing,
    params: {
      access_token
    }
  })
  ctx.body = res
})



module.exports = router