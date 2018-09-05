<template>
    <div class="detail">
        <swiper :aspect-ratio="300/800" dots-position="center">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in detailData.images" :key="index">
                <img :src="item">
            </swiper-item>
        </swiper>
        <div class="main">
            <p class="name">{{ detailData.name }}</p>
            <p class="price">{{!isIntegral ? '￥' : '积分：'}}{{ detailData.price }} 
                <!-- <span>￥100</span> -->
            </p> 
            <flexbox :gutter="0" class="site">
                <flexbox-item><div class="flex-demo">快递：000</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:center">月销{{detailData.mouthSale}}笔</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:right">{{ detailData.area }}</div></flexbox-item>
            </flexbox>
            <group>
                <cell title="领券"  is-link @click.native.stop="ticket_show = !ticket_show" v-if="!isIntegral"></cell>
                <cell title="规格参数"  is-link @click.native.stop="size_show = !size_show"></cell>
                <cell title="商品评价"  is-link v-if="!isIntegral"></cell>
                <div class="evaluate" v-if="detailData.evaluates.length">
                    <div class="user">
                        <div class="avatar">
                            <img :src="detailData.evaluates[0].imageUrl" alt="">
                        </div>
                        <span>{{detailData.evaluates[0].nickname}}</span>
                    </div>
                    <div class="content">{{detailData.evaluates[0].content}}</div>
                    <div class="time">
                        <span>{{detailData.evaluates[0].createTime}}</span>
                        <!-- <span>规格：标准（100g）</span> -->
                    </div>
                </div>
            </group>
        </div>
        <divider>商品详情</divider>
        <div class="node" v-html="detailData.detail"></div>
        <div class="bottom-btn">
            <div class="service">
                <router-link to="/me/service">
                    <img src="src/assets/images/mer_service@2x.png" alt="">
                    <p>客服</p>
                </router-link>
            </div>
            <div class="add" @click.stop="cart_show = !cart_show;manner = 0" v-if="!isIntegral">加入购物车</div>
            <div class="buy" @click.stop="cart_show = !cart_show;manner = 1" v-if="!isIntegral">立即购买</div>
            <div class="buy" style="flex:1" @click.stop="$router.push({name:'order',params:{id:goodsId},query:{num:goodsNum,type:'integral'}})" v-if="isIntegral">立即兑换</div>
        </div>
        <div class="pop">
            <div v-transfer-dom class="ticket-pop">
                <popup v-model="ticket_show" >
                    <group v-for="(item,index) in detailData.tickets" :key="index">
                         <cell :title="item.price + '元'"  :inline-desc="'满'+item.suitPrice+'元减'+item.price+'元'">
                             <x-button  mini plain type="primary" @click.native.stop="getTicketFun(item.id)">领取</x-button>
                         </cell>
                    </group>
                </popup>
            </div>
            <div v-transfer-dom class="size-pop">
                <popup v-model="size_show" >
                    <ul class="message">
                        <li class="">
                            <span>品名</span>
                            <span>车厘子、大樱桃</span>
                        </li>
                        <li class="">
                            <span>山东</span>
                            <span>1000g</span>
                        </li>
                        <li class="">
                            <span>储存方式</span>
                            <span>冷藏</span>
                        </li>
                        <li class="">
                            <span>保质期</span>
                            <span>7天</span>
                        </li>
                    </ul>
                    <x-button type="primary" @click.native.stop="size_show = !size_show">确定</x-button>
                </popup>
            </div>
            <div v-transfer-dom class="cart-pop">
                <popup v-model="cart_show" >
                     <div class="goods">
                        <div class="left">
                            <img :src="detailData.images[0]" alt="">
                        </div>
                        <div class="right">
                            <p>{{detailData.name}}</p>
                            <p>规格：1000g</p>
                            <div>
                                <group>
                                    <x-number :title="'￥'+detailData.price" v-model="goodsNum" :min="1" width="30px" @on-change="changeGoodsNum"  ></x-number>
                                </group>
                            </div>
                        </div>
                       
                    </div>
                    <x-button @click.native.stop="addCartFun">确定</x-button>
                </popup>
               
            </div>
        </div>
    </div>

</template>
<script>
    import { Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, Group, Divider, Popup, TransferDom, XButton, XNumber  } from 'vux'
    import api from '@/api'
    export default{
        data(){
            return{
                ticket_show:false,
                size_show:false,
                cart_show:false,
                goodsId:null,
                detailData:{},
                goodsNum:1,
                manner:null,                 //0-加入购物车 1-立即购买
                isIntegral:null               //是否是积分商城
            }
        },
        directives: {
            TransferDom
        },
        components:{
            Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, Group, Divider, Popup, XButton, XNumber
        },
        methods:{
            getDetailData (){
                let _this = this;
                api.goodsDetail({
                    id:_this.goodsId
                }).then(data => {
                    _this.detailData = data;
                }).catch(e =>{})
            },
            addCartFun (){
                let _this = this;
                if(this.manner === 0){
                    api.addCart({
                        goodsId:_this.goodsId,
                        num:_this.goodsNum
                    }).then(data =>{
                        _this.showTips('添加成功')
                        _this.$router.push('/store/cart')
                    }).catch(e =>{})
                }else if(this.manner === 1){
                    this.$router.push({
                        name:'order',
                        params:{
                            id:this.goodsId
                        },
                        query:{
                            num:this.goodsNum
                        }
                    })
                }
                
            },
            changeGoodsNum (){

            },
            getTicketFun (id){
                let _this = this;
                api.getTicket({
                    ticketId:id
                }).then(data =>{
                    _this.showTips('领取成功')
                }).catch(e =>{})
            },
            // submitPointFun (){
            //     api.submitPoint({}).then(data =>{
            //         addressId:
            //     }).catch(e =>{})
            // }
        },
        created() {
            let id = this.$route.params.id;
            let isIntegral = this.$route.query.type;
            if(isIntegral){
                this.isIntegral = isIntegral;
            }
            this.goodsId = id;
            this.getDetailData()
        },
    }
</script>
<style lang="less" >
    .detail{
        padding-bottom: 51px;
        .main{
            padding: 13px;
            .name{
                font-size: 16px;
            }
            .price{
                font-size: 20px;
                color: #f11010;
                margin: 15px 0 18px 0;
                span{
                    color: #999999;
                    text-decoration: line-through;
                    font-size: 14px;
                }
            }
            .site{
                // text-align: center;
                color: #8f8f8f;
            }
            .evaluate{
                font-size: 14px;
                .user{
                    display: flex;
                    .avatar{
                        width: 27px;
                        height: 27px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 8px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    >span{
                        color: #8f8f8f;
                    }
                }
                .content{
                    margin-top: 10px;
                    margin-bottom: 15px;
                }
                .time{
                    color: #8f8f8f;
                    margin-bottom: 12px;
                    
                }
            }
        }
        .bottom-btn{
            position: fixed;
            bottom: 0;
            left: 0;
            display: flex;
            width: 100%;
            background-color: #fff;
            border-top: 1px solid #dbdbdb;
            align-items: center;
            .service{
                flex: 1;
                a{
                   display: flex;
                   flex-direction: column;
                   width: 80px;
                   text-align: center;
                    img{
                        width: 22px;
                        margin: 0 auto;
                    }
                    p{
                        line-height: 1;
                        margin-top: 5px;
                    }
                }
               
            }
            .add{
                width: 110px;
                height: 50px;
                background-color: #84ba42;
                color: #fff;
                line-height: 50px;
                text-align: center;
            }
            .buy{
                width: 110px;
                height: 50px;
                background-color: #60a609;
                color: #fff;
                line-height: 50px;
                text-align: center;
            }
        }
        .weui-cell{
            padding-left: 0;
            padding-right: 0;
            font-size: 14px;
            
        }
       
        .weui-cell::before{
            left: 0;
        }
        .vux-divider{
            padding-left: 50px;
            padding-right: 50px;
            background-color: #f3f3f3;
            color: #60a609;
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
    .size-pop{
        
        .message{
            background-color: #fff;
            line-height: 50px;
            padding-left: 15px;
            border-radius: 8px 8px 0 0;
            >li{
                display: flex;
                span:nth-child(1){
                    flex: 1;
                }
                span:nth-child(2){
                    flex: 2;
                }
            }
        }
        .weui-btn_primary{
            // width: 80%;
            background-color: #60a609;
        }
    }
    .cart-pop{
       
        .goods{
            background-color: #fff;
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
    }
</style>
