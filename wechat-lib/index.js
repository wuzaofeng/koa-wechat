const Request = require('../utils/request')
const config = require('../config/config')
const url = require('../config/url')

module.exports = class Wechat {
  constructor(opts) {
    this.opts = opts
    this.appID = opts.appID
    this.appsecret = opts.appsecret
    this.saveAccessToken = opts.saveAccessToken // 保存token
    this.getAccessToken = opts.getAccessToken // 获取token
    this.fetchAccessToken()
  }

  /** 获取Token */
  async fetchAccessToken() {
    let data = await this.getAccessToken()
    if (!this.isValidToken(data)) {
      data = await this.uptadeAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }

  /** 更新Token */
  async uptadeAccessToken() {
    const res = await Request({
      url: url.access_token + '?grant_type=client_credential',
      params: {
        // grant_type: 'client_credential',
        appid: config.appID,
        secret: config.appsecret
      }
    })

    const now = new Date().getTime()
    const expires_in = now + (res.expires_in - 20) * 1000
    res.expires_in = expires_in    
    return res  
  }

  /** 验证Token是否过期 */
  isValidToken(data) {
    if (!data || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = new Date().getTime()

    return now < expiresIn
  }

  /** 创建二维码ticket */
  async createQrcode (token, data) {
    return await Request({
      method: 'POST',
      url: url.qrcode.create + `?access_token=${token}`,
      data
    })
  }

  /** 通过ticket换取二维码 */
  showQrcode (ticket) {
    return config.server.mp_base + url.qrcode.show + `?ticket=${encodeURI(ticket)}`
  }

  /** 长链接转短链接 */
  async createShortUrl ({ token, action = 'long2short', longurl }) {
    return await Request({
      method: 'POST',
      url: url.short_url.create + `?access_token=${token}`,
      data: {
        action,
        longurl
      }
    })
  }

  /** 语义理解-查询特定语句进行分析 */
  async semantic (token, data) {
    return await Request({
      method: 'POST',
      url: url.semantic.search + `?access_token=${token}`,
      data: {
        appid: this.appID,
        ...data
      }
    })
  }

  /** 微信翻译 */
  async aiTranslate (token, content, lfrom, lto) {
    return await Request({
      method: 'POST',
      url: url.ai.translate + `?access_token=${token}`,
      params: {
        token, lfrom, lto
      },
      data: content
    })
  }
}