// 引入dayjs
import dayjs from 'dayjs'
// 配置相对时间
const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
// 配置中文包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
// 练习使用
// console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
export default dayjs
