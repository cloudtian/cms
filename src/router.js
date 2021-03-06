import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import(/* webpackChunkName: "home" */ './views/home/home.vue')
    },
    {
      path: '/vip',
      name: 'vip',
      // route level code-splitting
      // this generates a separate chunk (vip.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "vip" */ './views/vip/vip.vue')
    },
    {
      path: '/car',
      name: 'car',
      component: () => import(/* webpackChunkName: "car" */ './views/car/car.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ './views/search/search.vue')
    },
    {
      path: '/news/list',
      name: 'news.list',
      component: () => import(/* webpackChunkName: "news" */ './views/news/news-list.vue')
    },
    {
      path: '/news/detail',
      name: 'news.detail',
      component: () => import(/* webpackChunkName: "news"*/ './views/news/news-detail.vue')
    },
    {
      path: '/photo/list/:categoryId',
      name: 'photo.list',
      component: () => import(/* webpackChunkName: "photo*/ './views/photo/photo-list.vue')
    },
    {
      path: '/photo/detail/',
      name: 'photo.detail',
      component: () => import(/* webpackChunkName: "photo*/ './views/photo/photo-detail.vue')
    }
  ]
})
