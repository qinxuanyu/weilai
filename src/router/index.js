import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue'),
      meta:{
        title:'首页'
      }
    },
    {
      path: '/store/index',
      name: 'storeIndex',
      component: () => import('@/views/stores/index.vue'),
      meta:{
        title:'问鼎种植商城'
      }
    },
    {
      path: '/store/search',
      name: 'search',
      component: () => import('@/views/stores/search.vue'),
      meta:{
        title:'问鼎种植商城'
      }
    },
    {
      path: '/store/list/:type',
      name: 'list',
      component: () => import('@/views/stores/list.vue'),
      meta:{
        title:'问鼎种植商城'
      }
    },
    {
      path: '/store/discount',
      name: 'discount',
      component: () => import('@/views/stores/discount.vue'),
      meta:{
        title:'限时折扣'
      }
    },
    {
      path: '/store/detail/:id',
      name: 'detail',
      component: () => import('@/views/stores/detail.vue'),
      meta:{
        title:'商品详情'
      }
    },
    {
      path: '/store/evaluate',
      name: 'evaluate',
      component: () => import('@/views/stores/evaluate.vue'),
      meta:{
        title:'所有评价'
      }
    },
    {
      path: '/store/order',
      name: 'order',
      component: () => import('@/views/stores/order.vue'),
      meta:{
        title:'确认订单'
      }
    },
    {
      path: '/store/cart',
      name: 'cart',
      component: () => import('@/views/stores/cart.vue'),
      meta:{
        title:'购物车'
      }
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('@/views/me/index.vue'),
      meta:{
        title:'我的'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (/^\/http/.test(to.path)) {
      window.open(to.path, "_blank");
      return;
  }
  store.commit('UPDATE_LOADING',true)
  next();
});
router.afterEach((to) => {
  store.commit('UPDATE_TITLE',to.meta.title)
  store.commit('UPDATE_LOADING',false)
})
export default router