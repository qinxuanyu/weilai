<template>
    <div id="bottom-tab" :style="{'background-color':bgColor,'color':textColor}">
         <tabbar>
            <tabbar-item :selected="$route.path === '/'" link="/">
                <img slot="icon" src="src/assets/images/tab_home@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab_home_s@2x.png" />
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="$route.path === '/store/index'" link="/store/index">
                <img slot="icon" src="src/assets/images/tab_mall@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab_mall_s@2x.png" />
                <span slot="label">商城</span>
            </tabbar-item>
            <tabbar-item :selected="$route.path === '/store/cart'" link="/store/cart">
                <img slot="icon" src="src/assets/images/tab_shoppingcart@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab_shoppingcart_s@2x.png" />
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item ref="meTabbar" :selected="$route.path === '/me'" link="/me">
                <img slot="icon" src="src/assets/images/tab_me@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab_me_s@2x.png" />
                <span slot="label">我的</span>
            </tabbar-item>
        </tabbar>
    </div>
</template>
<script>
    import {Tabbar, TabbarItem} from 'vux';
    export default{
        name:"bottomTab",
        props:['bgColor','textColor'],
        components:{Tabbar, TabbarItem},
        data (){
            return {

            }
        },
       created() {
           
       },
    }
</script>
<style lang="less">
    #bottom-tab{
        text-align: center;
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        .weui-tabbar{
            background-color: #fff;

        }
        >div{
            // width: 25%;
           
        }
        .weui-tabbar__icon{
            width: 24px;
            height: 24px;
        }
        img{
            display: block;
            
        }
    }
</style>
