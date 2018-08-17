import fetch from '@/utils/fetch';
export default {
    //商城首页
    homeData (){
        return fetch({
            url:'/user/index',
            method:'get'
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
    }
}