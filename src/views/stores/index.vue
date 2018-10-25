<template>
    <div class="store">
        <search  placeholder="输入你想搜索的商品" @search-bg-color="'#f3f3f3'" @on-focus="$router.push('/store/search')"></search>
        <div class="swiper">
            <swiper :aspect-ratio="375/750" dots-position="center" :auto="true">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in banner_list" :key="index" @click.native.stop="swiperLink(item)">
                    <img :src="item.imageUrl">
                </swiper-item>
            </swiper>
        </div>
        <div class="tab">
            <tabbar>
                <tabbar-item  link="/store/list/5">
                    <img slot="icon" src="src/assets/images/ho_sapling@2x.png" />
                    <span slot="label">树苗</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/2">
                    <img slot="icon" src="src/assets/images/ho_fruiter@2x.png" />
                    <span slot="label">果树</span>
                </tabbar-item>
                <tabbar-item  link="/store/list/4">
                    <img slot="icon" src="src/assets/images/ho_fruits@2x.png" />
                    <span slot="label">水果</span>
                </tabbar-item>
                <tabbar-item ref="meTabbar" link="/me/integral">
                    <img slot="icon" src="src/assets/images/ho_integral@2x.png" />
                    <span slot="label">积分</span>
                </tabbar-item>
            </tabbar>
        </div>
        <div class="horse">
            <swiper auto  direction="vertical" height="30px" :interval='5000' class="text-scroll" :show-dots="false">
                <swiper-item v-for="(item,index) in noticeList" :key="index">
                    <p class="text"><img width="30px" src="src/assets/images/zlogo.png" alt=""><span>{{item.notice}}</span></p>
                </swiper-item>
                
            </swiper>
        </div>
        <div class="advertising">
            <router-link to="/me/service" class="connect">
                <img src="src/assets/images/ho_advertising@2x.png"  alt="">
            </router-link>
            <div class="big-img" @click.stop="$router.push('/store/discount')">
                <img :src="discount_img" alt="">
            </div>
            <div class="big-img" @click.stop="$router.push('/store/list/5')">
                <img src="src/assets/images/store_img_link.png" alt="">
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
                discount_img:'',
                noticeList:[]
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
            },
            swiperLink (data){
                this.$router.push('/store/list/'+ data.type)
            },
            getNoticeFun (){
                let _this = this;
                api.getNotice().then(data =>{
                    _this.noticeList = data;
                }).catch(e =>{})
            }
        },
        created() {
            this.getHomeData();
            this.getNoticeFun()
        },
    }
</script>
<style lang="less">
    .store{
        background-color: #fff;
        padding-bottom: 50px;
        .swiper{
            text-align: center;
            img{
                height: 100%;
            }
        }
        .tab{
            padding: 12px 0;
            .weui-tabbar{
                position: initial;
                background-color: #fff;
            }
            .weui-tabbar__icon{
                width: 44px;
                height: 44px;
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
        .horse{
            padding: 0 10px;
            // margin-top: 10px;
            border-top:1px solid #f6f6f6;
            .vux-swiper-item{
                position: relative;
                p{
                    // position: absolute;
                    // display: block;
                    // height: auto;;
                    // left: 0;
                    // top: 0;
                    // right: 0;
                    // bottom: 0;
                    // margin: auto;
                    
                    display: flex;
                    align-items: center;
                    span{
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        line-height: 30px;
                    }
                }
            }
            
        }
    }
</style>
