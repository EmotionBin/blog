import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录状态  0未登录 1已登录 2正在注册或者登录
    loginStatus:0
  },
  getters:{
    getLoginStatus:state => {
      return state.loginStatus;
    }
  },
  mutations: {
    loginCheck(state, payload){
      state.loginStatus = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
