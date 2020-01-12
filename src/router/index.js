import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const staticRoutes = [{
    path: '/login',
    name: '用户登录',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    redirect: '/login',
  },
]
export const createRouter = () => new VueRouter({
  routes: staticRoutes
})

export default new VueRouter({
  routes: staticRoutes
})