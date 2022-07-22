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
/**
 * 收藏文章
 * @param {String|Number}} target 收藏的目标文章id
 * @returns Promise
 */
export const userLike = (target) => {
  return request({
    url: '/v1_0/article/collections',
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取消收藏
 * @param {*} target
 * @returns
 */
export const userNotLike = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
}
/**
 * 关注
 * @param {String|Number}} target 收藏的目标文章id
 * @returns Promise
 */
export const userFollowed = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 * 取关
 * @param {*} target
 * @returns
 */
export const userNotFollowed = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE'
  })
}
