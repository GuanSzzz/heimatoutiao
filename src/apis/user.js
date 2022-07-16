import request from '@/utils/request'
import store from '@/store/index'

/**
 * 登录
 * @param {*} mobile 手机号
 * @param {*} code 验证码
 * @returns Promise
 */
export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile
 * @returns Promise
 */
export const sendCode = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 用户信息获取
 * @returns Promise
 */
export const userInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
