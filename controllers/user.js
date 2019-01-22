const User = require('../database/schema/user')

// 实现一个注册页面的控制     showSignup
exports.showSignup = async (ctx, next) => {
  await ctx.render('signup', {
    title: '注册页面'
  })
}
// 增加一个的登录页面的控制     showSignin
exports.showSignin = async (ctx, next) => {
  await ctx.render('signin', {
    title: '登录页面'
  })
}
// 用户数据的持久化             signup
exports.signup = async (ctx, next) => {
  const {
    email,
    password,
    nickname
  } = ctx.request.body.user

  let user = await User.findOne({ email })
  if (user) {
    console.log('已经有这个账号')
    return ctx.redirect('/user/signup')
  }

  user = new User({
    email,
    nickname,
    password
  })
  ctx.session.user = {
    _id: user._id,
    nickname: user.nickname
  }
  console.log('注册成功，直接登录')
  user = await user.save()

  ctx.redirect('/')
}

// 添加登录的校验               signin
exports.signin = async (ctx, next) => {
  const { email, password } = ctx.request.body.user
  const user = await User.findOne({ email })

  if (!user) return ctx.redirect('/user/signup')

  const isMatch = await user.comparePassword(password, user.password)

  if (isMatch) {
    ctx.session.user = {
      _id: user._id,
      nickname: user.nickname
    }

    console.log('登录成功')
    ctx.redirect('/')
  } else {
    console.log('登录失败')
    ctx.redirect('/user/signin')
  }
}

exports.logout = async (ctx, next) => {
  ctx.session.user = {}
  ctx.redirect('/')
}
// 添加路由规则
// 增加两个pug页面          注册登录
// koa-bodyparser
