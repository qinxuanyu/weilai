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
}