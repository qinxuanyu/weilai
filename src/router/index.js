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
      path: '/qr-code',
      name: 'qrCode',
      component: () => import('@/views/home/qrCode.vue'),
      meta:{
        title:'分享二维码'
      }
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('@/views/home/my.vue'),
      meta:{
        title:'我的'
      }
    },
    {
      path: '/code',
      name: 'code',
      component: () => import('@/views/home/code.vue'),
      meta:{
        title:'我的激活码'
      }
    },
    {
      path: '/my-wallet/:type',  //1-赠送钱包  2-我的钱包
      name: 'myWallet',
      component: () => import('@/views/home/myWallet.vue'),
      meta:{
        title:'我的钱包'
      }
    },
    {
      path: '/explain',
      name: 'explain',
      component: () => import('@/views/home/explain.vue'),
      meta:{
        title:'我的好友'
      }
    },
    {
      path: '/my-friend',
      name: 'myFriend',
      component: () => import('@/views/home/myFriend.vue'),
      meta:{
        title:'我的好友'
      }
    },
    {
      path: '/goods',
      name: 'goods',
      component: () => import('@/views/home/goods.vue'),
      meta:{
        title:'会员详情'
      }
    },
    {
      path: '/details/:type', //1账户明细 2提现记录 3佣金记录
      name: 'details',
      component: () => import('@/views/home/details.vue'),
      meta:{
        title:'账户明细'
      }
    },
    {
      path: '/order', //1账户明细 2提现记录 3佣金记录
      name: 'order',
      component: () => import('@/views/home/order.vue'),
      meta:{
        title:'会员详情'
      }
    },
    {
      path: '/app', //1账户明细 2提现记录 3佣金记录
      name: 'downApp',
      component: () => import('@/views/home/downApp.vue'),
      meta:{
        // title:'会员详情'
      }
    },
    {
      path: '/service', //1账户明细 2提现记录 3佣金记录
      name: 'service',
      component: () => import('@/views/home/service.vue'),
      meta:{
        title:'在线客服'
      }
    },
  ]
})
router.beforeEach((to, from, next) => {
  if (/^\/http/.test(to.path) || /^\/https/.test(to.path)) {
    window.location.href  = to.path;
    // console.log(to.path)
    return;
  }
  store.commit('UPDATE_LOADING',true)
  next();
});
router.afterEach((to) => {
  window.scrollTo(0,0);
  store.commit('UPDATE_TITLE',to.meta.title)
  store.commit('UPDATE_LOADING',false)
})
export default router