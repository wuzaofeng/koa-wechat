// const mongoose = require('mongoose')
// const { globresolve } = require('path')
// const glob = require('glob')

// mongoose.Promise = global.Promise

// exports.initSchemas = () => {
//   glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
// }

// exports.connect = (db) => {
//   return new Promise((resolve) => {
//     mongoose.connect(db)
//     mongoose.connection.on('disconnect', () => {
//       console.log('数据库挂了吧')
//     })
//     mongoose.connection.on('error', (err) => {
//       console.log(err)
//     })
//     mongoose.connection.on('open', () => {
//       resolve()
//       console.log('Mongodb connected')
//     })
//   })
// }