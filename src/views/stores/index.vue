<template>
    <div class="store">
        <search  placeholder="输入你想搜索的商品" @search-bg-color="'#f3f3f3'" @on-focus="$router.push('/store/search')"></search>
        <div class="swiper">
            <swiper :aspect-ratio="330/750" dots-position="center">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in banner_list" :key="index" >
                    <img :src="item.imageUrl">
                </swiper-item>
            </swiper>
        </div>
        <div class="tab">
            <tabbar>
                <tabbar-item  link="/store/list/1">
                    <img slot="icon" src="src/assets/images/ho_sapling@2x.png" />
                    <span slot="label">树苗</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/2">
                    <img slot="icon" src="src/assets/images/ho_fruiter@2x.png" />
                    <span slot="label">果树</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/3">
                    <img slot="icon" src="src/assets/images/ho_fruits@2x.png" />
                    <span slot="label">水果</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/store/list/4">
                    <img slot="icon" src="src/assets/images/ho_integral@2x.png" />
                    <span slot="label">积分</span>
                </tabbar-item>
            </tabbar>
        </div>
        <div class="advertising">
            <router-link to="" class="connect">
                <img src="src/assets/images/ho_advertising@2x.png"  alt="">
            </router-link>
            <div class="big-img" @click.stop="$router.push('/store/discount')">
                <img :src="discount_img" alt="">
            </div>
        </div>
    </div>
</template>
<script>
    import { Search,  Swiper, SwiperItem, Tabbar, TabbarItem } from 'vux';
    import api from '@/api';
    export default{
        name:'store',
        data (){
            return {
                banner_list:[
                   
                ],
                discount_img:''
            }
        },
        components:{
            Search, Swiper, SwiperItem, Tabbar, TabbarItem
        },
        methods:{
            getHomeData (){
                let _this = this;
                api.homeData().then(data =>{
                    _this.banner_list = data.images;
                    _this.discount_img = data.discount;
                })
            }
        },
        created() {
            this.getHomeData()
        },
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
                 width: 100%;
                display: block;
                padding: 8px 0;
                background-color: #f3f3f3;
               
                img{
                    // height: 80px;
                    width: 80%;
                }
            }
            .big-img{
                padding: 0 5px;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
