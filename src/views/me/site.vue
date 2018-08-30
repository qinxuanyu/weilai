<template>
    <div class="site">
        <check-icon v-for="(item,index) in listData" :key="index" :value.sync="bool">
            <div class="warp">
                <div class="name">
                    <span>{{item.receiverName}}</span><span>{{item.receiverPhone}}</span>
                </div>
                <p>{{item.province + item.city + item.area + item.address}}</p>
                <div class="btn">
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            </div>
        </check-icon>
        <x-button>+新增地址</x-button>
    </div>
</template>
<script>
    import { CheckIcon, XButton } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[],
                bool:false
            }
        },
        components:{CheckIcon, XButton},
        methods:{
            getMyaddressList (){
                let _this = this;
                api.getMyAddress().then(data =>{
                    if(data){
                        _this.listData = data;
                    }
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
        }
        button{
            width: 80% !important;
            margin-top: 150px;
        }
    }
</style>
