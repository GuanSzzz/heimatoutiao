import request from '@/utils/request'

/**
 * 输入建议
 * @param {String} q
 * @returns Promise
 */
export const getSearchSuggestion = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/**
 * 获取搜索结果
 * @param {String} q
 * @returns
 */
export const getSearchResults = (q, page) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page
    }
  })
}
