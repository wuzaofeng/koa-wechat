module.exports = {
  access_token: '/cgi-bin/token', // 获取access_token
  getcallbackip: '/cgi-bin/getcallbackip', // 获取微信服务器IP地址
  checknetwork: '/cgi-bin/callback/check', // 网络检测
  getmenu: '/cgi-bin/menu/get', // 查询菜单
  delmenu: '/cgi-bin/menu/delete', // 删除所有菜单
  menu: { // 自定义菜单
    create: '/cgi-bin/menu/create',
    getconfig: '/cgi-bin/get_current_selfmenu_info' // 获取自定义菜单配置
  },
  conditional: { // 个性化菜单
    create: '/cgi-bin/menu/addconditional',
    delete: 'cgi-bin/menu/delconditional', // 删除个性化菜单
    trymatch: '/cgi-bin/menu/delconditional' // 测试个性化菜单匹配结果
  },
  kfaccount: { // 客服账号
    add: '/customservice/kfaccount/add',
    update: '/customservice/kfaccount/update',
    delete: '/customservice/kfaccount/del',
    uploadheadimg: '/customservice/kfaccount/uploadheadimg',
    get: '/cgi-bin/customservice/getkflist',
    send: '/cgi-bin/message/custom/send',
    typing: '/cgi-bin/message/custom/typing',
  },
  mass: {
    uploadimg: '/cgi-bin/media/uploadimg', // 上传图文消息内的图片获取URL
    uploadnews: '/cgi-bin/media/uploadnews', // 上传图文消息素材
    sendall: '/cgi-bin/message/mass/sendall', // 根据标签进行群发
    send: '/cgi-bin/message/mass/send', // 根据OpenID列表群发
    delete: '/cgi-bin/message/mass/delete', // 删除群发
    preview: '/cgi-bin/message/mass/preview', // 预览接口
    get: '/cgi-bin/message/mass/get', // 查询群发消息发送状态
    getspeed: '/cgi-bin/message/mass/speed/get', // 控制群发速度
    setspeed: '/cgi-bin/message/mass/speed/set', // 设置群发速度
  },
  qrcode: {
    create: 'cgi-bin/qrcode/create', // 创建二维码ticket
    show: '/cgi-bin/showqrcode' // 通过ticket换取二维码
  },
  short_url: {
    create: '/cgi-bin/shorturl'
  },
  semantic: {
    search: '/semantic/semproxy/search'
  },
  ai: {
    translate: '/cgi-bin/media/voice/translatecontent'
  },
  oauth: {
    authorize: '/connect/oauth2/authorize',
    access_token: '/sns/oauth2/access_token',
    user_info: '/sns/userinfo'
  }
}