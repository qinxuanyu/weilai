import fetch from '@/utils/fetch';
export default {
 
     //登录
    login (data){
        return fetch({
            url:'/user/login',
            method:'post',
            data
        })
    },
    //静默授权 -支付所用登录
    moLogin (data){
        return fetch({
            url:'/user/moLogin',
            method:'post',
            data
        })
    },
     //我的
     getMyInfo (data){
        return fetch({
            url:'/user/auth/myInfo',
            method:'get',
            data
        })
    },
     //获取我的激活码
     getMyCode (data){
        return fetch({
            url:'/user/auth/myCode',
            method:'get',
            data
        })
    },
     //支付
     pay (data){
        return fetch({
            url:'/goods/auth/pay',
            method:'post',
            data
        })
    },
     //支付
     submitOrder (data){
        return fetch({
            url:'/goods/auth/submitOrder',
            method:'post',
            data
        })
    },
     //钱包明细
     moneyDetail (data){
        return fetch({
            url:'/user/auth/moneyDetail',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
      //提现
      withdraw (data){
        return fetch({
            url:'/user/auth/withdraw',
            method:'post',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
    //支付宝信息填充
    payInfo (data){
        return fetch({
            url:'/user/auth/payInfo',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
    //我的团队
    myTeam (data){
        return fetch({
            url:'/user/auth/myTeam',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
     //我的团队总数
     myTeamNum (data){
        return fetch({
            url:'/user/auth/myTeamNum',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
    //设置激活码
    setCode (data){
        return fetch({
            url:'/goods/auth/code',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
    //商品详情
    getGoodsDetail (data){
        return fetch({
            url:'/goods/goodsDetail',
            method:'get',
            data          //1账户明细 2提现记录 3佣金记录
        })
    },
    //是否维护
    getIsProtect (data){
        return fetch({
            url:'/user/isProtect',
            method:'get',
            data         
        })
    },
    //app下载链接
    downloadAddress (data){
        return fetch({
            url:'/user/auth/downloadAddress',
            method:'get',
            data         
        })
    },
     //取消支付删除订单
     delOrder (data){
        return fetch({
            url:'/auth/delOrder?id=' +data,
            method:'post',
                     
        })
    },
}