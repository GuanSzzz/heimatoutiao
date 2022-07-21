import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 封装
    // token: storage.get('HMtoken') || {}
    // 二次封装
    user: getToken() || {},
    searchvalue: '',

    // historylist: localStorage.setItem(
    //   'historylist',
    //   JSON.stringify([...new Set(arr)])
    // ),
    historylist: JSON.parse(localStorage.getItem('historylist')) || []
  },
  getters: {},
  mutations: {
    userToken (state, payload) {
      state.user = payload
      setToken(payload)
    },
    searchValue (state, payload) {
      // 存搜素关键词
      state.searchvalue = payload
      // 存搜索历史 每次从本地取出不会消失
      state.historylist.push(payload)
      // 去重
      state.historylist = [...new Set(state.historylist)]
      // 再次存本地
      localStorage.setItem('historylist', JSON.stringify(state.historylist))
    }
  },
  actions: {},
  modules: {}
})
