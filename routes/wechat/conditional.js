const router = require('koa-router')()
const Redis = require('koa-redis')
const Request = require('../../utils/request')
const url = require('../../config/url')
const config = require('../../config/config')
const Store = new Redis().client

// 个性化菜单接口微信只对已认证的公众号开放使用接口权限
router.prefix('/wechat/conditional')

/** 创建个性化菜单 */
router.post('/create', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const data = {
    "button": [{
        "type": "click",
        "name": "今日歌曲",
        "key": "V1001_TODAY_MUSIC"
      },
      {
        "name": "菜单",
        "sub_button": [{
            "type": "view",
            "name": "搜索",
            "url": "http://www.soso.com/"
          },
          {
            "type": "miniprogram",
            "name": "wxa",
            "url": "http://mp.weixin.qq.com",
            "appid": "wx286b93c14bbf93aa",
            "pagepath": "pages/lunar/index"
          },
          {
            "type": "click",
            "name": "赞一下我们",
            "key": "V1001_GOOD"
          }
        ]
      }
    ],
    "matchrule": {
      "tag_id": "2",
      "sex": "2",
      "country": "中国",
      "province": "广东",
      "city": "广州",
      "client_platform_type": "2",
      "language": "ms"
    }
  }
  const res = await Request({
    method: 'post',
    url: url.conditional.create,
    params: {
      access_token
    },
    data
  })
  console.log(res)
  ctx.body = res
})

module.exports = router