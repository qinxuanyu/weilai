<template>
    <div class="store">
        <search  placeholder="输入你想搜索的商品" @search-bg-color="'#f3f3f3'" @on-focus="$router.push('/store/search')"></search>
        <div class="swiper">
            <swiper :aspect-ratio="330/750" dots-position="center">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index" >
                    <img :src="item">
                </swiper-item>
            </swiper>
        </div>
        <div class="tab">
            <tabbar>
                <tabbar-item :selected="$route.path === '/'" link="/">
                    <img slot="icon" src="" />
                    <span slot="label">树苗</span>
                </tabbar-item>
                <tabbar-item :selected="$route.path === '/trade/trade'" link="/store/index">
                    <img slot="icon" src="" />
                    <span slot="label">果树</span>
                </tabbar-item>
                <tabbar-item :selected="$route.path === '/asset/my'" >
                    <img slot="icon" src="" />
                    <span slot="label">水果</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" :selected="$route.path === '/me'" >
                    <img slot="icon" src="" />
                    <span slot="label">积分</span>
                </tabbar-item>
            </tabbar>
        </div>
        <div class="advertising">
            <router-link to="" class="connect">
                <img src=""  alt="">
            </router-link>
            <div class="big-img">
                <img src="" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import { Search,  Swiper, SwiperItem, Tabbar, TabbarItem } from 'vux';
    export default{
        name:'store',
        data (){
            return {
                demo04_list:[
                    'http://placeholder.qiniudn.com/800x300/FF3B3B/ffffff',
                    'http://placeholder.qiniudn.com/800x300/FFEF7D/ffffff',
                    'http://placeholder.qiniudn.com/800x300/8AEEB1/ffffff'
                ]
            }
        },
        components:{
            Search, Swiper, SwiperItem, Tabbar, TabbarItem
        }
    }
</script>
<style lang="less" scoped>
    .store{
        background-color: #fff;
        .tab{
            padding: 20px 0;
            .weui-tabbar{
                position: initial;
                background-color: #fff;
            }
        }
        .advertising{
            text-align: center;
            .connect{
                padding: 15px 0;
                background-color: #f3f3f3;
                img{
                    height: 80px;
                }
            }
            .big-img{
                padding: 0 10px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
