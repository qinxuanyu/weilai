<template>
    <div class="withdraw">
        <div v-if="!succeed">
            <div class="num">
                <p>我的余额</p>
                <span class="icon">￥</span>
                <span>{{ maxNum || 0 }}</span>
            </div>
            <group class="input">
                <!-- <x-input title="提现金额" type="number" placeholder="请输入提现金额" class="weui-vcode" v-model="num" @on-change="inputKeyUp" :show-clear="false"> -->
                    <!-- <div slot="right" class="all">发送验证码</div> -->
                <!-- </x-input> -->
                <x-number title="提现金额" v-model="num" :min="0" :max="maxNum" :fillable="true"></x-number>
            </group>
            <div class="pay-btn">
                <x-button @click.native.stop="withdrawFun">提现</x-button>
            </div>
        </div>
        <div v-else>
            <div class="success">
                <img src="src/assets/images/ho_sapling@2x.png" alt="">
                <p class="f-16">已申请</p>
                <p class="f-16">已发起提现<span>￥{{num}}</span>元</p>
                <p class="hint">请留意银行卡入账通知</p>
                <x-button mini plain @click.native.stop="$router.go(-1)">返回钱包</x-button>
            </div>
        </div>
    </div>
</template>
<script>
    import { Group, XInput, XButton, XNumber } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                succeed:false,
                num:0,
                maxNum:0
            }
        },
        components:{ Group, XInput,XButton, XNumber },
        methods:{
            withdrawFun (){
                let _this = this;
                if(!this.num){
                    return this.showTips('请输入金额')
                }
                api.withdraw({
                    money:this.num
                }).then(data =>{
                    _this.succeed = true;
                    
                }).catch(e =>{})
            },
           
        },
        created() {
            let maxNum = this.$route.params.num;
            this.maxNum = parseInt(maxNum);
        },
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
