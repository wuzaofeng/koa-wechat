const CryptoJS = require('crypto-js')
module.exports = (config) => {
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
      }
      
      /** 接收信息 */
      const message = ctx.request.body.xml
      const back = `<xml><ToUserName>
        <![CDATA[${message.FromUserName}]]>
      </ToUserName><FromUserName>
        <![CDATA[${message.ToUserName}]]></FromUserName>
      <CreateTime>${parseInt(new Date().getTime() / 1000)}
      </CreateTime>
      <MsgType><![CDATA[text]]></MsgType>
      <Content><![CDATA[${message.Content}]]></Content>
      </xml>`
      ctx.status = 200
      ctx.type = 'application/xml'
      ctx.body = back
      console.log(back)
    }
    next()
  }
}