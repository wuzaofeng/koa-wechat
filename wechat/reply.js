exports.reply = async (ctx, next) => {
  const message = ctx.weixin
  if (message.MsgType === 'text') {
    let content = message.Content
    let reply = 'Oh' + content
    if (content === '1') {
      reply = '第一'
    } else if (content === '2') {
      reply = '第二'
    } else if (content === '3') {
      reply = '第三'
    }
    ctx.body = reply
  }
  await next()
}
