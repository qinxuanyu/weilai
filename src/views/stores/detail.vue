<template>
    <div class="detail">
        <swiper :aspect-ratio="616/750" dots-position="center">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in detailData.images" :key="index">
                <img :src="item.replace('[','').replace(']','')">
            </swiper-item>
        </swiper>
        <div class="main">
            <p class="name">{{ detailData.name }}</p>
            <div class="price-wrap">
                <div class="price">
                    {{!isIntegral ? '￥' : '积分：'}}{{ detailData.price }} 
                    <span v-if="detailData.discount !== 1 && type == 6">￥{{ (detailData.price / detailData.discount).toFixed(2)}}</span>
                </div>
                <div class="title text-center" v-if="type == 6" style="width:100px;">
                    <span>限时促销中</span>
                </div>
                <div class="timer text-right" v-if="type == 6">{{remainingTime}}</div>
            </div> 
            <flexbox :gutter="0" class="site">
                <flexbox-item v-if="type == 5"><div class="flex-demo">维护费：{{detailData.priceDesc}}</div></flexbox-item>
                <flexbox-item v-if="type == 4"><div class="flex-demo">快递:￥0</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:center" v-if="detailData.mouthSale">已售{{detailData.mouthSale}}笔</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:right">{{ detailData.area }}</div></flexbox-item>
            </flexbox>
            <group>
                <cell  title="领券"  is-link @click.native.stop="ticket_show = !ticket_show" v-if="!isIntegral && type != 2 && type != 5 && isPlatformGoods == 1"></cell>
                <cell title="规格参数"  is-link @click.native.stop="size_show = !size_show"></cell>
                <cell title="商品评价"  is-link v-if="!isIntegral && type != 5 && type != 2 && isPlatformGoods == 1" @click.native.stop="goEvaluateList" :value="!detailData.evaluates.length ? '暂无用户评价' : ''"></cell>
                <div class="evaluate" v-if="detailData.evaluates.length && !isIntegral && type != 5 && isPlatformGoods == 1" @click.stop="goEvaluateList">
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
            <div class="add" @click.stop="cart_show = !cart_show;manner = 0" v-if="!isIntegral && type == 4">加入购物车</div>
            <div class="buy" @click.stop="buyClick" v-if="!isIntegral" :class="{'forbid' : type == 6 && remainingTime === '折扣活动已结束'}">立即购买</div>
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
            <div v-transfer-dom class="size-pop" v-if="type == 5 || type == 2">
                <popup v-model="size_show" >
                    <ul class="message">
                        <li class="">
                            <span>品名</span>
                            <span>{{detailData.name}}</span>
                        </li>
                        <li class="">
                            <span>产地</span>
                            <span>{{detailData.area}}</span>
                        </li>
                        <li class="">
                            <span>幼苗期</span>
                            <span>{{detailData.firstTime}}</span>
                        </li>
                        <li class="">
                            <span>成长期</span>
                            <span>{{detailData.secondTime}}</span>
                        </li>
                          <li class="">
                            <span>挂果期</span>
                            <span>{{detailData.thirdTime}}</span>
                        </li>
                        <li class="">
                            <span>旺产期</span>
                            <span>{{detailData.fourthTime }}</span>
                        </li>
                        <li class="">
                            <span>特点</span>
                            <span>{{detailData.feature }}</span>
                        </li>
                    </ul>
                    <x-button type="primary" @click.native.stop="size_show = !size_show">确定</x-button>
                </popup>
            </div>
            <div v-transfer-dom class="size-pop" v-else>
                <popup v-model="size_show" >
                    <ul class="message">
                        <li class="">
                            <span>品名</span>
                            <span>{{detailData.name}}</span>
                        </li>
                        <li class="">
                            <span>产地</span>
                            <span>{{detailData.area}}</span>
                        </li>
                        <li class="">
                            <span>储存方式</span>
                            <span>{{detailData.store}}</span>
                        </li>
                        <li class="">
                            <span>保质期</span>
                            <span>{{detailData.keepDays}}天</span>
                        </li>
                    </ul>
                    <x-button type="primary" @click.native.stop="size_show = !size_show" >确定</x-button>
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
                            <p>规格：{{detailData.weight}}斤</p>
                            <div>
                                <group>
                                    <x-number :title="'￥'+detailData.price" v-model="goodsNum" :min="1" width="30px" @on-change="changeGoodsNum"  ></x-number>
                                </group>
                            </div>
                        </div>
                       
                    </div>
                    <x-button @click.native.stop="addCartFun" >确定</x-button>
                </popup>
               
            </div>
        </div>
    </div>

</template>
<script>
    import { Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, Group, Divider, Popup, TransferDom, XButton, XNumber  } from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data(){
            return{
                ticket_show:false,
                size_show:false,
                cart_show:false,
                goodsId:null,
                detailData:{
                    evaluates:[]
                },
                goodsNum:1,
                manner:null,                 //0-加入购物车 1-立即购买
                isIntegral:null,               //是否是积分商城
                type:null,                     //2.果树 4果子 5树苗 6-折扣
                remainingTime:'',
                isPlatformGoods:1
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
                     _this.detailData.price = parseFloat(_this.detailData.price).toFixed(2)
                    if(data.endTime && _this.type == 6){
                        _this.computedDate(data.endTime)
                    }
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
                            id:this.goodsId,
                            type:this.type
                        },
                        query:{
                            num:this.goodsNum
                        }
                    })
                }
                
            },
            changeGoodsNum (){

            },
            formatDuring: function(mss) {
                // var days = parseInt(mss / (1000 * 60 * 60 * 24));
                var hours = parseInt((mss ) / (1000 * 60 * 60));
                var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = (mss % (1000 * 60)) / 1000;
                return    + hours + " : " + minutes + " : " + seconds ;
            },
            timestampToTime(timestamp) {
                var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y+M+D+h+m+s;
            },
            computedDate (date){
               
                let _this = this;
                let interval = null;
                interval = setInterval(()=>{
                     let times = tool.utils.getUnixTime();
                     let _ms = tool.utils.dateDifference(date,this.timestampToTime(times))
                     if(_ms < 0 ){
                         _this.remainingTime = '折扣活动已结束';
                         clearInterval(interval)
                         return 
                     }
                    _this.remainingTime = this.formatDuring(_ms)
                },1000)
            },
            getTicketFun (id){
                let _this = this;
                api.getTicket({
                    ticketId:id
                }).then(data =>{
                    _this.showTips('领取成功')
                }).catch(e =>{
                     _this.showTips('已经领取过该优惠券')
                })
            },
            goEvaluateList (){
                if(this.detailData.evaluates.length){
                    this.$router.push('/store/evaluate/'+ this.goodsId)
                }
            },
            //立即购买按钮
            buyClick (){
                let isPlatformGoods = tool.local.get('isPlatformGoods'); //判断是否是平台商品还是植友商品 1-商城  2-植友
                if(this.type == 6 && this.remainingTime === '折扣活动已结束'){
                    return
                }
                if(isPlatformGoods == 2){
                    return  this.$router.push({
                        name:'order',
                        params:{
                            id:this.goodsId,
                            type:this.type
                        },
                        query:{
                            num:this.goodsNum
                        }
                    })
                }
                if(this.type == 5 || this.type == 2 || isPlatformGoods == 1){
                    this.$router.push({
                        name:'order',
                        params:{
                            id:this.goodsId,
                            type:this.type
                        },
                        query:{
                            num:this.goodsNum
                        }
                    })
                }else{
                    this.cart_show = !this.cart_show;this.manner = 1;
                }
            }
            // submitPointFun (){
            //     api.submitPoint({}).then(data =>{
            //         addressId:
            //     }).catch(e =>{})
            // }
        },
        created() {
            let id = this.$route.params.id;
            let type = this.$route.params.type;
            let isIntegral = this.$route.query.type;
            if(isIntegral){
                this.isIntegral = isIntegral;
            }
            this.isPlatformGoods = tool.local.get('isPlatformGoods');
            this.goodsId = id;
            this.type = type;
            this.getDetailData()
        },
    }
</script>
<style lang="less" >
    .detail{
        .swiper-demo-img{
            text-align: center;
            overflow: hidden;
            img{
                height: 100%;
            }
        }
        .main{
            padding: 13px;
            padding-bottom: 0;
            .name{
                font-size: 16px;
            }
            .price-wrap{
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 15px 0 18px 0;
                >div{
                    flex: auto;
                }
                .price{
                    font-size: 20px;
                    color: #f11010;
                    span{
                        color: #999999;
                        text-decoration: line-through;
                        font-size: 14px;
                    }
                }
                .title{
                    span{
                        color: #f11010;
                        border:1px solid #f11010;
                        padding: 3px;
                        border-radius: 3px;
                    }
                }
                .timer{
                    color: #f11010;
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
                flex: 1;
                width: 110px;
                height: 50px;
                background-color: #84ba42;
                color: #fff;
                line-height: 50px;
                text-align: center;
            }
            .buy{
                flex: 1;
                width: 110px;
                height: 50px;
                background-color: #60a609;
                color: #fff;
                line-height: 50px;
                text-align: center;
            }
            .buy.forbid{
                color: rgba(255, 255, 255, 0.6);
                background-color: #9ED99D;
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
        .node{
            padding-bottom: 51px;
            img{
                width: 100%;
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
            // .weui-btn_plain-primary{
            //     color: #60a609;
            //     border-color: #60a609;
            // }
        }
    }
    .size-pop{
        
        .message{
            background-color: #fff;
            // line-height: 50px;
            padding-left: 15px;
            border-radius: 8px 8px 0 0;
            vertical-align: middle;
            >li{
                padding: 14px 0;
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
