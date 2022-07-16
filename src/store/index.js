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
    user: getToken() || {}
  },
  getters: {},
  mutations: {
    userToken (state, payload) {
      state.user = payload
      // localStorage.setItem('HMtoken', JSON.stringify(payload))
      // 封装
      // storage.set('HMtoken', payload)
      // 二次封装
      setToken(payload)
    }
  },
  actions: {},
  modules: {}
})
