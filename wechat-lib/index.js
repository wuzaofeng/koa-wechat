const Request = require('../utils/request')
const config = require('../config/config')
const url = require('../config/url')
const sdk = require('../config/sdk')

module.exports = class Wechat {
  constructor(opts) {
    this.opts = opts
    this.appID = opts.appID
    this.appsecret = opts.appsecret
    this.saveAccessToken = opts.saveAccessToken // 保存token
    this.getAccessToken = opts.getAccessToken // 获取token
    this.getTicket = opts.getTicket
    this.saveTicket = opts.saveTicket
    this.fetchAccessToken()
  }

  /** 获取Token */
  async fetchAccessToken() {
    let data = await this.getAccessToken()
    if (!this.isValid(data)) {
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

  /** 验证是否过期 */
  isValid(data) {
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

  /** 创建自定义菜单 */
  async createMenu (token, menu, rule = null) {
    let createUrl = url.menu.create + `?access_token=${token}`
    let data = menu
    if (rule) {
      data = {
        ...menu,
        createUrl
      }
      createUrl = url.conditional.create + `?access_token=${token}`
    }
    return await Request({
      method: 'post',
      url: createUrl,
      data
    })
  }

  /** 删除自定义菜单(包括个性化菜单) */
  async delMenu (token) {
    return await Request({
      method: 'post',
      url: url.delmenu + `?access_token=${token}`
    })
  }

  /** 获取菜单 */
  async getMenu (token) {
    return await Request({
      method: 'post',
      url: url.getmenu + `?access_token=${token}`
    })
  }

  /** 
   * SDK 
   */

  /** 获取 ticket */
  async fetchTicket(token) {
    let data = await this.getTicket()
    if (!this.isValid(data)) {
      data = await this.uptadeTicket(token)
    }

    await this.saveTicket(data)
    return data
  }

  async uptadeTicket(token) {
    const res = await Request({
      url: sdk.getticket + `?access_token=${token}&type=jsapi`,
    })

    const now = new Date().getTime()
    const expires_in = now + (res.expires_in - 20) * 1000
    res.expires_in = expires_in
    return res
  }

}