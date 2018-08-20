<template>
    <div class="withdraw">
        <div v-if="!succeed">
            <div class="num">
                <p>我的余额</p>
                <span class="icon">￥</span>
                <span>{{ num || 0 }}</span>
            </div>
            <group class="input">
                <x-input title="提现金额" type="number" placeholder="请输入提现金额" class="weui-vcode" v-model="num" :show-clear="false">
                    <div slot="right" class="all">发送验证码</div>
                </x-input>
            </group>
            <div class="pay-btn">
                <x-button >提现</x-button>
            </div>
        </div>
        <div v-else>
            <div class="success">
                <img src="src/assets/images/ho_sapling@2x.png" alt="">
                <p class="f-16">已申请</p>
                <p class="f-16">已发起提现<span>￥800.0</span>元</p>
                <p class="hint">请留意微信零钱入账通知</p>
                <x-button mini plain>返回钱包</x-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Group, XInput, XButton } from 'vux'
    export default{
        data (){
            return{
                succeed:true,
                num:null,
            }
        },
        components:{ Group, XInput,XButton }
    }
</script>
<style lang="less" scoped>
    .withdraw{
        height: 100vh;
        // background-color: #f3f3f3;
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
        .input{
            .all{
                color: #60a609;
            }
        }
        .success{
            text-align: center;
            padding-top: 64px;
            .hint{
                color: #999;
            }
            span{
                color: #f11010;
            }
            button{
                margin-top: 58px;
                border-color: #60a609;
                color: #60a609;
            }
        }
    }
</style>
