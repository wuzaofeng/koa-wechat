const axios = require('axios')
const config = require('../config/config').server

// 创建axios实例
const service = axios.create({
  baseURL: config.base, // api 的 base_url
  timeout: config.server_timeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    // if (store.getters.token) {
    //   config.headers['token'] = getCookie(TokenKey) // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    console.log(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// // response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非0是抛错 可结合自己业务进行修改
     */
    // console.log(response)
    const code = response.data.errcode || 0
    // console.log(response.request)
    return {
      code,
      ...response.data,
    }
  },
  error => {
    return error
  }
)
module.exports = service