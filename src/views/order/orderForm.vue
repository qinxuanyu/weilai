<template>
    <div class="order-form">
        <tab custom-bar-width="34px" :line-width="2" id="tab">
            <tab-item :selected="fromdata.type == 0 || fromdata.type == ''" @on-item-click="onItemClick('')">全部</tab-item>
            <tab-item :selected="fromdata.type == 1" @on-item-click="onItemClick(1)">待付款</tab-item>
            <tab-item :selected="fromdata.type == 2" @on-item-click="onItemClick(2)">待发货</tab-item>
            <tab-item :selected="fromdata.type == 3" @on-item-click="onItemClick(3)">待收货</tab-item>
            <tab-item :selected="fromdata.type == 4" @on-item-click="onItemClick(4)">待评价</tab-item>
            <tab-item :selected="fromdata.type == 5" @on-item-click="onItemClick(5)">售后处理</tab-item>
        </tab>
        <scroller class="my-scroll" :on-infinite="infinite" ref="scroller">
            <div style="height: 1px;"></div>
            <ul class="list">
                <li v-for="(item,index) in listData" :key="index" @click.stop="$router.push('/order/order-details/'+item.id + '/'+ item.type)">
                    <p class="status"><span>{{goodsType(item.type )}}</span>￥{{item.price}}x{{item.num }}</p>
                    <div class="wrap">
                        <div class="img">
                            <img :src="item.coverImage" alt="">
                        </div>
                        <div class="title">
                            
                            <p>{{item.introduce }}</p>
                            <p class="size">规格：{{item.weight}}</p>
                            <div class="btn" v-if="item.type == 1">
                                <x-button mini plain class="one" @click.native.stop="deleteOrderFun(item.id)">取消订单</x-button>
                                <x-button mini plain class="two" @click.native.stop="payType_show = true;orderData = item;">付款</x-button>
                            </div>
                            <div class="btn" v-if="item.type == 2">
                                <x-button mini plain class="two" @click.native.stop="$router.push('/me/service')">找客服</x-button>
                            </div>
                            <div class="btn" v-if="item.type == 3">
                                <x-button mini plain class="one">查看物流</x-button>
                                <x-button mini plain class="two" @click.native.stop="confirmClick(item.id)">确认收货</x-button>
                            </div>
                            <div class="btn" v-if="item.type == 4">
                                <x-button mini plain class="two" @click.native.stop="$router.push('/order/evaluate/'+item.id + '/'+item.goodsId)">评价</x-button>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
            <div></div>
        </scroller>
        <div v-transfer-dom class="size-pop">
            <popup v-model="payType_show" >
                <group title="请选择支付方式">
                    <radio :options="payList"  v-model="payType">
                        
                    </radio>
                </group>
                <x-button type="primary" @click.native.stop="payType_show = !payType_show;payClick()">确定</x-button>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem, XButton, Popup, Group, Radio, TransferDom } from 'vux'
    import api from '@/api'
    import order from '@/mixins/order'
    export default{
        data (){
            return{
                listData:[],
                fromdata:{
                    type:'',
                    createTime:'',
                    size:10
                },
                orderData:{},     //付款的订单信息
                payType_show:false,
                payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: '1',
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: '2',
                } ],
                payType:'1'              //支付方式  1-微信 2-支付宝
            }
        },
        directives: {
            TransferDom
        },
        components:{ Tab, TabItem, XButton, Popup, Group, Radio, },
        mixins:[order],
        methods:{
            onItemClick (type){
                this.fromdata.type = type;
                this.listData = [];
                this.getOrderList()
            },
            getOrderList (){
                let _this = this;
                let type = null;
                
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
                        _this.listData = _this.listData.concat(data);
                        let dataLength = data.length;
                        console.log(data[dataLength - 1])
                        _this.fromdata.createTime = data[dataLength - 1].createTime;
                        
                    };
                    
                }).catch(e =>{
                     _this.$refs.scroller.finishInfinite(2)
                })
            },
            payClick (){
                let _this = this;
                if(this.orderData.id && this.orderData.price && this.orderData.num){
                    api.wxPAy({
                        orderId:_this.orderData.id,
                        total_fee:1,
                        type:_this.payType
                    }).then(data =>{
                        if(data){
                            _this.wxConfirmFun(data)
                        }else{
                            _this.showTips('参数错误')
                        }
                    }).catch(e =>{})
                }else{
                    _this.showTips('订单参数错误')
                }
                
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
                let _this = this;
                this.$refs.scroller.resize();
                setTimeout(()=>{
                    _this.getOrderList()

                },2000)
            },
            confirmClick (id){
                let _this = this;
                api.confirmOrder({
                    goodsId:id
                }).then(data =>{
                    _this.showTips('确认成功');
                    _this.listData = [];
                    _this.fromdata.createTime = '';
                    _this.getOrderList()
                }).catch(e =>{})
            },
            deleteOrderFun (id){
                let _this = this;
                api.deleteOrder({
                    orderId:id
                }).then(data =>{
                    _this.showTips('取消成功')
                    _this.listData = [];
                    _this.getOrderList()
                }).catch(e =>{})
            }
        },created() {
            //  this.getOrderList()
            
            let type = this.$route.params.type;
            if(type != 0){
                this.fromdata.type = type;
            }
        },
        mounted() {
            let window_h = window.innerHeight;
            let tab_h = document.querySelector('#tab').clientHeight;
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
                padding: 10px;
                .wrap{
                    display: flex;
                  
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
                                border-color: #cecece;
                            }
                        }
                        >p{
                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
                            overflow: hidden;
                        }
                        
                        .size{
                            color: #999999;
                        }
                    }
                }
                .status{
                    text-align: right;
                    span{
                        color: #f7ab08;
                        margin-right: 13px;
                    }
                }
            }
        }
    }
</style>
