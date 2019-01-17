const template = require('./tpl')

exports.parserJSON = (msg) => {
  for(i in msg) {
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
