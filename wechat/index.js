const Redis = require('koa-redis')
const Wechat = require('../wechat-lib')
const WechatOAuth = require('../wechat-lib/oauth')
const {  appID, appsecret, token, redis } = require('../config/config')

const Store = new Redis().client

const wechatCfg = {
  wechat: {
    appID,
    appsecret,
    token,
    // 保存token
    saveAccessToken: async ({ access_token, expires_in }) => {
      Store.hmset(redis.wechat, redis.access_token, access_token)
      Store.hmset(redis.wechat, redis.token_expires_in, expires_in)
    },
    // 获取token
    getAccessToken: async () => {
      const access_token = await Store.hget(redis.wechat, redis.access_token)
      const expires_in = await Store.hget(redis.wechat, redis.token_expires_in)
      if (access_token && expires_in) {
        return {
          access_token,
          expires_in
        }
      } else {
        return ''
      }
    },
    // 保存sdk Ticket
    saveTicket: async ({ ticket, expires_in }) => {
      Store.hmset(redis.wechat, redis.ticket, ticket)
      Store.hmset(redis.wechat, redis.ticket_expires_in, expires_in)
    },
    // 获取sdk Ticket
    getTicket: async () => {
      const ticket = await Store.hget(redis.wechat, redis.ticket)
      const expires_in = await Store.hget(redis.wechat, redis.ticket_expires_in)
      if (ticket && expires_in) {
        return {
          ticket,
          expires_in
        }
      } else {
        return ''
      }
    },
  }
}

module.exports = {
  getWechat: () => new Wechat(wechatCfg.wechat),
  getOAuth: () => new WechatOAuth(wechatCfg.wechat)
}
