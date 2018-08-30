import fetch from '@/utils/fetch';
export default {
    //商城首页
    homeData (){
        return fetch({
            url:'/user/index',
            method:'get'
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
    getMyTicketList (){
        return fetch({
            url:'/goods/auth/myTicketList',
            method:'get',
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
}