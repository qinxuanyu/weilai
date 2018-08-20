<template>
    <div class="recharge">
        <div class="num">
            <span class="icon">￥</span>
            <span>{{ num || 0}}</span>
        </div>
        <group>
            <cell title="收款方" value="种植商城"></cell>
            <x-input title="充值金额" type="tel" placeholder="请输入充值金额" v-model="num"></x-input>
        </group>
        <group title="请选择支付方式">
            <radio :options="payList"  value="1">
                
            </radio>
        </group>
        <div class="pay-btn">
            <x-button >立即支付</x-button>
        </div>
        
    </div>
</template>
<script>
    import { Group, Cell, XInput, Radio, XButton } from 'vux'
    export default{
        data (){
            return{
                num:null,
                payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: '1',
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: '2',
                } ],
            }
        },
        components:{Group, Cell,XInput, Radio, XButton }
    }
</script>
<style lang="less" scoped>
    .recharge{
        height: 100vh;
        background-color: #f3f3f3;
        .num{
            padding: 37px;
            text-align: center;
            span{
                font-size: 22px;
                color: #f11010;
            }
            .icon{
                font-size: 14px;
            }
        }
        .pay-btn{
            padding: 28px 22px;
            button{
                background-color: #60a609;
                color: #fff;
            }
           
        }
    }
</style>
