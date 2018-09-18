<template>
    <div class="me">
        <div class="top">
            <div class="avatar" @click.stop="$router.push('/me/edit-data')">
                <img :src="myInfo.imageUrl" alt="">
            </div>
            <p>用户名：{{myInfo.name}}</p>
            <div class="message">
                <div class="icon">
                    <div @click.stop="$router.push('/me/message')">
                        <img src="src/assets/images/me_news@2x.png" alt="">
                    </div>
                    <div @click.stop="$router.push('/me/service')">
                        <img src="src/assets/images/me_service@2x.png" alt="">
                    </div>
                </div>
                <div class="bg-img"></div>
            </div>
        </div>
        <div class="tab">
            <group>
                <cell title="我的订单" value="查看全部订单" is-link link="/order/order-inform/0"></cell>
            </group>
           <tabbar>
                <tabbar-item  link="/order/order-inform/1">
                    <img slot="icon" src="src/assets/images/me_wait_payment@2x.png" />
                    <span slot="label">待付款</span>
                </tabbar-item>
                <tabbar-item  link="/order/order-inform/2">
                    <img slot="icon" src="src/assets/images/me_wait_send@2x.png" />
                    <span slot="label">待发货</span>
                </tabbar-item>
                <tabbar-item  link="/order/order-inform/3">
                    <img slot="icon" src="src/assets/images/me_wait_receiving@2x.png" />
                    <span slot="label">待收货</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/order/order-inform/4">
                    <img slot="icon" src="src/assets/images/me_wait_evaluate@2x.png" />
                    <span slot="label">待评价</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/order/completed-order">
                    <img slot="icon" src="src/assets/images/me_after_sale@2x.png" />
                    <span slot="label">售后处理</span>
                </tabbar-item>
            </tabbar>
           
        </div>
         <group class="cell">
            <cell :title="item.title" is-link v-for="(item,index) in linkItem" :key="index" :link="item.link" @click.native.stop="invite(item.link)">
                <img slot="icon" width="20" height="23px" style="display:block;margin-right:20px;" :src="item.imgUrl" >
            </cell>
        </group>
    </div>
</template>
<script>
    import { Cell, Group, Tabbar, TabbarItem } from 'vux';
    import api from '@/api'
    export default{
        data (){
            return {
                linkItem:[{
                    title:'种植果园',
                    imgUrl:'src/assets/images/me_plant@2x.png',
                    link:'/me/fruiter'
                },{
                    title:'果实售卖',
                    imgUrl:'src/assets/images/me_fruit_sell@2x.png',
                    link:'/me/my-harvest'
                },{
                    title:'我的钱包',
                    imgUrl:'src/assets/images/me_wallet@2x.png',
                    link:'/me/my-wallet'
                },{
                    title:'优惠券',
                    imgUrl:'src/assets/images/me_discount@2x.png',
                    link:'/me/coupon'
                },{
                    title:'积分',
                    imgUrl:'src/assets/images/me_integral@2x.png',
                    link:'/me/integral'
                },{
                    title:'系统设置',
                    imgUrl:'src/assets/images/me_set@2x.png',
                    link:'/setup'
                },{
                    title:'邀请朋友',
                    imgUrl:'src/assets/images/me_invitation@2x.png',
                    link:''
                }],
                myInfo:{}
            }
        },
        components:{
            Cell, Group, Tabbar, TabbarItem
        },
        methods:{
            getMyInfo (){
                let _this = this;
                api.getInfo().then(data =>{
                    _this.myInfo = data;
                }).catch(e =>{})
            },
            invite(link){
                if(!link){
                    this.$vux.confirm.show({
                        // 组件除show外的属性
                        title:'提示',
                        content:'点击右上角可分享给朋友',
                        onCancel () {
                        },
                        onConfirm () {}
                    })
                }
            }
        },
        created() {
            this.getMyInfo()
        },
    }
</script>
<style lang="less" >
    .me{
        padding-bottom:51px;
        min-height: 100vh;
        background-color: #f3f3f3;

        .top{
            text-align: center;
            padding-bottom: 15px;
            position: relative;
            background-color: #fff;
            overflow: hidden;
            .avatar{
                width: 66px;
                height: 66px;
                border-radius: 50%;
                margin: 40px auto 5px auto;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .message{
                width: 95px;
                position: absolute;
                top: 45px;
                right: 10px; 
                .icon{
                    display: flex;
                    justify-content: flex-end;
                    img{
                        height: 20px;
                    }
                    >div:nth-child(1){
                        margin-right: 13px;
                    }
                }
                .bg-img{
                    width: 100%;
                    height: 42px;
                    margin-top: 28px;
                    background: url(/src/assets/images/me_background@2x.png);
                    background-repeat: no-repeat;
                    background-size: 100%;
                }

            }
            
        }
        .tab{
            background-color: #f3f3f3;
            padding: 10px 0;
           
           .weui-tabbar{
                position: initial;
                background-color: #fff;
           }
           .weui-cells{
               margin-top: 0;
           }
           .weui-tabbar__icon{
               img{width: auto}
           }
           .weui-tabbar__icon{
                width: 22px;
                height: 22px;
            }
        }
        .cell{
             .weui-cell{
                background-color: #fff;
                padding: 12px 15px !important;
            }
            .weui-cells{
                margin-top: 0;
            }
        }
    }
</style>
