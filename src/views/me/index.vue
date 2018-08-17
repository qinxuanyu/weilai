<template>
    <div class="me">
        <div class="top">
            <div class="avatar">
                <img src="src/assets/images/com_goodreputation@2x.png" alt="">
            </div>
            <p>用户名：123</p>
            <div class="message">
                <div class="icon">
                    <div>
                        <img src="src/assets/images/me_news@2x.png" alt="">
                    </div>
                    <div>
                        <img src="src/assets/images/me_service@2x.png" alt="">
                    </div>
                </div>
                <div class="bg-img"></div>
            </div>
        </div>
        <div class="tab">
            <group>
                <cell title="我的订单" value="查看全部订单" is-link></cell>
            </group>
           <tabbar>
                <tabbar-item  link="/store/list/1">
                    <img slot="icon" src="src/assets/images/me_wait_payment@2x.png" />
                    <span slot="label">待付款</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/2">
                    <img slot="icon" src="src/assets/images/me_wait_send@2x.png" />
                    <span slot="label">待发货</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/3">
                    <img slot="icon" src="src/assets/images/me_wait_receiving@2x.png" />
                    <span slot="label">待收货</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/store/list/4">
                    <img slot="icon" src="src/assets/images/me_wait_evaluate@2x.png" />
                    <span slot="label">待评价</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/store/list/4">
                    <img slot="icon" src="src/assets/images/me_after_sale@2x.png" />
                    <span slot="label">售后处理</span>
                </tabbar-item>
            </tabbar>
           
        </div>
         <group>
            <cell :title="item.title" is-link v-for="(item,index) in linkItem" :key="index">
                <img slot="icon" width="20" style="display:block;margin-right:20px;" :src="item.imgUrl">
            </cell>
        </group>
    </div>
</template>
<script>
    import { Cell, Group, Tabbar, TabbarItem } from 'vux';
    export default{
        data (){
            return {
                linkItem:[{
                    title:'种植果园',
                    imgUrl:'src/assets/images/me_plant@2x.png'
                },{
                    title:'果实售卖',
                    imgUrl:'src/assets/images/me_fruit_sell@2x.png'
                },{
                    title:'我的钱包',
                    imgUrl:'src/assets/images/me_wallet@2x.png'
                },{
                    title:'优惠券',
                    imgUrl:'src/assets/images/me_discount@2x.png'
                },{
                    title:'积分',
                    imgUrl:'src/assets/images/me_integral@2x.png'
                },{
                    title:'系统设置',
                    imgUrl:'src/assets/images/me_set@2x.png'
                },{
                    title:'邀请朋友',
                    imgUrl:'src/assets/images/me_invitation@2x.png'
                }]
            }
        },
        components:{
            Cell, Group, Tabbar, TabbarItem
        }
    }
</script>
<style lang="less" >
    .me{
        .top{
            text-align: center;
            padding-bottom: 15px;
            position: relative;
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
                top: 0px;
                right: 10px; 
                .icon{
                    display: flex;
                    justify-content: flex-end;
                    img{
                        width: 20px;
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
        }
    }
</style>
