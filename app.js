const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const xmlparser = require('koa-xml-body')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redis = require('koa-redis')
const mongoose = require('mongoose')
const moment = require('moment')
const config = require('./config/config')

const index = require('./routes/index')
const wechat = require('./routes/wechat')
const users = require('./routes/users')

const User = require('./database/schema/user')

// const { initSchemas, connect } = require('./database/init')

;(async function(){
  // await connect(config.db)
  // initSchemas()
  await mongoose.connect(config.db, {
    useCreateIndex: true,
    useNewUrlParser: true
  })
})()

app.keys = ['keys', 'keykeys'];
app.use(session({
  store: redis()
}));

// error handler
onerror(app)

app.use(xmlparser())
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug',
  options: {
    moment: moment
  }
}))

app.use(async(ctx, next) => {
  let user = ctx.session.user
  if (user && user._id) {
    user = await User.findOne({
      _id: user._id
    })
    console.log(user)
    ctx.session.user = {
      _id: user._id,
      nickname: user.nickname
    }

    ctx.state = {
      ...ctx.state,
      user: {
        _id: user._id,
        nickname: user.nickname
      }
    }
  } else {
    ctx.session.user = null
  }
  await next()
})

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(wechat.routes(), wechat.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
