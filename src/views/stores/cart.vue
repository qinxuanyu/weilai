<template>
    <div class="cart">
         <check-icon :value.sync="demo1" v-for="(item,index) in goodsList" :key="index">
             <div>
                 <div class="goods">
                    <div class="left">
                        <img :src="item.coverImage" alt="">
                    </div>
                    <div class="right">
                        <p>{{item.introduce}}</p>
                        <p>规格：{{item.weight}}g</p>
                        <div>
                            <template>
                                 <group>
                                    <x-number title="￥100" :value="item.num" :min="1" width="30px" ></x-number>
                                </group>
                            </template>
                        </div>
                    </div>
                    <div class="del">
                        <div @click.stop="ticket_show = true">领券</div>
                        <img @click.stop="delCartFun(item.goodsId)" src="src/assets/images/cart_delete@2x.png" alt="">
                    </div>
                </div>
             </div>
         </check-icon>
         <no-data v-if="!goodsList.length"></no-data>
         <div class="bottom-btn" v-else>
             <flexbox :gutter="0" wrap="wrap">
                <!-- <flexbox-item class="left">
                    <div class="flex-demo">
                        <check-icon :value.sync="demo1">
                            共2件商品
                        </check-icon>
                    </div>
                </flexbox-item> -->
                <flexbox-item class="center" style="padding-left:15px;">
                    <div class="flex-demo">
                        <span>总价：</span>
                        <span>￥180.0</span>
                    </div>
                </flexbox-item>
                <flexbox-item class="right">
                    <div class="flex-demo">
                        <div class="btn">结算</div>
                    </div>
                </flexbox-item>
            </flexbox>
         </div>
         <div v-transfer-dom class="ticket-pop">
            <popup v-model="ticket_show" >
                <group v-for="(item,index) in ticketList" :key="index">
                        <cell :title="item.price + '元'"  :inline-desc="'满'+item.suitPrice+'元减'+item.price+'元'">
                            <x-button  mini plain type="primary" @click.native.stop="getTicketFun(item.id)">领取</x-button>
                        </cell>
                </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { CheckIcon, Group, XNumber, Flexbox, FlexboxItem, XButton, Popup, TransferDom, Cell} from 'vux';
    import api from '@/api'
    import noData from '@/components/nodata.vue'
    export default{
        data (){
            return{
                demo1:false,
                changeValue:1,
                demo1:false,
                ticket_show:false,
                ticketList:[],
                goodsList:[]
            }
        },
        directives: {
            TransferDom
        },
        components:{CheckIcon, XNumber, Group, Flexbox, FlexboxItem, XButton, Popup, Cell, noData},
        methods:{
            delCartFun (id){
                let _this = this;
                api.delCart({
                    goodsId:id,
                }).then(data =>{
                    _this.showTips('删除成功');
                    _this.goodsList = [];
                    _this.getCartListFun()
                }).catch(e =>{})
            },
            getTicketListFun (){
                let _this = this;
                api.getTicketList().then(data =>{
                    if(data){
                        _this.ticketList = data;
                    }
                }).catch(e =>{})
            },
            //领取优惠券
            getTicketFun (id){
                let _this = this;
                api.getTicket({
                    ticketId:id
                }).then(data =>{
                    _this.showTips('领取成功')
                }).catch(e =>{})
            },
            getCartListFun (){
                let _this = this;
                api.getCartList().then(data =>{
                    if(data.lenght){
                        _this.goodsList = data;
                    }else{
                         _this.showTips('购物车为空')
                    }
                }).catch(e =>{})
            }
        },created() {
            this.getTicketListFun();
            this.getCartListFun()
        },
    }
</script>
<style lang="less" >
    .cart{
        .vux-check-icon{
            display: flex;
            align-items: center;
            >span{
                flex: 1;
            }
        }
        .goods{
            display: flex;
            padding: 12px;
            justify-content: space-between;
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
                    padding: 0;
                    font-size: 14px
                }
                .vux-number-input{
                    font-size: 14px;
                }
            }
             .vux-number-selector{
                font-size: 14px;
            }
            .del{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                color: #60a609;
                align-items: center;
                img{
                    width: 20px;
                    margin-bottom: 5px;
                }
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
        .bottom-btn{
            width: 100%; 
            position: fixed;
            bottom: 50px;
            left: 0;
            border-top: 1px solid #dbdbdb;
            .right{
                .btn{
                    width: 100%;
                    height: 50px;
                    background-color: #60a609;
                    color: #fff;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .center{
                padding-right: 10px;
                span:nth-child(1){
                    color: #999999;
                }
                span:nth-child(2){
                    font-size: 16px;
                    color: #f11010;
                }
            }
        }
    }
    .ticket-pop{
        background-color: #fff !important;
        .weui-cells{
            font-size: 14px;
            .vux-label{
                font-size: 16px;
                color: #f11010;
            }
            .weui-btn_plain-primary{
                color: #60a609;
                border-color: #60a609;
            }
        }
    }    
</style>
