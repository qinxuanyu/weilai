<template>
    <div class="vindicate">
        <div class="title">
            <p>果树维护费1年<span>（2019-07-22）：</span></p>
            <span>￥200</span>
        </div>
        <group class="pay" title="请选择支付方式">
            <radio :options="payList"  value="1">
                    
            </radio>
        </group>
        <div class="bottom-btn">
            <div class="total">总价<span>￥200.0</span></div>
            <div class="num text-right">共1件商品</div>
            <div class="btn">提交订单</div>
        </div>
    </div>
</template>
<script>
    import { Group, Radio } from 'vux'
    export default{
        data (){
            return{
                 payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: '1',
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: '2',
                },{
                    value: '我的钱包支付',
                    icon:'src/assets/images/mer_wallet@2x.png',
                    key: '3',
                }],
            }
        },
        components:{ Group, Radio },

    }
</script>
<style lang="less" scoped>
    .vindicate{
        height: 100vh;
        background-color: #f3f3f3;
        span{
            color: #999999;
        }
        .title{
            display: flex;
            padding: 15px;
             background-color: #fff;
        }
        .pay{
            background-color: #fff;
            // margin-top: 8px;
        }
        .bottom-btn{ 
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            align-content: center;
            background-color: #fff;
            >div{
                flex: auto;
                padding: 0 15px;
                 line-height: 50px;
            }
            .total{
                color: #999999;
                span{
                    font-size: 16px;
                    color: #f11010;
                }
            }
            .btn{
                height: 50px;
                background-color: #60a609;
                color: #fff;
                text-align: center;
               
            }
        }
    }
</style>
