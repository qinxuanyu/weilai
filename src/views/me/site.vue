<template>
    <div class="site">
        
        <check-icon v-for="(item,index) in listData" :key="index" :value.sync="item.checkBul">
            <div class="warp">
                <div class="name">
                    <span>{{item.receiverName}}</span><span>{{item.receiverPhone}}</span>
                </div>
                <p>{{item.province + item.city + item.area + item.address}}</p>
                <div class="btn">
                    <span v-if="!item.isSelected" @click.stop="setSelected(item)">设为默认</span>
                    <span @click.stop="delAddressClick(item)">删除</span>
                </div>
            </div>
        </check-icon>
        <x-button link="/me/add-site">+新增地址</x-button>
    </div>
</template>
<script>
    import { CheckIcon, XButton, Group, Cell } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[],
                bool:false
            }
        },
        components:{CheckIcon, XButton, Group, Cell },
        methods:{
            getMyaddressList (){
                let _this = this;
                api.getMyAddress().then(data =>{
                    if(data){
                        _this.listData = data;
                        _this.listData.foreach(item => {
                            item.checkBul = false
                        });
                    }
                }).catch(e =>{})
            },
            delAddressClick (data){
                let _this = this;
                api.deleteAddress({
                    id:data.id,
                    isSelected:data.isSelected
                }).then(data =>{
                    _this.showTips('删除成功');
                    _this.listData = [];
                    _this.getMyaddressList()
                }).catch(e =>{})
            },
            setSelected (data){
                let _this = this;
                api.setAddress({
                    id:data.id,
                    isSelected:!data.isSelected
                }).then(data =>{
                    _this.showTips('设置成功');
                    _this.listData = [];
                    _this.getMyaddressList()
                }).catch(e =>{})
            }
        },
        created() {
            this.getMyaddressList()
        },
    }
</script>
<style lang="less" >
    .site{
        .vux-check-icon{
            display: flex;
            align-items: center;
            padding: 15px  20px 15px 15px;
            border-bottom: 1px solid #f3f3f3;
            >span{
                flex: 1;
            }
            .warp{
               
                .name{
                    display: flex;
                    justify-content: space-between;
                }
                .btn{
                    display: flex;
                    justify-content: flex-end;
                    span{
                        margin-left: 30px;
                    }
                }
            }
            i.weui-icon {
                display: none !important;
            }
        }
        button{
            width: 80% !important;
            margin-top: 150px;
        }
    }
</style>
