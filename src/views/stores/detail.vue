<template>
    <div class="detail">
        <swiper :aspect-ratio="300/800" dots-position="center">
            <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index">
                <img :src="item">
            </swiper-item>
        </swiper>
        <div class="main">
            <p class="name">【第二件立减20元】新鲜采摘  顺丰空运  益众林场车厘子大樱桃1kg包邮  礼盒装</p>
            <p class="price">￥54 <span>￥100</span></p> 
            <flexbox :gutter="0" class="site">
                <flexbox-item><div class="flex-demo">快递：000</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:center">月销221笔</div></flexbox-item>
                <flexbox-item><div class="flex-demo" style="text-align:right">山东</div></flexbox-item>
            </flexbox>
            <group>
                <cell title="领券"  is-link @click.native.stop="ticket_show = !ticket_show"></cell>
                <cell title="规格参数"  is-link @click.native.stop="size_show = !size_show"></cell>
                <cell title="商品评价"  is-link></cell>
                <div class="evaluate">
                    <div class="user">
                        <div class="avatar">
                            <img src="http://img5.imgtn.bdimg.com/it/u=4101850099,151997626&fm=27&gp=0.jpg" alt="">
                        </div>
                        <span>123456</span>
                    </div>
                    <div class="content">车厘子很新鲜，很甜。是在做活动的时候买的很划算，以后还会回购。</div>
                    <div class="time">
                        <span>2018-10-10</span>
                        <span>规格：标准（100g）</span>
                    </div>
                </div>
            </group>
        </div>
        <divider>商品详情</divider>
        <div class="node"></div>
        <div class="bottom-btn">
            <div class="service">
                <router-link to="">
                    <img src="src/assets/images/mer_service@2x.png" alt="">
                    <p>客服</p>
                </router-link>
            </div>
            <div class="add">加入购物车</div>
            <div class="buy">立即购买</div>
        </div>
        <div class="pop">
            <div v-transfer-dom class="ticket-pop">
                <popup v-model="ticket_show" @on-hide="log('hide')" @on-show="log('show')">
                    <group>
                         <cell title="80元"  inline-desc="满99元减10元">
                             <x-button  mini plain type="primary">领取</x-button>
                         </cell>
                    </group>
                </popup>
            </div>
            <div v-transfer-dom class="size-pop">
                <popup v-model="size_show" @on-hide="log('hide')" @on-show="log('show')">
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
        </div>
    </div>

</template>
<script>
    import { Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, Group, Divider, Popup, TransferDom, XButton  } from 'vux'
    export default{
        data(){
            return{
                demo04_list:[
                    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
                    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
                    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
                ],
                ticket_show:false,
                size_show:false
            }
        },
        directives: {
            TransferDom
        },
        components:{
            Swiper, SwiperItem, Flexbox, FlexboxItem, Cell, Group, Divider, Popup, XButton
        }
    }
</script>
<style lang="less" >
    .detail{
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
        .weui-cells{
            font-size: 14px;
            background: #fff;
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
</style>
