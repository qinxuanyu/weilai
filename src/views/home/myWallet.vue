<template>
    <div class="my-wallet">
        <div class="top">
            <div v-if="type == 1">
                <p>赠送余额</p>
                <p class="num">{{(60 - myInfo.waitMoney ) | numFilter}}</p>
            </div>
            <div v-else-if="type == 2">
                <p>可用余额</p>
                <p class="num">{{myInfo.freeMoney | numFilter}}</p>
                <p>已提现金额：{{myInfo.withdrawMoney | numFilter}}</p>
            </div>
             <x-button class="t-button" @click.native.stop="withdrawClick">提现</x-button>
        </div>
       
        <div class="cell">
            <group>
                <cell 
                    v-for="(item,index) in cellArr" 
                    :key="index" 
                    :title="item.title" 
                    is-link
                    :link="item.link"
                >
                    <img :src="item.icon" width="22px" slot="icon" alt="">
                </cell>
            </group>
           
        </div>
        <div v-transfer-dom class="t-pop">
            <x-dialog v-model="showToast" class="dialog-demo" :hide-on-blur="true">
                <div class="pop-box">
                    <div class="title">
                        <p>请输入您的提现金额，提现手续费3%</p>

                        <img @click.stop="showToast = false" src="/src/assets/images/my/par_close.png" alt="">
                    </div>
                    <div class="input-box">
                        <input type="text" v-model="payCode" placeholder="请输入您的支付宝账号">
                        <input type="text" v-model="payName" placeholder="请输入您支付宝实名认证的姓名">
                        <input type="number" v-model.number="money" placeholder="请输入您要提现的金额">
                    </div>
                    <p class="explain" v-if="type == 1">最小提现金额为60.00元</p>
                    <!-- <p class="explain" v-else-if="type == 2">最小提现金额为50.00元</p> -->
                    <div class="btn-box">
                        <button @click.stop="showToast = false">取消</button>
                        <button @click.stop="submitWithdraw">确认</button>
                    </div>
                </div>
                <!-- <div @click="show=false">
                    <span class="vux-close"></span>
                </div> -->
            </x-dialog>
        </div>
    </div>
</template>
<script>
    import { XButton, Cell, TransferDomDirective as TransferDom, XDialog, Group } from 'vux'
    import api from '@/api'
    export default {
        directives: {
            TransferDom,
        },
        data (){
            return{
                cellArr:[{
                    title:'账户明细',
                    icon:'/src/assets/images/wallet/detail@2x.png',
                    link:'/details/1',
                },{
                    title:'提现记录',
                    icon:'/src/assets/images/wallet/deposit@2x.png',
                    link:'/details/2',
                },{
                    title:'佣金记录',
                    icon:'/src/assets/images/wallet/commission@2x.png',
                    link:'/details/3',
                }],
                showToast:false,
                myInfo:{},
                money:null,
                payCode:null,
                payName:null,
                type:1
            }
        },
        components:{XButton, Cell, XDialog, Group},
        methods:{
            getMyInfo (){
                let _this = this;
                api.getMyInfo().then(data =>{
                    _this.myInfo = data;
                }).catch(e =>{})
            },
            withdrawClick (){
                if(this.type == 1){
                    if(this.myInfo.waitMoney && (60 - this.myInfo.waitMoney ) == 0){
                        this.showTips('余额不足');
                        return
                    }
                    if(  (60 - this.myInfo.waitMoney ) == 60){

                        this.showToast = true
                        return
                    }else{
                        this.showTips('您的可提现金额不足60.00元')
                    }
                }else if(this.type == 2){
                    if(this.myInfo.freeMoney && this.myInfo.freeMoney == 0){
                        this.showTips('余额不足')
                        return
                    }
                    if(this.myInfo.freeMoney && this.myInfo.freeMoney >= 50){
                        this.showToast = true;
                        return
                    }else{
                        this.showTips('最低50.00元起提')
                    }
                }
                
            },
            submitWithdraw (){
                let _this = this;
                if(!this.payCode){
                    return this.showTips('请输入支付宝账号')
                }else if(!this.payName){
                    return this.showTips('请输入支付宝姓名')
                }else if(!this.money){
                    return this.showTips('请输入提现金额')
                }
                if(String(this.money).indexOf('.') !== -1){
                    return this.showTips('请输入整数')
                }
                if(this.type == 1){
                    if(this.money != 60){
                        return this.showTips('最少提现金额为60元')
                    }
                }
                api.withdraw({
                    money:this.money,
                    payCode:this.payCode,
                    payName:this.payName,
                    type:this.type
                }).then(data =>{
                    _this.showTips('提现成功');
                    _this.getMyInfo()
                    _this.showToast = false;
                }).catch(e =>{
                    _this.showTips(e.data.msg)
                })
            },
            payInfoFun (){
                let _this = this;
                api.payInfo().then(data=>{
                    if(data.payCode ){
                        _this.payCode = data.payCode;
                    }
                    if(data.payName ){
                        _this.payName = data.payName;
                    }
                }).catch(e =>{})
            }
        },
        computed:{
            
        },
        watch:{
            
        },
        created() {
            this.getMyInfo();
            let type = this.$route.params.type;
            if(type){
                this.type = type;
            }
            if(type == 1){
                this.$store.commit('UPDATE_TITLE','赠送钱包')
            }else if(type == 2){
                this.$store.commit('UPDATE_TITLE','我的钱包')
            }
            this.payInfoFun()
        },
    }
</script>
<style lang="less" >
    .my-wallet{
        min-height: 100vh;             
        background-color: #efefef;
        .top{
            text-align: center;
            padding: 30px 0 0 0;
            background-color: #fff;
            overflow: hidden;
            .num{
                color: #f22222;
                font-size: 24px;
            }
             .t-button{
                width: 130px;
                font-size: 16px;
                color: #e95701 !important;
                background-color: #fff !important;
                margin: 30px auto;
            
            }
            .weui-btn:after{
                border-color: #e95701 !important;
            }
            .t-button:affter{
                border-color: #e95701 !important;
            }
        }
        .cell{
            margin-top: 10px;
            background-color: #fff;
            .vux-cell-primary{
                padding-left: 26px;
            }
        }
       
    }
    .pop-box{
        .title{
            display: flex;
            height: 40px;
            align-items: center;
            padding: 0 10px;
            justify-content: space-between;
            background-color: #f3f3f3;
            img{
                width: 20px;
                height: 20px;
            }
        }
        .input-box{
            width: 93%;
            margin: 0 auto;
            input{
                width: 100%;
                height: 33px;
                padding: 0 15px;
                border-radius: 5px;
                margin-top: 25px;
                box-sizing: border-box;
                // box-shadow: initial;
                // border: 0;
                 border: 1px solid #aaaaaa;
                -webkit-box-shadow: 0 0 0 #fff;
                -moz-box-shadow:0 0 0 #fff;
            }
        }
        .explain{
            font-size: 12px;
            color: #e95701;
            text-align: left;
            // line-height: 3px;
            margin: 10px 0;
            padding-left: 20px;
            padding-right: 20px;
        }
        .btn-box{
            width: 93%;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            margin-bottom: 27px;
            margin-top: 30px;
            button:nth-child(1){
                width: 106px;
                height: 32px;
                background-color: #fff;
                border:1px solid #cdcdcd;
                border-radius: 5px;

            }
            button:nth-child(2){
                width: 106px;
                height: 32px;
                background-color: #e95701;
                color: #fff;
                border: 0;
                border-radius: 5px;
                // border:1px solid #cdcdcd;
            }
        }
    }
</style>
