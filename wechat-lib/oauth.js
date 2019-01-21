/**
 * 1 第一步：用户同意授权，获取code
 * 2 第二步：通过code换取网页授权access_token
 * 3 第三步：刷新access_token（如果需要）
 * 4 第四步：拉取用户信息(需scope为 snsapi_userinfo)
 * 5 附：检验授权凭证（access_token）是否有效*/

const Request = require('../utils/request')
const config = require('../config/config')
const url = require('../config/url')

module.exports = class WechatOAuth {
  constructor(opts) {
    this.appID = opts.appID
    this.appsecret = opts.appsecret
  }

  async getAuthorizeURL (scope="snsapi_base", target, state) {
    return `${config.server.op_base}${url.oauth.authorize}?appid=${this.appID}&redirect_uri=${encodeURI(target)}&response_type=code&scope=${scope}${state&&`&state=${state}`}#wechat_redirect`
  }

  /** 获取Token */
  async fetchAccessToken(code) {
    const params = {
      appid: this.appID,
      secret: this.appsecret,
      code,
      grant_type: 'authorization_code'
    }
    return await Request({
      url: url.oauth.access_token + `?access_token=${token}`,
      params,
    })
  }

  async getUserInfo (token, openid, lang = 'zh_CN') {
    const params = {
      access_token: token,
      openid,
      code,
      lang
    }
    return await Request({
      url: url.oauth.user_info,
      params,
    })
  }
}