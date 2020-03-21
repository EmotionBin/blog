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
      /**
       * 这里的子路由没有用相对路径，因为这个属于个人小项目，是想让url更简洁，如果项目太大，则考虑使用相对路径
       * 这里说明一下，当匹配到/home的时候，顶级路由和子路由都会渲染，顶级路由包含了导航栏，子路由为导航栏下方的内容
       * 同理，当匹配到/login 和/register的时候，顶级路由和子路由都会渲染，这里要注意一下
       */
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/common/Homeland.vue')
      },
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
