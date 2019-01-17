const CryptoJS = require('crypto-js')
const util = require('../utils/util')
module.exports = (config, reply) => {
  return async (ctx, next) => {
    const {
      signature,
      timestamp,
      nonce,
      echostr
    } = ctx.query
    const token = config.token
    const str = [token, timestamp, nonce].sort().join('')
    const sha = CryptoJS.SHA1(str).toString()
    if (ctx.method === 'GET') {
      ctx.body = (sha === signature) ? echostr : 'failled'
    } else if (ctx.method === 'POST') {
      if (sha !== signature) {
        ctx.body = 'failled'
      } else {
        /** 接收信息 */
        const message = util.parserJSON(ctx.request.body.xml)
        ctx.weixin = message
        await reply(ctx, next)

        const replyBody = ctx.body
        const msg = ctx.weixin
        
        const xml = util.tpl(replyBody, msg)
        ctx.status = 200
        ctx.type = 'application/xml'
        ctx.body = xml
      }
    }
  }
}