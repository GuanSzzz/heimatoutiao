// 封装获取token的函数
class Storage {
  // 存token
  set (key, value) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }

  // 取token
  get (key) {
    const value = localStorage.getItem(key)
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  }

  // 移除token
  remove (key) {
    localStorage.removeItem(key)
  }
}
const storage = new Storage()
export default storage
