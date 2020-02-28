import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/globalAjax.js'
import './plugins/storeDataCache.js'
import './plugins/element.js'

Vue.config.productionTip = false

//全局的导航守卫
router.beforeEach((to,from,next) => {
  if(to.path === '/login' || to.path === '/register'){
    store.commit('loginCheck',2);
    return next();
  }else if(to.path === '/' && !window.sessionStorage.getItem('userToken')){
    //在主页且未登录
    store.commit('loginCheck',0);
    return next();
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
