import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/globalAjax.js'
import './plugins/storeDataCache.js'
// import './plugins/element.js'
import './plugins/vueDirective.js'
import ELEMENT from 'element-ui'

Vue.use(ELEMENT)

//还有部分插件配置在vue.config.js中的chainWebpack中

Vue.config.productionTip = false

//全局的导航守卫
router.beforeEach((to,from,next) => {
  //如果要前往登录页面或者注册页面
  if(to.path === '/login' || to.path === '/register'){
    //更新状态
    store.commit('loginCheck',2);
    return next();
  }else if(to.path === '/home'){
    //每次进入home页面的时候判断登录状态
    if(!window.sessionStorage.getItem('userToken')){
      console.log('未登录');
      //如果没登录
      store.commit('loginCheck',0);
    }else{
      //登录了
      console.log('已登录');
      store.commit('loginCheck',1);
    }
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
