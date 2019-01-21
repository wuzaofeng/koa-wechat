const { reply } = require('../wechat/reply')
const config = require('../config/config')
const wechatMiddle = require('../wechat-lib/middleware')
const { getOAuth } = require('../wechat')
const api = require('../api')

const oauth = getOAuth()

exports.hear = async (ctx, next) => {
  const middle = wechatMiddle(config, reply)
  await middle(ctx, next)
}

exports.oauth = async (ctx, next) => {
  const target = config.baseUrl + '/wechat/userinfo'
  const scope = 'snsapi_userinfo'
  const state = ctx.query.id
  const url = oauth.getAuthorizeURL(scope, target, state)
  ctx.redirect(url)
}

exports.userInfo = async (ctx, next) => {
  const code = ctx.query.code
  const tokenData = await oauth.fetchAccessToken(code)
  const userData = await oauth.getUserInfo(tokenData.access_token, tokenData.openid)

  ctx.body = userData
}


exports.sdk = async (ctx, next) => {
  const url = ctx.href
  const params = await api.wechat.getSignature(url)
  console.log(params)
  await ctx.render('index', params)
}