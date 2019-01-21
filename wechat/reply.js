const { getWechat, getOAuth } = require('./index')
const client = getWechat()
exports.reply = async (ctx, next) => {
  const message = ctx.weixin
  const { access_token: token } = await client.fetchAccessToken()
  if (message.MsgType === 'text') {
    let content = message.Content
    let reply = 'Oh' + content
    if (content === '1') {
      reply = '第一'
    } else if (content === '2') {
      reply = '第二'
    } else if (content === '3') {
      reply = '第三'
    } else if (content === '15') {
      let qrData = {
        action_name: "QR_SCENE",
        action_info: {
          scene: {scene_id: 101}
        }
      }
      const Ticket = await client.createQrcode(token, qrData)
      const url = client.showQrcode(Ticket.ticket)
      reply = url
    } else if (content === '16') {
      const longurl = 'https://www.baidu.com/'
      const res = await client.createShortUrl({ token, longurl })
      reply = res.short_url
    } else if (content === '17') {
      const semanticData = {
        query:"查一下明天从杭州到北京的南航机票",
        city:"北京",
        category: "flight,hotel",
        uid: message.FromUserName
      }
      const res = await client.semantic(token, semanticData)
      reply = JSON.stringify(res)
    } else if (content === '18') {
      const data = '你好'
      const res = await client.aiTranslate(token, data, 'zh_CN', 'en_US')
      reply = JSON.stringify(res)
    } else if (content === '19') {
      const data = {
        "button": [{
          "name": "菜单3",
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
      await client.delMenu(token)
      await client.createMenu(token, data)
      reply = '创建成功'
    } else if (content === '20') {
      const data = {
        "button": [{
          "name": "菜单3",
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
      const rule = {
        "tag_id":"2",
        "sex":"1",
        "country":"中国",
        "province":"广东",
        "city":"广州",
        "client_platform_type":"2",
        "language":"zh_CN"
      }
      // await client.delMenu(token)
      await client.createMenu(token, data, rule)
      console.log(JSON.stringify(await client.getMenu(token)))
      reply = '创建成功'
    }

    ctx.body = reply
  } else if (message.MsgType === 'event') {
    console.log(message)
    let reply
    if (message.Event === 'CLICK') {
      reply = '被点击了 CLICK'
    } else if (message.Event === 'VIEW') {
      reply = '链接 VIEW'
    } else if (message.Event === 'scancode_push') {
      reply = '扫码推事件的事件推送 scancode_push'
    } else if (message.Event === 'scancode_waitmsg') {
      reply = '扫码推事件且弹出“消息接收中”提示框的事件推送 scancode_waitmsg'
    } else if (message.Event === 'pic_sysphoto') {
      reply = 'pic_sysphoto ：弹出系统拍照发图的事件推送'
    } else if (message.Event === 'pic_photo_or_album') {
      reply = 'pic_photo_or_album：弹出拍照或者相册发图的事件推送'
    } else if (message.Event === 'pic_weixin') {
      reply = 'pic_weixin：弹出微信相册发图器的事件推送'
    } else if (message.Event === 'location_select') {
      reply = 'location_select：弹出地理位置选择器的事件推送'
    } else if (message.Event === 'view_miniprogram') {
      reply = '点击菜单跳转小程序的事件推送'
    }
    ctx.body = reply
  }
  await next()
}
