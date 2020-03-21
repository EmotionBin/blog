import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//路由配置项
const routes = [
  {
    path: '/',
    name: 'FirstPage',
    component: () => import('../components/FirstPage.vue'),
  },
  {
    path: '/home',
    name: 'Main',
    component: () => import('../views/Main.vue'),
    children:[
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/common/Login.vue')
      },
      {
        path: '/register',
        name: 'Register',
        component: () => import('../views/common/Register.vue')
      },
    ]
  },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('../views/common/Login.vue')
  // },
  // {
  //   path: '/register',
  //   name: 'Register',
  //   component: () => import('../views/common/Register.vue')
  // },
]

//使用history模式 'history'或'hash'
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
