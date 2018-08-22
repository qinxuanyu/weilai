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
    },
    {
      path: '/me/my-sale',
      name: 'mySale',
      component: () => import('@/views/me/mySale.vue'),
      meta:{
        title:'我的售卖'
      }
    },
    {
      path: '/me/order-info',
      name: 'orderInfo',
      component: () => import('@/views/me/orderInfo.vue'),
      meta:{
        title:'订单信息'
      }
    },
    {
      path: '/me/my-wallet',
      name: 'myWallet',
      component: () => import('@/views/me/myWallet.vue'),
      meta:{
        title:'我的钱包'
      }
    },
    {
      path: '/me/capital',
      name: 'capitalDetails',
      component: () => import('@/views/me/capitalDetails.vue'),
      meta:{
        title:'资金明细'
      }
    },
    {
      path: '/me/recharge',
      name: 'recharge',
      component: () => import('@/views/me/recharge.vue'),
      meta:{
        title:'钱包充值'
      }
    },
    {
      path: '/me/withdraw',
      name: 'withdraw',
      component: () => import('@/views/me/withdraw.vue'),
      meta:{
        title:'提现'
      }
    },
    {
      path: '/me/coupon',
      name: 'coupon',
      component: () => import('@/views/me/coupon.vue'),
      meta:{
        title:'优惠券'
      }
    },
    {
      path: '/me/integral',
      name: 'integral',
      component: () => import('@/views/me/integral.vue'),
      meta:{
        title:'积分'
      }
    },
    {
      path: '/me/integral-details',
      name: 'integralDetails',
      component: () => import('@/views/me/integralDetails.vue'),
      meta:{
        title:'积分明细'
      }
    },
    {
      path: '/me/edit-data',
      name: 'editData',
      component: () => import('@/views/me/editData.vue'),
      meta:{
        title:'编辑资料'
      }
    },
    {
      path: '/me/message',
      name: 'message',
      component: () => import('@/views/me/message.vue'),
      meta:{
        title:'消息'
      }
    },
    {
      path: '/setup',
      name: 'setup',
      component: () => import('@/views/setup/index.vue'),
      meta:{
        title:'系统设置'
      }
    },
    {
      path: '/setup/feedback',
      name: 'feedback',
      component: () => import('@/views/setup/feedback.vue'),
      meta:{
        title:'意见反馈'
      }
    },
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