<template>
    <div class="order">
        <div class="goods">
            <img src="/src/assets/images/goods_top.jpg" alt="">
            <div class="text">
                <p class="name">会员</p>
                <p class="num">
                    <span>￥69.00</span>
                    <span>X1</span>
                </p>
            </div>
        </div>
        <div class="cell">
            <span class="title">商品总额</span>
            <span class="num">￥69.00</span>
        </div>
        <p class="explain">应付金额 <span>￥69.00</span>请选择以下支付方式支付</p>
        <div class="pay-type">
            <img class="icon-1" src="/src/assets/images/my/par_wechat@2x.png" alt="">
            <span>微信支付</span>
            <img class="icon-2" src="/src/assets/images/my/par_choice@2x.png">
        </div>
        <button class="submit-btn" @click.stop="placeOrder">立即支付</button>
    </div>
</template>
<script>
    import api from '@/api'
    import tool from '@/utils/tool'
    export default {
        data (){
            return{
                orderId:null,
            }
        },
        methods:{
            placeOrder (){
                let _this = this;
                api.submitOrder({
                    goodsId:1,
                    totalMoney:69.00,
                    // totalMoney:0.01,


                }).then(data =>{
                    if(data){
                        _this.pay(data);
                        _this.orderId = data;
                    }else{
                        _this.showTips('订单错误');
                    }
                    // _this
                }).catch(e =>{
                    _this.showTips(e.msg)
                })
            },
            pay(orderId){
                let openId = tool.session.get('payOpenId');
                let _this = this;
                console.log({
                   openid: openId,
                   orderId:orderId,
                   total_fee:69.00,
                //    total_fee:0.01,

                   type:1
                })
                api.pay({
                   openid: openId,
                   orderId:orderId,
                   total_fee:69.00,
                //    total_fee:0.01,

                   type:1
                }).then(data =>{
                    _this.wxConfirmFun(data)
                }).catch(e =>{
                    _this.showTips(e.msg)
                })
            },
            wxConfirmFun(data){
                let _this = this;
                if (typeof WeixinJSBridge == "undefined"){
                    if( document.addEventListener ){
                        document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(data), false);
                    }else if (document.attachEvent){
                        document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(data)); 
                        document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(data));
                    }
                }else{
                    _this.onBridgeReady(data);
                }
            },
            onBridgeReady(data){
                let _this = this;
                console.log({
                    "appId":data.appId,
                    "timeStamp": data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    "nonceStr": data.nonceStr, // 支付签名随机串，不长于 32 位
                    "package": data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    "signType": data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    "paySign": data.paySign, // 支付签名
                })
                WeixinJSBridge.invoke('getBrandWCPayRequest',{
                    "appId":data.appId,
                    "timeStamp": data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    "nonceStr": data.nonceStr, // 支付签名随机串，不长于 32 位
                    "package": data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    "signType": data.signType, // 签名方式，默  认为'SHA1'，使用新版支付需传入'MD5'
                    "paySign": data.paySign, // 支付签名
                },function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok" ){
                        _this.showTips('支付成功')
                        api.setCode().then(data =>{
                            _this.$router.push('/code')
                        }).catch(e =>{
                            _this.showTips('激活码生成失败')
                        })
                        // _this.$router.push('/order/order-inform/3')
                        
                    }else{
                        // api.delOrder(_this.orderId)
                        _this.showTips('取消支付')
                       
                    }

                })
            },
        },
        created() {
            
        },
    }
</script>
<style lang="less" scoped>
    .order{
        padding: 20px 0 0 20px;
        .goods{
            display: flex;
            border-bottom: 1px solid #dbdbdb;
            padding-bottom: 18px;
            padding-right: 13px;
            >img{
                width: 120px;
                height: 116px;
            }
            .text{
                flex: 1;
                padding-left: 17px;
                .name{
                    font-size: 20px;

                }
                .num{
                    display: flex;
                    font-size: 20px;
                    color: #f22222;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 47px;
                    span:nth-child(2){
                        font-size: 16px;
                        color: #565656;
                    }
                }
            }
            
        }
        .cell{
            display: flex;
            font-size: 16px;
            padding: 15px 13px 15px 3px;
            border-bottom: 1px solid #f3f3f3;
            justify-content: space-between;
            .title{
                
            }
            .num{
                color: #f22222;

            }
        }
        .explain{
            margin: 20px 0;
            span{color: #f22222}
        }
        .pay-type{
            display: flex;
            justify-content: space-between;
            padding-right: 14px;
            align-items: center;
            .icon-1{
                width: 28px;
                height: 28px;
            }
            span{
                flex: 1;
                padding-left: 15px;
            }
            .icon-2{
                width: 21px;
                height: 14px;
            }
            
        }
        .submit-btn{
            width: 100%;
            display: block;
            height: 40px;
            /* margin: 200px auto 0 auto; */
            position: fixed;
            left: 0;
            bottom: 0;
            background-color: #e95701;
            color: #fff;
            border: 0;
        }
    }
</style>
