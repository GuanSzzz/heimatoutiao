import request from '@/utils/request'

// 更换图片的接口
export const uploadPhoto = (file) => {
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: file
  })
}
/**
 * 获取个人信息
 * @returns
 */
export const getuserinfo = () => {
  return request({
    url: '/v1_0/user/profile',
    method: 'GET'
  })
}
/**
 * 编辑个人信息
 * @param {*} info 一个对象,包含name,gender,birthday,
 * @returns
 */
export const setUserInfo = (info) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data: info
  })
}
