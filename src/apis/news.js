import request from '@/utils/request'

/**
 * 获取频道的文章
 * @param {*} channelId 频道的id
 * @param {*} timestamp 获取上一页的时间戳
 * @returns
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
