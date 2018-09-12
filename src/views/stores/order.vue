<template>
    <div  class="order">
        <div class="site">
            <div class="icon">
                <img src="src/assets/images/mer_site@2x.png" alt="">
            </div>
            <group class="select" v-if="goodsData.receiverName && goodsData.address && goodsData.receiverPhone">
                <cell :title="goodsData.receiverName + goodsData.receiverPhone" value="" is-link :inline-desc="goodsData.address"></cell>
            </group>
            <group class="select" v-else>
                <cell title="添加收货地址" value="" is-link link="/me/add-site"></cell>
            </group>
        </div>
        <div class="goods">
            <div class="left">
                <img :src="goodsData.coverImage" alt="">
            </div>
            <div class="right">
                <p>{{goodsData.introduce }}</p>
                <p>规格：1000g</p>
                <div v-if="!isIntegral">
                    <group>
                        <x-number :title="!isIntegral ? '￥' : '积分：' + goodsData.price" v-model="goodsNum" :min="1" width="30px" @on-change="change"  ></x-number>
                    </group>
                </div>
            </div>
        </div>
        <group v-if="!isIntegral">
            <cell title="优惠券" :value="'-' + ticketData.price" is-link @click.native.stop="ticket_show = !ticket_show"></cell>
        </group>
        <div v-if="!isIntegral">
            <group >
                <x-input title="留言" placeholder="请输入您想说的话" novalidate v-model="message"  :show-clear="false"  placeholder-align="left"></x-input>
            </group>
        </div>
        <div class="line"></div>
        <div class="pay" v-if="!isIntegral">
            <group title="请选择支付方式">
                <radio :options="payList"  v-model="payType">
                    
                </radio>
            </group>
        </div>
        <div class="bottom-btn">
            <div class="total">总价：<span>{{totalPrices}}</span></div>
            <div class="num">共{{goodsNum}}件商品</div>
            <div class="btn" @click.stop="submitClick">提交订单</div>
        </div>
        <div v-transfer-dom class="ticket-pop">
            <popup v-model="ticket_show" >
                <group v-for="(item,index) in ticketList" :key="index">
                    <cell :title="item.price + '元'"  :inline-desc="'满'+item.suitPrice+'元减'+item.price+'元'">
                        <x-button  mini plain type="primary" @click.native.stop="employTicketFun(item)" :disabled="usable_ticketList.indexOf(item.id) === -1">使用</x-button>
                    </cell>
                </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Cell, Group, XNumber, Radio, XInput, Popup, TransferDom, XButton } from 'vux'
    import api from '@/api'
    import order from '@/mixins/order'
    export default{
        data () {
            return{
                payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: 1,
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: 2,
                }],
                isIntegral:null,      //是否为积分商品
                payType:1,
                color:'#60a609',
                goodsId:null,
                goodsData:{},
                goodsNum:null,
                ticket_show:false,
                ticketList:[],          //我的优惠券列表
                totalPrices_no:0,         //总价(未使用优惠券)
                usable_ticketList:[],       //可以的优惠券id列表
                usable_ticketData:[],       //可以的优惠券数据列表
                ticketData:{},               //正在使用的优惠券
                touch:0,
                message:'',                      //留言

            }
        },
        mixins:[order],
        directives: {
            TransferDom
        },
        components:{
            Cell, Group, XNumber , Radio, XInput, Popup, TransferDom, XButton
        },
        methods:{
            change (){

            },
            getOrderData (){
                let _this = this;
                api.getOrderData({
                    id:_this.goodsId
                }).then(data =>{
                    _this.goodsData = data;
                }).catch(e =>{})
            }, 
            //获取我的优惠券
            getMyTicketListFun (){
                let _this = this;
                api.getMyTicketList({
                    status:false
                }).then(data =>{
                    _this.ticketList = data;
                }).catch(e =>{})
            },
            setUsable_ticketList (){
               
            },
            //使用优惠券
            employTicketFun (data){
                this.touch ++;
                this.ticketData = data;
                this.ticket_show = false;
            },
            submitClick (){
                let _this = this;
                if(!this.isIntegral){
                    api.submitOrder({
                        addressId:_this.goodsData.addressId,
                        goodsId:_this.goodsData.goodsId,
                        message:_this.message,
                        num:_this.goodsNum,
                        ticketId:_this.ticketData.id,
                        payType:_this.payType
                    }).then(data =>{
                        if(data){
                            _this.payFun(data)
                        }else{
                            _this.showTips('订单id错误')
                        }
                    }).catch(e =>{})
                }else{
                    api.submitPoint({
                        addressId:_this.goodsData.addressId,
                        goodsId:this.goodsData.goodsId,
                    }).then(data =>{
                        _this.showTips('兑换成功');
                        _this.$router.push('/order/order-inform/0')
                    }).catch(e =>{})
                }
                

            },
            payFun (id){
                let _this = this;
                api.wxPAy({
                    orderId:id,
                    total_fee:_this.totalPrices,
                    type:_this.payType
                }).then(data =>{
                    if(data){
                        _this.wxConfirmFun(data)
                    }else{
                        _this.showTips('参数错误')
                    }
                }).catch(e =>{})
            }
        },
        computed:{
            totalPrices (){
                this.totalPrices_no = this.goodsNum * this.goodsData.price;
                let _this = this;
                this.usable_ticketList = [];
                this.ticketList.forEach(item => {        //判断优惠券是否可用
                    if(item.suitPrice <= _this.totalPrices_no){
                        this.usable_ticketList.push(item.id);
                        this.usable_ticketData.push(item)
                    }
                });
                this.usable_ticketData.sort(function(a,b){
                    return a.price - b.price
                })
                let $length = this.usable_ticketData.length;
                if($length){
                    if(this.touch === 0){
                        this.ticketData = this.usable_ticketData[$length - 1];
                    }
                    let ticketNum = !this.isIntegral ? this.ticketData.price : 0;
                    return  (this.goodsNum * this.goodsData.price) - ticketNum
                }
                return (this.goodsNum * this.goodsData.price) 
                
                // if(this.goodsNum && this.goodsData.price){
                //     return
                //     this.goodsNum * this.goodsData.price
                // }
            },
            
        },
      
        created() {
            let id = this.$route.params.id;
            this.goodsId = id;
            let num = this.$route.query.num;
            let type = this.$route.query.type;
            if(type){
                this.isIntegral = type;
            }else{
                this.getMyTicketListFun()
            }
            this.goodsNum = parseInt(num);
            this.getOrderData();
        },
    }
</script>
<style lang="less" >
    .order{
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
            >div{
                flex: 1;
            }
            .total{
                color: #999999;
                padding-left: 15px;
                span{
                    color: #f11010;
                    font-size:16px;
                }
            }
            .num{
                padding-right: 12px;
                text-align: right;        
            }
            .btn{
                font-size: 16px;
                text-align: center;
                background: #60a609;
                color: #fff;
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
    }
</style>
