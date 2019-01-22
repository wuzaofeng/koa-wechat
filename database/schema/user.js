const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

// 加密权重
const SALT_WORK_FACTOR = 10
// 登录的最大失败尝试次数
const MAX_LOAGIN_ATTEMPTS = 5
// 登录失败后的锁定时间
const LOCK_TIME = 2 * 60* 60 * 1000
const UserSchema = new Schema({
  // user admin superAdmin
  role: {
    type: String,
    default: 'user',
  },
  // 兼容各个微信应用, 如小程序或者公众号的微信用户id
  openid: [String],
  unionid: String,
  nickname: String,
  address: String,
  province: String,
  country: String,
  city: String,
  gender: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  // 最大尝试登录次数
  loginAttemps: {
    type: Number,
    required: true,
    default: 0
  },
  lockUntil: Number,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updatedAt: {
      type: Date,
      default: Date.now()
    }
  }
})

// 虚拟字段
UserSchema.virtual('isLocked').get(function(){
  return this.lockUntil && this.lockUntil > Date.now()
}) 

// 保存前操作
UserSchema.pre('save', function(next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updatedAt = Date.now()
  } else {
    this.meta.updatedAt = Date.now()
  }
  next()
})

UserSchema.pre('save', function (next) {
  const user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      console.log(user)
      next()
    })
  })
})

// 实例方法
UserSchema.methods = {
  // 比较密码
  comparePassword(_password, password) {
    return new Promise((reslove, reject) => {
      bcrypt.compare(_password, password, (err, isMatch) => {
        if (!err) reslove(isMatch)
        else reject(err)
      })
    })
  },

  // 登录次数加1
  incLoginAttempts(user) {
    return new Promise((reslove, reject) => {
      if (this.lockUntil && this.lockUntil < Date.now()) {
        this.update({
          $set: {
            loginAttemps: 1
          },
          $unset: {
            lockUntil: 1
          }
        }, (err) => {
          if (!err) reslove(true)
          else reject(err)
        })
      } else {
        let updates = {
          $inc: {
            loginAttemps: 1
          }
        }

        if (this.loginAttemps + 1 >= MAX_LOAGIN_ATTEMPTS || !this.isLocked) {
          updates.$set = {
            lockUntil: Date.now() + LOCK_TIME
          }
        }

        this.update(updates, err => {
          if (!err) reslove(true)
          else reject (err)
        })
      }
    })
  }
}

module.exports = mongoose.model('User', UserSchema)