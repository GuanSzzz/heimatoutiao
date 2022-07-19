import request from '@/utils/request'
import storage from '@/utils/storage'

/**
 * 获取用户频道列表
 */
export const getMyChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}

/**
 * 获取全部频道列表
 * @returns Promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}

/**
 * 删除用户指定id的频道
 * @param {String|Number} target
 * @returns Promise
 */
export const delMyChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}

export const addMyChannel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

// 封装本地存储 mychannel
const HMchannels = 'HMchannels'
export const getMyChannelByLocal = () => storage.get(HMchannels)
export const setMyChannelToLocal = (channel) => storage.set(HMchannels, channel)
