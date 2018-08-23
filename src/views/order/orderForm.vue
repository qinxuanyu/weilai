<template>
    <div class="order-form">
        <tab custom-bar-width="34px" :line-width="2" class="tab">
            <tab-item selected @on-item-click="onItemClick">全部</tab-item>
            <tab-item @on-item-click="onItemClick">待付款</tab-item>
            <tab-item @on-item-click="onItemClick">待发货</tab-item>
            <tab-item @on-item-click="onItemClick">待收货</tab-item>
            <tab-item @on-item-click="onItemClick">待评价</tab-item>
        </tab>
        <scroller class="my-scroll">
            <ul class="list">
                <li>
                     <div class="img">
                        <img src="src/assets/images/ho_banner1@2x.png" alt="">
                    </div>
                    <div class="title">
                        <p class="status"><span>已发货</span>￥120x1</p>
                        <p>下按时打卡了而空间就能给你看看到你发是 是份</p>
                        <p class="size">规格：1000g</p>
                        <div class="btn">
                            <x-button mini plain class="one">查看物流</x-button>
                            <x-button mini plain class="two">立即兑换</x-button>
                        </div>
                    </div>
                </li>
                
            </ul>
        </scroller>
    </div>
</template>
<script>
    import { Tab, TabItem, XButton } from 'vux'
    export default{
        data (){
            return{
                
            }
        },
        components:{ Tab, TabItem, XButton },
        methods:{
            onItemClick (){

            }
        },mounted() {
            let window_h = window.innerHeight;
            let tab_h = document.querySelector('.tab').clientHeight;
            document.querySelector('.my-scroll').style.height = (window_h - tab_h) +'px';
            document.querySelector('.my-scroll').style.top = tab_h +'px';
            console.log(document.querySelector('._v-content'))
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
