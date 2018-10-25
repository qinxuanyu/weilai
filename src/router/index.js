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
        title:'搜索商品'
      }
    },
    {
      path: '/store/search-list/:name',
      name: 'searchList',
      component: () => import('@/views/stores/searchList.vue'),
      meta:{
        title:'搜索商品'
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
      path: '/store/detail/:id/:type',     //type 2.果树 4果子 5树苗 6折扣 7收获水果自留
      name: 'detail',
      component: () => import('@/views/stores/detail.vue'),
      meta:{
        title:'商品详情'
      }
    },
    {
      path: '/store/evaluate/:goodsId',
      name: 'evaluate',
      component: () => import('@/views/stores/evaluate.vue'),
      meta:{
        title:'所有评价'
      }
    },
    {
      path: '/store/order/:id/:type',
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
      path: '/me/my-bargain',
      name: 'bargain',
      component: () => import('@/views/me/myBargain.vue'),
      meta:{
        title:'我的合同'
      }
    },
    {
      path: '/me/fruiter',
      name: 'fruiter',
      component: () => import('@/views/me/fruiter.vue'),
      meta:{
        title:'我的果树'
      }
    },
    {
      path: '/me/my-harvest',
      name: 'myHarvest',
      component: () => import('@/views/me/myHarvest.vue'),
      meta:{
        title:'我的收获'
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
      path: '/me/withdraw/:num',
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
      path: '/me/site',
      name: 'site',
      component: () => import('@/views/me/site.vue'),
      meta:{
        title:'地址管理'
      }
    },
    {
      path: '/me/add-site',
      name: 'addSite',
      component: () => import('@/views/me/addSite.vue'),
      meta:{
        title:'新增地址'
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
    {
      path: '/setup/about',
      name: 'about',
      component: () => import('@/views/setup/about.vue'),
      meta:{
        title:'关于我们'
      }
    },
    {
      path: '/setup/inform',
      name: 'inform',
      component: () => import('@/views/setup/inform.vue'),
      meta:{
        title:'意见反馈'
      }
    },
    {
      path: '/order/order-inform/:type',
      name: 'orderForm',
      component: () => import('@/views/order/orderForm.vue'),
      meta:{
        title:'我的订单'
      }
    },
    {
      path: '/order/order-details/:id/:type',
      name: 'orderDetails',
      component: () => import('@/views/order/orderDetails.vue'),
      meta:{
        title:'订单详情'
      }
    },
    {
      path: '/order/refund/:id',
      name: 'refund',
      component: () => import('@/views/order/refund.vue'),
      meta:{
        title:'申请退款'
      }
    },
    {
      path: '/order/evaluate/:orderId/:goodsId',
      name: 'evaluate',
      component: () => import('@/views/order/evaluate.vue'),
      meta:{
        title:'发表评价'
      }
    },
    {
      path: '/order/vindicate-order',
      name: 'vindicateOrder',
      component: () => import('@/views/order/vindicateOrder.vue'),
      meta:{
        title:'确认下单'
      }
    },
    {
      path: '/home/strategy',
      name: 'strategy',
      component: () => import('@/views/home/strategy.vue'),
      meta:{
        title:'果园攻略'
      }
    },
    {
      path: '/me/farm',
      name: 'farm',
      component: () => import('@/views/me/farm.vue'),
      meta:{
        title:'农场'
      }
    },
    {
      path: '/me/service',
      name: 'service',
      component: () => import('@/views/me/service.vue'),
      meta:{
        title:'客服'
      }
    },
    {
      path: '/home/recent',
      name: 'recent',
      component: () => import('@/views/home/recent.vue'),
      meta:{
        title:'近况'
      }
    },
    {
      path: '/home/add-card',
      name: 'addCard',
      component: () => import('@/views/me/addCard.vue'),
      meta:{
        title:'银行卡'
      }
    },
    {
      path: '/order/completed-order',
      name: 'completedOrder',
      component: () => import('@/views/order/completedOrder.vue'),
      meta:{
        title:'售后订单'
      }
    },
    {
      path: '/me/authentication',
      name: 'authentication',
      component: () => import('@/views/me/authentication.vue'),
      meta:{
        title:'身份信息'
      }
    },
    {
      path: '/store/bargain/:id/:type',    
      name: 'bargain',
      component: () => import('@/views/stores/bargain.vue'),
      meta:{
        title:'预览合同'
      }
    },
    {
      path: '/store/alipay-success',
      name: 'alipaySuccess',
      component: () => import('@/views/stores/alipaySuccess.vue'),
      meta:{
        title:'支付成功'
      }
    },
    {
      path: '/store/maintain',
      name: 'maintain',
      component: () => import('@/views/me/maintain.vue'),
      meta:{
        title:'维护列表'
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
  store.commit('UPDATE_TITLE',to.meta.title)
  store.commit('UPDATE_LOADING',false)
})
export default router