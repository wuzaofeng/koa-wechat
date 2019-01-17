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

  async fetchAccessToken() {
    let data = await this.getAccessToken()
    if (!this.isValidToken(data)) {
      data = await this.uptadeAccessToken()
    }

    await this.saveAccessToken(data)

    return data
  }

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

  isValidToken(data) {
    if (!data || !data.expires_in) {
      return false
    }

    const expiresIn = data.expires_in
    const now = new data().getTime()

    return now < expiresIn
  }
}