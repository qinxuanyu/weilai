<template>
    <div id="bottom-tab" :style="{'background-color':bgColor,'color':textColor}">
         <tabbar>
            <tabbar-item :selected="$route.path === '/'" link="/">
                <img slot="icon" src="" />
                <img slot="icon-active" src="" />
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="$route.path === '/trade/trade'" link="/store/index">
                <img slot="icon" src="" />
                <img slot="icon-active" src="" />
                <span slot="label">商城</span>
            </tabbar-item>
            <tabbar-item :selected="$route.path === '/asset/my'" >
                <img slot="icon" src="" />
                <img slot="icon-active" src="" />
                <span slot="label">购物车</span>
            </tabbar-item>
            <tabbar-item ref="meTabbar" :selected="$route.path === '/me'" >
                <img slot="icon" src="" />
                <img slot="icon-active" src="" />
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
<style lang="less" scoped>
    #bottom-tab{
        text-align: center;
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        >div{
            // width: 25%;
        }
        img{
            display: block
        }
    }
</style>
