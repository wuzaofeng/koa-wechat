const CryptoJS = require('crypto-js')
const template = require('./tpl')

exports.parserJSON = (msg) => {
  for (i in msg) {
    if (msg[i].length === 1) {
      msg[i] = msg[i][0]
    }
  }
  return msg
}

exports.tpl = (content, message) => {
  let type = 'text'

  if (Array.isArray(content)) {
    type = 'news' // 图文消息
  }
  if (!content) content = 'Empty News'

  if (content && content.type) {
    type = content.type
  }

  let info = {
    content,
    msgType: type,
    createTime: new Date().getTime(),
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName
  }

  return template(info)
}

// noncestr
const _createNonceStr = function () {
  return Math.random().toString(36).substr(2, 15);
};

// timestamp
const _createTimeStamp = function () {
  return parseInt(new Date().getTime() / 1000) + '';
};

// 字典排序
const _join = function (params) {
  let str = ''
  const arr = Object.keys(params).sort()
  for(let i = 0;i< arr.length; i++) {
    const key = arr[i]
    str += `${key}=${params[key]}`
    if (i < (arr.length - 1)) {
      str += '&'
    }
  }
  console.log(str)
  return str
}

/**
 * @param ticket String
 * @param url String  
 */
exports.sign = (ticket, url) => {
  // 生成随机串
  const noncestr = _createNonceStr()
  // 生成时间戳
  const timestamp = _createTimeStamp()
  const jsapi_ticket = ticket 
  const params = {
    noncestr,
    timestamp,
    jsapi_ticket,
    url
  }

  const str = _join(params)
  // 加密
  const sha = CryptoJS.SHA1(str).toString()
  return {
    noncestr,
    timestamp,
    jsapi_ticket,
    signature: sha,
    url,
    str
  }
}
