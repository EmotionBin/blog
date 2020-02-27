import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //登录状态  0未登录 1已登录 2正在注册或者登录
    loginStatus:0,
    //全局的提示框 isShow控制显隐 mes控制显示的信息
    dialogConfig:{
      isShow:false,
      msg:''
    },
    //当前用户名
    curUsername:''
  },
  getters:{
    getLoginStatus:state => {
      return state.loginStatus;
    },
    getDialogInfo:state => {
      return state.dialogConfig;
    },
    getCurUsername:state => {
      return state.curUsername;
    }
  },
  mutations: {
    loginCheck(state, payload){
      state.loginStatus = payload;
    },
    updateDialog(state, payload){
      state.dialogConfig.isShow = payload.isShow;
      state.dialogConfig.msg = payload.msg;
    },
    updateCurUsername(state, payload){
      state.curUsername = payload;
    },
  },
  actions: {
  },
  modules: {
  }
})
