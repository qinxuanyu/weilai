<template>
    <div  class="order-details">
        <div class="status">
            <span>{{goodsType(orderType)}}</span>
            <img src="src/assets/images/ind_obligation@2x.png" alt="">
        </div>
        <div class="site">
            <div class="icon">
                <img src="src/assets/images/mer_site@2x.png" alt="">
            </div>
            <group class="select">
                <cell :title="detailData.receiverName + detailData.receiverPhone" value="" is-link :inline-desc="detailData.address"></cell>
            </group>
        </div>
        <div class="goods">
            <div class="left">
                <img :src="detailData.coverImage" alt="">
            </div>
            <div class="right">
                <p>{{detailData.introduce}}</p>
                <p>规格：{{detailData.weight}}g</p>
                <div class="num">
                   <p><span>￥{{detailData.price}}</span>x{{detailData.num}}</p>
                   <x-button mini plain @click.native.stop="deleteOrderFun(detailData.ordersId)">取消订单</x-button>
                </div>
            </div>
        </div>
        <group>
            <cell title="运费" :value="detailData.priceDesc" ></cell>
            <cell title="优惠券" :value="detailData.ticket" ></cell>
            <cell title="实付款（含运费）" value="-￥10.0" ></cell>
        </group>
       
        <div class="line"></div>
         <div class="time">
             <p>订单编号：{{detailData.ordersId}}</p>
             <p>创建时间：{{detailData.createTime}}</p>
             <p>成立时间：2018823</p>
         </div>
        <div class="bottom-btn" v-if="orderType == 1">
            <x-button mini plain @click.native.stop="$router.push('/me/service')">找客服</x-button>
            <x-button mini @click.native.stop="payType_show = true">付款</x-button>
        </div>
        <div class="bottom-btn" v-else-if="orderType == 2">
            <x-button mini plain @click.native.stop="$router.push('/me/service')">找客服</x-button>
            <x-button mini @click.native.stop="$router.push('/order/refund/' + orderId)">退款</x-button>
        </div>
        <div class="bottom-btn" v-else-if="orderType == 3">
            <x-button mini plain>查看物流</x-button>
            <x-button mini @click.native.stop="payClick">确认收货</x-button>
        </div>
        <div class="bottom-btn" v-else-if="orderType == 4">
            <x-button mini plain @click.native.stop="$router.push('/me/service')">找客服</x-button>
        </div>
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
    import { Cell, Group, XNumber, Radio, XInput, XButton, Popup, TransferDom } from 'vux'
    import api from '@/api'
    import order from '@/mixins/order'
    export default{
        data () {
            return{
                changeValue:1,
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
                color:'#60a609',
                orderType:1,
                orderId:null,
                detailData:{},
                payType:'1'              //支付方式  1-微信 2-支付宝
            }
        },
        directives: {
            TransferDom
        },
        components:{
            Cell, Group, XNumber , Radio, XInput, XButton, Popup
        },
        mixins:[order],
        methods:{
            change (){

            },
            goodsType (type){
                switch (type){
                    case '1':
                       return '待付款';
                       break;
                    case '2':
                        return '待发货';
                        break;
                    case '3':
                        return '待收货';
                        break;
                    case '4':
                        return '待评价';
                        break    
                }
            },
            setBottomBtnText (type){
                switch (type){
                    case '1':
                       return '付款';
                       break;
                    case '2':
                        return '待发货';
                        break;
                    case '3':
                        return '待收货';
                        break;
                    case '4':
                        return '待评价';
                        break    
                }
            },
            getDetailData (){
                let _this = this;
                api.getMyOrderDetail({
                    id:_this.orderId
                }).then(data =>{
                    // console.log(data)
                    if(data){
                        _this.detailData = data;
                    }
                }).catch(e =>{})
            },
            payClick (){
                let _this = this;
                api.wxPAy({
                    orderId:_this.detailData.ordersId,
                    total_fee:_this.detailData.price ,
                    type:_this.payType
                }).then(data =>{
                    if(data){
                        _this.wxConfirmFun(data)
                    }else{
                        _this.showTips('参数错误')
                    }
                }).catch(e =>{})
            },
            deleteOrderFun (id){
                let _this = this;
                api.deleteOrder({
                    orderId:id
                }).then(data =>{
                    _this.showTips('取消成功')
                   history.go(-1)
                }).catch(e =>{})
            }
        },
        created() {
            let id = this.$route.params.id;
            let type = this.$route.params.type;
            this.orderId = id;
            this.orderType = type;
            this.getDetailData()
                        
            // if (typeof WeixinJSBridge == "undefined"){
            //     if( document.addEventListener ){
            //         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            //     }else if (document.attachEvent){
            //         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
            //         document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            //     }
            // }else{
            //     this.onBridgeReady();
            // }
        },
        mounted() {
            
        },
    }
</script>
<style lang="less" >
    .order-details{
        .status{
            height: 85px;
            background: linear-gradient(left top,rgb(154, 217, 76),rgb(99, 168, 14));
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            img{
                width: 42px;
            }
            span{
                font-size: 20px;
                color: #fff;
            }
        }
        .site{
            display: flex;
            align-items: center; 
            .icon{
                width: 52px;
                position: relative;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 20px;
                    display: block;
                    margin: auto;
                }
            }
            .select{
                flex: 1;
                font-size: 14px;
                .vux-label{
                    font-size: 14px;
                }
                .weui-cells{
                    margin-top: 0;
                }
                .weui-cells:before{
                    height: 0 !important;
                    border-top: 0;
                }
                .weui-cells:after{
                    height: 0 !important;
                    border-bottom: 0;
                }
            }
        }
        .goods{
            display: flex;
            padding: 12px;
            .left{
                width: 100px;
                height: 95px;
                overflow: hidden;
                img{
                    width: 100%
                }
            }
            .right{
                flex: 1;
                padding-left: 8px;
                .weui-cell{
                    font-size: 14px
                }
                .vux-number-input{
                    font-size: 14px;
                }
                .num{
                    display: flex;
                    justify-content: space-between;
                    p{
                        span{
                            color: #f11010;
                            font-size: 16px;
                        }
                    }
                }
            }
            
        }
        .weui-cells{
            font-size: 14px;
            margin-top: 0;
        }
        .bottom-btn{
            position: fixed;
            width: 100%;
            height: 50px;
            line-height: 50px;
            left: 0;
            bottom: 0;
            display: flex;
            border-top: 1px solid #bdbdbd;
            justify-content: flex-end;
            align-items: center;
            background-color: #fff;
            button{
                margin: 0;
                margin-right: 10px;
                box-sizing: border-box;
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
        .time{
            line-height: 30px;
            color: #999999;
            padding: 0 20px;
        }
        .weui-btn_plain-default{
            border-color: #cecece !important;
        }
    }
</style>
