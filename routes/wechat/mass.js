const router = require('koa-router')()
const Redis = require('koa-redis')
const Request = require('../../utils/request')
const url = require('../../config/url')
const config = require('../../config/config')
const Store = new Redis().client

router.prefix('/wechat/mass')

/** 群发图文消息
 * 1、 首先， 预先将图文消息中需要用到的图片， 使用上传图文消息内图片接口， 上传成功并获得图片 URL；
 * 2、 上传图文消息素材， 需要用到图片时， 请使用上一步获取的图片 URL；
 * 3、 使用对用户标签的群发， 或对 OpenID 列表的群发， 将图文消息群发出去， 群发时微信会进行原创校验， 并返回群发操作结果；
 * 4、 在上述过程中， 如果需要， 还可以预览图文消息、 查询群发状态， 或删除已群发的消息等。
 */

/** 群发图片、文本等其他消息类型
 * 1、 如果是群发文本消息， 则直接根据下面的接口说明进行群发即可；
 * 2、 如果是群发图片、 视频等消息， 则需要预先通过素材管理接口准备好 mediaID。
 */

/** 上传图文消息内的图片获取URL */
router.post('/uploadimg', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.uploadimg,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 上传图文消息素材 */
router.post('/uploadnews', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.uploadnews,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 根据标签进行群发 */
router.post('/sendall', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.sendall,
    params: {
      access_token
    },
    data: {
      "filter": {
        "is_to_all": true,
      },
      "text": {
        "content": "傻逼猪头陈"
      },
      "msgtype": "text"
    }
  })
  ctx.body = res
})

/** 根据OpenID列表群发 */
router.post('/send', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.send,
    params: {
      access_token
    },
    data: {
      "touser": [
        "OPENID1",
        "OPENID2"
      ],
      "msgtype": "text",
      "text": {
        "content": "hello from boxer."
      }
    }
  })
  ctx.body = res
})

/** 删除群发 */
router.post('/delete', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.delete,
    params: {
      access_token
    },
    data: {
      "msg_id": 30124,
      "article_idx": 2
    }
  })
  ctx.body = res
})

/** 预览接口 */
router.post('/preview', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.preview,
    params: {
      access_token
    },
    data: {
      "touser": "OPENID",
      "text": {
        "content": "CONTENT"
      },
      "msgtype": "text"
    }
  })
  ctx.body = res
})

/** 查询群发消息发送状态 */
router.post('/get', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.get,
    params: {
      access_token
    },
    data: {
      "msg_id": "201053012"
    }
  })
  ctx.body = res
})

/** 控制群发速度 */
router.post('/getspeed', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.getspeed,
    params: {
      access_token
    }
  })
  ctx.body = res
})

/** 设置群发速度 */
router.post('/setspeed', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    method: 'post',
    url: url.mass.setspeed,
    params: {
      access_token
    }
  })
  ctx.body = res
})



module.exports = router