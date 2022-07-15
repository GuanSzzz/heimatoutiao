// 二次封装 更简单
import storage from './storage'
const tokenKey = 'HMtoken'
export const getToken = () => storage.get(tokenKey)

export const setToken = (token) => storage.set(tokenKey, token)

export const removeToken = () => storage.remove(tokenKey)
