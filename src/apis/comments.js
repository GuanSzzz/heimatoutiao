import request from '@/utils/request'

/**
 * 获取文章评论
 * @param {*} source 文章的id
 * @returns
 */
export const getCommentsList = (source, offset) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'a',
      source,
      offset
    }
  })
}

/**
 * 获取评论的评论
 * @param {*} source 评论的id
 * @returns
 */
export const getComComentsList = (source, offset) => {
  return request({
    url: '/v1_0/comments',
    method: 'GET',
    params: {
      type: 'c',
      source,
      offset
    }
  })
}

/**
 *对文章或者评论进行评论
 * @param {*} id 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
 * @param {*} content 评论内容
 * @param {*} artId 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数
 * @returns
 */
export const setComentsText = (id, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      target: id,
      content,
      art_id: artId
    }
  })
}

/**
 * 取消对评论或评论回复点赞
 * @param {*} target 要取消点赞的评论id或评论回复id
 * @returns Promise
 */
export const comNotGood = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

/**
 * 对评论或评论回复点赞
 * @param {*} target 点赞的评论id
 * @returns Promise
 */
export const comGood = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
