const router = require('koa-router')()
const Wechat = require('../controllers/wechat')

router.prefix('/wechat')

router.get('/sdk', Wechat.sdk)

// 进入微信消息中间件
router.get('/wx-hear', Wechat.hear)
router.post('/wx-hear', Wechat.hear)

// 跳到授权的中间服务页面
router.get('/wx-oauth', Wechat.oauth)

// 通过code 获取用户信息
router.get('/userinfo', Wechat.userInfo)

module.exports = router