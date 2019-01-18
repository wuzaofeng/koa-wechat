const client = require('./index')
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
      const data = '你麻痹'
      const res = await client.aiTranslate(token, data, 'zh_CN', 'en_US')
      reply = JSON.stringify(res)
    }

    ctx.body = reply
  }
  await next()
}
