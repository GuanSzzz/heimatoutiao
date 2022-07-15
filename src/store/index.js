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
    token: getToken('HMtoken') || {}
  },
  getters: {},
  mutations: {
    userToken (state, payload) {
      state.token = payload
      // localStorage.setItem('HMtoken', JSON.stringify(payload))
      // 封装
      // storage.set('HMtoken', payload)
      // 二次封装
      setToken('HMtoken', payload)
    }
  },
  actions: {},
  modules: {}
})
