import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import store from '@/store'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/components/HelloFromVux.vue'),
      meta:{
        title:'测试'
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('router前置钩子');
  store.commit('UPDATE_LOADING',true)
  next();
});
router.afterEach((to) => {
  console.log(to);
  // console.log(store)
  store.commit('UPDATE_TITLE',to.meta.title)
  store.commit('UPDATE_LOADING',false)
})
export default router