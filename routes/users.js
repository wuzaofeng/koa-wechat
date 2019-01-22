const router = require('koa-router')()
const User = require('../controllers/user')
router.prefix('/user')

// 用户的注册登录路由
router.get('/signup', User.showSignup)
router.get('/signin', User.showSignin)
router.post('/signup', User.signup)
router.post('/signin', User.signin)
router.post('/logout', User.logout)

module.exports = router
