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
      path: '/store/list',
      name: 'list',
      component: () => import('@/views/stores/list.vue'),
      meta:{
        title:'问鼎种植商城'
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