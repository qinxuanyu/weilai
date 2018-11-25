<template>
    <div class="goods">
        <div class="main">
            <img src="/src/assets/images/goods_top.jpg" alt="">
            <div class="text">
                <p class="name">会员</p>
                <div class="num">
                    <p class="price">￥69.00 <span>169.00</span></p>
                    <p class="volume">销量：{{goodsData.num }}件</p>
                </div>
            </div>
        </div>
        <div class="load-wrap">
            <load-more class="load-more" :show-loading="false" :tip="'商品详情'" background-color="#fbf9fe"></load-more>
        </div>
        <div class="node">
            <img src="/src/assets/images/goods.jpg" alt="">
        </div>
        <div class="bottom-btn">
            <div class="link" @click.stop="$router.push('/')">
                <img src="/src/assets/images/tab/home_s@2x.png" alt="">
                <p>首页</p>
            </div>
            <div class="link" @click.stop="$router.push('/service')">
                <img src="/src/assets/images/my/par_service@2x.png" alt="">
                <p>客服</p>
            </div>
            <button @click.stop="show3 = true">立即购买</button>
        </div>
        <popup v-model="show3">
            <div class="popup2">
                <div class="p-main">
                    <div class="img-box">
                        <img src="/src/assets/images/goods_top.jpg" alt="">
                    </div>
                    <div class="text">
                        <p class="price">￥69.00</p>
                        <p class="num">销量：{{goodsData.num }}</p>
                    </div>
                    <img @click.stop="show3 = false" class="off-btn" src="/src/assets/images/my/par_close.png" alt="">
                </div>
                <div class="bottom-text">
                    <span>购买数量</span>
                    <span>1</span>
                </div>
                <button @click.stop="linkOrder">立即购买</button>
            </div>
        </popup>
    </div>
</template>
<script>
    import { LoadMore, TransferDom, Popup } from 'vux'
    import tool from '@/utils/tool'
    import api from '@/api'
    export default {
        data (){
           return{
                show3:false,
                goodsData:{}
           }
        },
        components: {
            LoadMore, Popup
        },
        directives: {
            TransferDom
        },
        methods:{
            linkOrder(){
                let payOpenId = tool.local.get('payOpenId');
                if(payOpenId){
                    this.$router.push('/order')
                }else{
                    window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa1196363d9c1168&redirect_uri=http%3a%2f%2fyoh.tongyanbaby.cn%2f%23%2fgoods&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
                }
                
            },
            getGoodsDetailFun (){
                let _this = this;
                api.getGoodsDetail({
                    id:1
                }).then(data =>{
                    if(data){
                        _this.goodsData = data;
                    }
                }).catch(e =>{})
            }
        },
        created() {
            let code = tool.utils.getUrlParam('code');
            let payOpenId = tool.local.get('payOpenId');
            // tool.local.clear('payOpenId')
            this.getGoodsDetailFun()
            if(code && !payOpenId){
                api.moLogin({
                    code:code,
                }).then(data =>{
                    if(data){
                        tool.local.set('payOpenId',data)
                    }
                }).catch(e =>{})
            }
            if(!code &&  !payOpenId){
                window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfa1196363d9c1168&redirect_uri=http%3a%2f%2fyoh.tongyanbaby.cn%2f%23%2fgoods&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect"
            }
            
         
            
        },
    }
</script>
<style lang="less" scoped>
    .goods{
        .main{
            img{
                display: block;
                width: 100%;
            }
            .text{
                font-size: 16px;
                padding: 15px;
                background-color: #fff;
                .name{
                    font-size: 18px;
                    
                }
                .num{
                    display: flex;
                    justify-content: space-between;
                    margin-top: 10px;
                    align-items: center;
                    .price{
                        font-size: 20px;
                        color: #f22222;
                        span{
                            color: #999;
                            text-decoration:line-through;
                            font-size: 14px;
                        }
                    }
                    .volume{
                        color: #999;
                    }
                }
            }
        }
        .load-wrap{
            background-color: #efefef;
            padding-top: 20px;
            .load-more{
                margin: 5px auto;
            }
        }
       
        .node{
            img{
                display: block;
                width: 100%;
            }
        }
        .bottom-btn{
            width: 100%;
            height: 50px;
            display: flex;
            position: fixed;
            bottom: 0;
            left: 0;
            background-color: #fff;
            .link{
                width: 70px;
                text-align: center;
                img{
                    display: block;
                    margin: 0 auto;
                    margin-top: 5px;
                    width: 24px;
                    height: 24px;
                }
            }
            button{
                flex: 1;
                height: 100%;
                color: #fff;
                line-height: 50px;
                background-color: #e95701;
                border: 0;
            }
        }
        .vux-popup-dialog{
            overflow-y: initial;
        }
        .popup2{
            height: 278px;
            .p-main{
                height: 100px;
                padding: 20px 12px 0 20px;
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #f3f3f3;
                .img-box{
                    width: 120px;
                    position: relative;
                    img{
                        width: 100%;
                        left: 0;
                        top: -50px;
                        position: absolute;
                    }
                }
                .off-btn{
                    width: 20px;
                    height: 20px;
                }
                .text{
                    flex: 1;
                    padding-left: 10px;
                    line-height: 1;
                    .price{
                        color: #f22222;
                        font-size: 20px;
                    }
                    .num{
                        margin-top: 24px;
                        color: #888888;
                        font-size: 14rpx;
                    }
                }
            }
            .bottom-text{
                padding: 20px;
                display: flex;
                justify-content: space-between;

            }
            >button{
                display: block;
                width: 90%;
                height: 40px;
                margin: 65px auto 0 auto;
                border:0;
                background-color: #e95701;
                color: #fff;
            }
        }
    }
</style>
