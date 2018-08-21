<template>
    <div class="my-wallet">
        <div class="num">
            <div class="title">
                <div></div>
                <div class="hint">我的余额(元)</div>
                <div class="link"><router-link to="/me/capital">资金明细</router-link></div>
            </div>
            <p>
                ￥
                <span>800.6</span>
            </p>
        </div>
        <div class="btn">
            <x-button class="pay" link="/me/recharge">充值</x-button>
            <x-button class="with" link="/me/withdraw">提现</x-button>
        </div>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    export default{
        data (){
            return{

            }
        },
        components:{ XButton }
    }
</script>
<style lang="less" scoped>
    .my-wallet{
         height: 100vh;
        background-color: #f3f3f3;
        overflow: hidden;

        .num{
            margin-top:8px;              
            padding: 22px 15px;
            background-color: #fff;
            .title{
                display: flex;
                align-items: center;
                div{
                    flex: 1;
                    text-align: center;
                }
                .link{
                    text-align: right;
                    a{
                        color: #60a609;
                    }
                }
                .hint{
                    font-size: 16px;
                }
            }
            >p{
                text-align: center;
                span{
                    font-size: 22px;
                    color: #f11010;
                }
            }
        }
        .btn{
            padding: 33px 22px;
           
            .pay{
                background-color: #60a609;
                color: #fff;
                font-size: 16px;
            }
            .with{
                background-color: #f6b10b;
                color: #fff;
                font-size: 16px;
            }
        }
    }
</style>
