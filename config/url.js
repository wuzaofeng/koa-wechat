module.exports = {
  access_token: '/cgi-bin/token', // 获取access_token
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