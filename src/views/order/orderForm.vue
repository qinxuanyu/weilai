<template>
    <div class="order-form">
        <tab custom-bar-width="34px" :line-width="2" class="tab">
            <tab-item selected @on-item-click="onItemClick('')">全部</tab-item>
            <tab-item @on-item-click="onItemClick(1)">待付款</tab-item>
            <tab-item @on-item-click="onItemClick(2)">待发货</tab-item>
            <tab-item @on-item-click="onItemClick(3)">待收货</tab-item>
            <tab-item @on-item-click="onItemClick(4)">待评价</tab-item>
        </tab>
        <scroller class="my-scroll" :on-infinite="infinite" ref="scroller">
            <div style="height: 1px;"></div>
            <ul class="list">
                <li v-for="(item,index) in listData" :key="index" @click.stop="$router.push('/order/order-details/'+item.id + '/'+ item.type)">
                     <div class="img">
                        <img :src="item.coverImage" alt="">
                    </div>
                    <div class="title">
                        <p class="status"><span>{{goodsType(item.type )}}</span>￥{{item.price}}x{{item.num }}</p>
                        <p>{{item.introduce }}</p>
                        <p class="size">规格：{{item.weight}}</p>
                        <div class="btn" v-if="item.type == 1">
                            <x-button mini plain class="one">取消订单</x-button>
                            <x-button mini plain class="two">付款</x-button>
                        </div>
                        <div class="btn" v-if="item.type == 2">
                            <x-button mini plain class="two" @click.native.stop="$router.push('/me/service')">找客服</x-button>
                        </div>
                        <div class="btn" v-if="item.type == 3">
                            <x-button mini plain class="one">查看物流</x-button>
                            <x-button mini plain class="two" >确认收货</x-button>
                        </div>
                         <div class="btn" v-if="item.type == 4">
                            <x-button mini plain class="two" @click.native.stop="$router.push('/order/evaluate')">评价</x-button>
                        </div>
                    </div>
                </li>
                
            </ul>
            <div></div>
        </scroller>
    </div>
</template>
<script>
    import { Tab, TabItem, XButton } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[],
                fromdata:{
                    type:'',
                    createTime:'',
                    size:10
                }
            }
        },
        components:{ Tab, TabItem, XButton },
        methods:{
            onItemClick (type){
                this.fromdata.type = type;
                this.listData = [];
                this.getOrderList()
            },
            getOrderList (){
                let _this = this;
                api.getMyOrder({
                    type:_this.fromdata.type,
                    createTime:_this.fromdata.createTime,
                    size:_this.fromdata.size
                }).then(data =>{
                    if((data && data.length < _this.fromdata.size) || !data){
                        _this.$refs.scroller.finishInfinite(2)
                    }else if(data.length && data.length == _this.fromdata.size){
                        _this.$refs.scroller.finishInfinite(0)
                    }
                    if(data && data.length){
                        _this.listData = data;
                        let dataLength = data.length;
                        _this.fromdata.createTime = data[dataLength].createTime;
                        
                    };
                    
                }).catch(e =>{})
            },
            goodsType (type){
                switch (type){
                    case 1:
                       return '待付款';
                       break;
                    case 2:
                        return '待发货';
                        break;
                    case 3:
                        return '待收货';
                        break;
                    case 4:
                        return '待评价';
                        break    
                }
            },
            infinite (){
                this.$refs.scroller.resize();
                this.getOrderList()
            }
        },created() {
            //  this.getOrderList()
        },
        mounted() {
            let window_h = window.innerHeight;
            let tab_h = document.querySelector('.tab').clientHeight;
            document.querySelector('.my-scroll').style.height = (window_h - tab_h) +'px';
            document.querySelector('.my-scroll').style.top = tab_h +'px';
        },
    }
</script>
<style lang="less" scoped>
    .order-form{
        .vux-tab-item{
            flex: 1 !important;
        }
        .list{
            li{
                display: flex;
                padding: 10px;
                border-bottom: 1px solid #f3f3f3;
                .img{
                    width: 125px;
                    height: 108px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .title{
                    flex: 1;
                    padding-left: 12px;
                    .btn{
                        display: flex;
                        font-size: 16px;
                        margin-top: 20px;
                        justify-content: flex-end;
                        span{
                            color: #f11010;
                        }
                        button{
                            font-size: 13px;
                            margin: 0;
                            padding: 0 10px;
                            // background-color: #60a609;
                            // color: #fff;
                        }
                        button.two{
                            border-color: #60a609;
                            color: #60a609;
                        }
                        button.one{
                            margin-right: 12px;
                        }
                    }
                    >p{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                    .status{
                        text-align: right;
                        span{
                            color: #f7ab08;
                            margin-right: 13px;
                        }
                    }
                    .size{
                        color: #999999;
                    }
                }
            }
        }
    }
</style>
