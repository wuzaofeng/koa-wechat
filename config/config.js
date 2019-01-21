module.exports = {
  baseUrl: 'http://baoz.free.idcfengye.com',
  // 微信服务器
  server: {
    base: 'https://api.weixin.qq.com',
    mp_base: 'https://mp.weixin.qq.com',
    op_base: 'https://open.weixin.qq.com',
    server_timeout: 10000
  },
  appID: 'wxe3867e381e773fa0',
  appsecret: '44f130946b41f4e835465db733dacf5b',
  token: 'wechat',
  encodingAESKey: 'NyTx8BIm17bjP9cO0irQEDj7twACeIPuVOChmoFhbQh',
  redis: {
    wechat: 'wechat',
    access_token: 'access_token',
    token_expires_in: 'token_expires_in',
    ticket: 'ticket',
    ticket_expires_in: 'ticket_expires_in'
  },
  db: 'mongodb://localhost:27017/wechat'
}