import fetch from '@/utils/fetch';
export default {
    //商城首页
    homeData (){
        return fetch({
            url:'/user/index',
            method:'get'
        })
    },
     //登录
     login (data){
        return fetch({
            url:'/user/login',
            method:'post',
            data
        })

    },
    //本地调试获取token
    getToken (data){
        return fetch({
            url:'/user/getToken',
            method:'get',
            data
        })
    },
    //商品列表
    goodsList (data){
        return fetch({
            url:'/goods/goodsList',
            method:'get',
            data
        })
    },
    //商品列表
    goodsDetail (data){
        return fetch({
            url:'/goods/goodsDetail',
            method:'get',
            data
        })
    },
     //意见反馈
     postFeedback (data){
        return fetch({
            url:'/feedback/addFeedback',
            method:'post',
            data
        })
    },
    //我的
    getInfo (){
        return fetch({
            url:'/user/auth/myInfo',
            method:'get',
        })
    },
    //积分明细
    getPointDetail (data){
        return fetch({
            url:'/user/auth/pointDetail',
            method:'get',
            data
        })
    },
    //加入购物车
    addCart (data){
        return fetch({
            url:'/goods/auth/addCar',
            method:'post',
            data
        })
    },
    //移除购物车
    delCart (data){
        return fetch({
            url:'/goods/auth/removeCar',
            method:'post',
            data
        })
    },
    // 确认下单
    getOrderData (data){
        return fetch({
            url:'/goods/auth/sureOrder',
            method:'get',
            data
        })
    },
    //客服列表
    getServiceList (){
        return fetch({
            url:'/service/list',
            method:'get',
        })
    },
     //我的订单
     getMyOrder (data){
        return fetch({
            url:'/user/auth/getMyOrder',
            method:'get',
            data
        })
    },
     //领取优惠券
    getTicket (data){
        return fetch({
            url:'/user/auth/getTicket',
            method:'post',
            data
        })
    },
    //获取我的优惠券列表
    getMyTicketList (data){
        return fetch({
            url:'/goods/auth/myTicketList',
            method:'get',
            data
        })
    },
     //确认订单
    submitOrder (data){
        return fetch({
            url:'/goods/auth/submitOrder',
            method:'post',
            data
        })
    },
    //获取我的订单详情
    getMyOrderDetail (data){
        return fetch({
            url:'/user/auth/getOrderDetail',
            method:'get',
            data
        })
    },
     //获取我的收货地址列表
    getMyAddress (){
        return fetch({
            url:'/user/auth/getMyAddress',
            method:'get',
            
        })
    },
    //获取积分商城列表
    getPointGoodsList (){
        return fetch({
            url:'/goods/auth/pointGoodsList',
            method:'get',
            
        })
    },
    //积分兑换商品
    submitPoint (data){     
        return fetch({
            url:'/goods/auth/submitPoint',
            method:'post',
            data
        })
    },
     //种植首页
     getHomeData (){     
        return fetch({
            url:'/index/auth/index',
            method:'get',
            
        })
    },
    //我的钱包
    getMyWallet (){     
        return fetch({
            url:'/index/auth/wallet',
            method:'get',
            
        })
    },
    //我的果树
    getMyTree (){     
        return fetch({
            url:'/index/auth/myTree',
            method:'get',
            
        })
    },
    //我的收获
    getMyFruit (){     
        return fetch({
            url:'/index/auth/getFruit',
            method:'get',
            
        })
    },
    //果子操作
    setDoFruit (data){     
        return fetch({
            url:'/index/auth/doFruit',
            method:'post',
            data
        })
    },
    //果树操作
    setDoTree (data){     
        return fetch({
            url:'/index/auth/doTree',
            method:'post',
            data
        })
    },
    //我的果树数量-大图
    getMyfruiterNum (){     
        return fetch({
            url:'/index/auth/myTreeCount',
            method:'get',
            
        })
    },
    //可领取的优惠券列表
    getTicketList (){     
        return fetch({
            url:'/goods/ticketList',
            method:'get',
            
        })
    },
    //购物车列表
    getCartList (){     
        return fetch({
            url:'/goods/auth/carList',
            method:'get',
            
        })
    },
    //确认收货
    confirmOrder (data){     
        return fetch({
            url:'/user/auth/sureOrder',
            method:'post',
            data
        })
    },
    //折扣商城
    getDicounList (data){     
        return fetch({
            url:'/goods/dicountList',
            method:'get',
            data
        })
    },
    wxConfig (){
        return fetch({
            url:'/user/config',
            method:'post',
        })
    },
    wxPAy (data){
        return fetch({
            url:'/user/auth/pay',
            method:'post',
            data
        })
    },
    //充值
    recharge (data){
        return fetch({
            url:'/user/auth/charge',
            method:'post',
            data
        })
    },
    //添加银行卡
    addBankCard (data){
        return fetch({
            url:'/user/auth/addBankCard',
            method:'post',
            data
        })
    },
    //资金明细
    getMoneyDetail (data){
        return fetch({
            url:'/user/auth/moneyDetail',
            method:'get',
            data
        })
    },
    //取消订单
    deleteOrder (data){
        return fetch({
            url:'/goods/auth/deleteOrder',
            method:'post',
            data
        })
    },
    //提现
    withdraw (data){
        return fetch({
            url:'/user/auth/withdraw',
            method:'post',
            data
        })
    },
    //订单评价
    evaluate (data){
        return fetch({
            url:'/goods/auth/evaluate',
            method:'post',
            data
        })
    },
    //果树支付
    payTree (data){
        return fetch({
            url:'/user/auth/payTree',
            method:'post',
            data
        })
    },
     //添加收货地址
     addMyAddress (data){
        return fetch({
            url:'/user/auth/addMyAddress',
            method:'post',
            data
        })
    },
    //删除地址
    deleteAddress (data){
        return fetch({
            url:'/user/auth/deleteAddress',
            method:'post',
            data
        })
    },
    //设置地址为默认
    setAddress (data){
        return fetch({
            url:'/user/auth/setAddress',
            method:'post',
            data
        })
    },
    //评价列表
    evaluateList (data){
        return fetch({
            url:'/goods/evaluateList',
            method:'get',
            data
        })
    },
     //搜索商品
     searchGoods (data){
        return fetch({
            url:'/goods/searchGoods',
            method:'get',
            data
        })
    },
     //获取我的信息
     getMyInfo (){
        return fetch({
            url:'/user/auth/myInfo',
            method:'get',
            
        })
    },
    //修改我的信息
    changeMyInfo (data){
        return fetch({
            url:'/user/auth/changeMyInfo',
            method:'post',
            data
        })
    },
}