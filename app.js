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
// const index = require('./routes/index')
const wechat = require('./routes/wechat/wechat')
// const wechat_menu = require('./routes/wechat/menu')
// const wechat_conditional = require('./routes/wechat/conditional')
// const wechat_kfaccount = require('./routes/wechat/kfaccount')
// const wechat_mass = require('./routes/wechat/mass')

// const { initSchemas, connect } = require('./database/init')

;(async function(){
  // await connect(config.db)
  // initSchemas()
  await mongoose.connect(config.db, {
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

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
app.use(wechat.routes(), wechat.allowedMethods())
// app.use(wechat_menu.routes(), wechat_menu.allowedMethods())
// app.use(wechat_conditional.routes(), wechat_conditional.allowedMethods())
// app.use(wechat_kfaccount.routes(), wechat_kfaccount.allowedMethods())
// app.use(wechat_mass.routes(), wechat_mass.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
