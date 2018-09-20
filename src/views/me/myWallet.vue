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
                <span>{{remaining}}</span>
            </p>
        </div>
        <div class="btn">
            <x-button class="pay" link="/me/recharge">充值</x-button>
            <x-button class="with" @click.native.stop="withdrawLink">提现</x-button>
        </div>
        <group>
            <cell :title="!bankName ? '未添加银行卡' : bankName " link="/home/add-card" :inline-desc="!bankCode ? '点击添加银行卡' : bankCode"></cell>
        </group>
    </div>
</template>
<script>
    import { XButton, Group, Cell } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                remaining:0,
                bankName:null,
                bankCode:null
            }
        },
        components:{ XButton, Group, Cell },
        methods:{
            getWalletData (){
                let _this = this;
                api.getMyWallet().then(data =>{
                    if(data.money){
                        _this.remaining = data.money;
                    }
                    _this.bankName = data.bankName;
                    _this.bankCode = data.bankCode;
                }).catch(e =>{})
            },
            withdrawLink (){
                let _this = this;
                if(!this.bankCode){
                    this.$vux.confirm.show({
                        // 组件除show外的属性
                        title:'提示',
                        content:'请先添加银行卡',
                        onCancel () {
                            
                        },
                        onConfirm () {
                            _this.$router.push('/home/add-card')
                        }
                    })
                }else{
                    _this.$router.push('/me/withdraw/'+_this.remaining)
                }
            }
        },
        created() {
            this.getWalletData()
        },
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
