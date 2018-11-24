<template>
    <div id="bottom-tab" :style="{'background-color':bgColor,'color':textColor}">
         <tabbar>
            <tabbar-item :selected="$route.path === '/'" link="/">
                <img slot="icon" src="src/assets/images//tab/home@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab/home_s@2x.png" />
                <span slot="label">首页</span>
            </tabbar-item>
            <tabbar-item :selected="$route.path === '/qr-code'" link="/qr-code">
                <img slot="icon" src="src/assets/images/tab/generalize@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab/generalize_s@2x.png" />
                <span slot="label">我的推广</span>
            </tabbar-item>
            <tabbar-item  link="/goods">
                <img slot="icon" src="src/assets/images/tab/member@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab/member_s@2x.png" />
                <span slot="label">PLUS会员</span>
            </tabbar-item>
            <tabbar-item ref="meTabbar" :selected="$route.path === '/my'" link="/my">
                <img slot="icon" src="src/assets/images/tab/me@2x.png" />
                <img slot="icon-active" src="src/assets/images/tab/me_s@2x.png" />
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
