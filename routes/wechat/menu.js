const router = require('koa-router')()
const Redis = require('koa-redis')
const Request = require('../../utils/request')
const url = require('../../config/url')
const config = require('../../config/config')
const Store = new Redis().client

router.prefix('/wechat/menu')

/** 创建自定义菜单 */
router.post('/create', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const data = {
    "button": [{
        "name": "菜单",
        "sub_button": [{
            "type": "view",
            "name": "百度搜索",
            "url": "http://www.baidu.com/"
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
      },
      {
        "name": "扫码",
        "sub_button": [{
            "type": "scancode_waitmsg",
            "name": "扫码带提示",
            "key": "rselfmenu_0_0",
            "sub_button": []
          },
          {
            "type": "scancode_push",
            "name": "扫码推事件",
            "key": "rselfmenu_0_1",
            "sub_button": []
          }
        ]
      }, {
        "name": "发图位置",
        "sub_button": [{
            "type": "pic_sysphoto",
            "name": "系统拍照发图",
            "key": "rselfmenu_1_0",
            "sub_button": []
          },
          {
            "type": "pic_photo_or_album",
            "name": "拍照或者相册发图",
            "key": "rselfmenu_1_1",
            "sub_button": []
          },
          {
            "type": "pic_weixin",
            "name": "微信相册发图",
            "key": "rselfmenu_1_2",
            "sub_button": []
          },
          {
            "name": "发送位置",
            "type": "location_select",
            "key": "rselfmenu_2_0"
          }
        ]
      }
    ]
  }
  const res = await Request({
    method: 'post',
    url: url.menu.create,
    params: {
      access_token
    },
    data
  })
  ctx.body = res
})

/** 获取自定义菜单配置（第三方平台开发者可以通过本接口） */
router.get('/get_config', async (ctx) => {
  const access_token = await Store.hget(config.redis.wechat, config.redis.access_token)
  const res = await Request({
    url: url.menu.getconfig,
    params: {
      access_token
    }
  })
  ctx.body = res
})

module.exports = router