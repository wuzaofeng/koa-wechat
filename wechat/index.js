const Redis = require('koa-redis')
const Wechat = require('../wechat-lib')
const {  appID, appsecret, token, redis } = require('../config/config')

const Store = new Redis().client

const wechatCfg = {
  wechat: {
    appID,
    appsecret,
    token,
    saveAccessToken: async ({ access_token, expires_in }) => {
      Store.hmset(redis.wechat, redis.access_token, access_token)
      Store.hmset(redis.wechat, redis.expires_in, expires_in)
    },
    getAccessToken: async () => {
      const access_token = await Store.hget(redis.wechat, redis.access_token)
      const expires_in = await Store.hget(redis.wechat, redis.expires_in)
      if (access_token && expires_in) {
        return {
          access_token,
          expires_in
        }
      } else {
        return ''
      }
    },
  }
}

;(async function (){
  const client = new Wechat(wechatCfg.wechat)
  // const data = await client
})()
