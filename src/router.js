import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/vip',
      name: 'vip',
      // route level code-splitting
      // this generates a separate chunk (vip.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vip" */ './views/Vip.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: () => import(/* webpackChunkName: "car" */ './views/Car.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/Search.vue')
    },
  ]
})
