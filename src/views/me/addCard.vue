<template>
    <div class="add-site" >
        <group>
            <x-input title="姓名" placeholder="真实姓名" v-model="realName"></x-input>
            <x-input title="卡号" placeholder="银行卡卡号" type='number' v-model="cardNumber"></x-input>
            <x-input title="银行" placeholder="开户银行" v-model="bank"></x-input>
        </group>
        <x-button @click.native.stop="addBankCardClick">保存</x-button>
    </div>
</template>
<script>
    import { Group, XInput, XButton } from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
               realName:'',
               cardNumber:'',
               bank:'' 
            }
        },
        components:{ Group, XInput, XButton },
        methods:{
            addBankCardClick (){
                let _this = this;
                if(!this.realName){
                    return this.showTips('请输入真实姓名')
                }else if(!this.cardNumber){
                    return this.showTips('请输入银行卡号')
                }else if(!tool.utils.isBankCard(this.cardNumber)){
                    return this.showTips('请输入正确的银行卡号')
                }
                else if(!this.bank){
                    return this.showTips('请输入开户银行')
                }
                api.addBankCard({
                    userName:_this.realName,
                    bankCode:_this.cardNumber,
                    bankName:_this.bank
                }).then(data =>{
                    history.go(-1)
                }).catch(e =>{})
            }
        }

    }
</script>
<style lang="less" scoped>
    .add-site{
        button{
            width: 80%;
            font-size: 16px;
            margin-top: 50px;
        }
    }
</style>
