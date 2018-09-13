<template>
    <div class="add-site" >
        <group>
            <x-input title="联系人" placeholder="真实姓名" v-model="receiverName"></x-input>
            <x-input title="手机号码" placeholder="11位手机号码" v-model="receiverPhone" :max="11"></x-input>
            <x-address title="地区&nbsp;&nbsp;" :list="addressData" placeholder="省市区" value-text-align="left" v-model="value" @on-shadow-change="change" @on-show="show"></x-address>
            <x-input title="详细地址" placeholder="街道门牌信息" v-model="address"></x-input>
            <!-- <x-input title="邮政编码" placeholder="邮政编码"></x-input> -->
        </group>
        <x-button @click.native.stop="addMyAddressClick">保存</x-button>
    </div>
</template>
<script>
    import { Group, XInput, XAddress, ChinaAddressV4Data, XButton } from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
                addressData:ChinaAddressV4Data,
                receiverName:null,
                receiverPhone:null,
                address:null,
                province:null,
                city:null,
                area:null,
                value:[],
                isPop:false,
                address:null
            }
        },
        components:{ Group, XInput, XAddress, XButton },
         methods:{
             addMyAddressClick (){
                 let _this = this;
                 if(!this.receiverName){
                    return this.showTips('请输入真实姓名')
                 }else if(!this.receiverPhone){
                    return this.showTips('请输入手机号码')
                 }else if(!tool.utils.isCNPhone(this.receiverPhone)){
                     return this.showTips('请输入正确的手机号码')
                 }
                 else if(!this.province || !this.city || !this.area){
                    return this.showTips('请选择省市区')
                 }else if(!this.address){
                    return this.showTips('请输入详细地址')
                 }
                 api.addMyAddress({
                    receiverName:_this.receiverName,
                    receiverPhone:_this.receiverPhone,
                    address:_this.address,
                    province:_this.address,
                    city:_this.address,
                    area:_this.address
                 }).then(data =>{
                     _this.showTips('添加成功')
                     _this.$router.go(-1)
                 }).catch(e =>{})
             },
             change(ids, names){
                if(this.isPop){
                    this.province = names[0];
                    this.city = names[1];
                    this.area = names[2]
                }
             },
             show (){
                 this.isPop = true;
             }
         }
    }
</script>
<style lang="less" scoped>
    .add-site{
        button{
            font-size: 16px;
            width: 80%;
            margin-top: 50px;
        }
    }
</style>
