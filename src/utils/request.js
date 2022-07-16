import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net'
  //   timeout: 3000
})

// 请求拦截器
// 每一次请求都会执行的函数
// 目的：每次发送请求带要携带token
request.interceptors.request.use(
  // config 本次请求的配置
  // 必须返回出去
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // 请求错误的时候，处理的方法
  (error) => {
    return Promise.reject(error)
  }
)

export default request
