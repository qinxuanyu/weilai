<template>
    <div class="index">
         <div class="message">
            <p class="msg-text">通知，各位亲爱的共享影视家人们，为平台长久发展做出的考虑，提现50起修改为50的倍数提现。</p>
        </div>
      
        <div class="big-img-box" @click.stop="clearToken">
             <img  src="src/assets/images/index/first_banner@2x.png" alt="" class="big-img">
        </div>
         <tabbar class="m-tabbar">
            <tabbar-item link="/goods">
                <img slot="icon" src="src/assets/images/index/buy_vip@2x.png">
                <span slot="label">购买VIP</span>
            </tabbar-item>
            <tabbar-item @click.native.stop="getMyCode">
                <img slot="icon" src="src/assets/images/index/activation@2x.png">
                <span slot="label">我的激活码</span>
            </tabbar-item>
            <tabbar-item  link="/app">
                <img slot="icon" src="src/assets/images/index/app_download@2x.png">
                <span slot="label">APP下载</span>
            </tabbar-item>
            <tabbar-item link="/service">
                <img slot="icon" src="src/assets/images/index/service@2x.png">
                <span slot="label">在线客服</span>
            </tabbar-item>
        </tabbar>
        <div class="img-link">
            <a href="http://you088.m.nucwc5.cn/index/index/cat/-1/index_app/1/all_hide/1/sort/8">
                <img src="src/assets/images/index/t_999@2x.png" alt="" class="big-img">
            </a>
            <div class="flex-box">
                <a href="http://you088.m.nucwc5.cn/index/index/p_cat/1/sort/8/cat_name/%E8%81%9A%E5%88%92%E7%AE%97/index_app/1/all_hide/1">
                    <img src="src/assets/images/index/1@2x.png" alt="">
                </a>
                <a href="http://you088.m.nucwc5.cn/index/index/p_cat/2/sort/8/cat_name/%E6%B7%98%E6%8A%A2%E8%B4%AD/index_app/1/all_hide/1">
                    <img src="src/assets/images/index/2@2x.png" alt="">
                </a>
                <a href="http://you088.m.nucwc5.cn/index/index/p_cat/4/sort/8/cat_name/%E5%93%81%E7%89%8C%E5%8D%95/index_app/1/all_hide/1">
                    <img src="src/assets/images/index/3@2x.png" alt="">
                </a>
                <a href="http://you088.m.nucwc5.cn/index/index/p_cat/5/sort/8/cat_name/%E5%A4%A7%E9%A2%9D%E5%88%B8/index_app/1/all_hide/1">
                    <img src="src/assets/images/index/4@2x.png" alt="">
                </a>
                
            </div>
            <swiper class="swiper" :aspect-ratio="279/709" :auto="true" dots-position="center">
                <swiper-item class="swiper-demo-img" v-for="(item, index) in demo04_list" :key="index">
                    <img :src="item">
                </swiper-item>
            </swiper>
        </div>
    </div>
    
</template>
<script>
    import { Swiper, SwiperItem, Tabbar, TabbarItem } from 'vux'
    import tool from '@/utils/tool'
    import api from '@/api'
    export default {
        data (){
            return{
                demo04_list:[
                    '/src/assets/images/index/bottom_banner1@2x.png',
                    '/src/assets/images/index/bottom_banner2@2x.png',
                    '/src/assets/images/index/bottom_banner3@2x.png'
                ]
            }
        },
        components:{ Swiper, SwiperItem, Tabbar, TabbarItem },
        methods:{
            setMsgAnimation (){
                var _box = document.querySelector('.message');
                var _text = document.querySelector('.msg-text');
                var left = 0;
                if(_text.clientWidth > _box.clientWidth){
                    setInterval(function(){
                        left += 2;
                        _text.style.left = - left +'px'
                        if(left > (_text.clientWidth - _box.clientWidth)){
                            left = -10;
                        }
                    },100)
                }
            },
            getMyCode (){
                let _this = this;
                api.getMyCode().then(data =>{
                    _this.$router.push('/code')
                }).catch(e =>{
                    _this.showTips('您还没购买会员，未获得激活码')
                })
            },
            clearToken(){
                tool.local.clear('token')
            }
        },
        created() {
            let _this = this;
            let code = tool.utils.getUrlParam('code');
            let doUid = this.$route.query.uid;
            if(doUid){
                tool.local.set('doUid',doUid);
            }
            if(code){
                if(!this.$store.getters.token){
                    let _doUid = this.$route.query.uid || tool.local.get('doUid') || null;
                   
                    api.login({
                        code:code,
                        upId:_doUid
                    }).then(data =>{
                        if(data.token){
                            _this.$store.commit('SET_TOKEN',data.token);
                            tool.local.set('nickName',data.name);
                            let _location = window.location.origin;
                            // window.location.href = _location;
                            // _this.$router.push(_location);
                            // _this.getHomeDataFun();
                        }
                        if(data.uid){
                            tool.local.set('uid',data.id);
                        }
                    }).catch(e =>{})
                }
                
            }else{
                 if(!this.$store.getters.token){
                        // tool.local.set('isAuth','on');
                    setTimeout(()=>{
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxfd808625986ae581&redirect_uri=http%3a%2f%2fyoh.tongyanbaby.cn%2f%23%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                    },100)
                }
            }
           
        },
        mounted() {
            this.setMsgAnimation()
        },
    }
</script>
<style lang="less" scoped>
    .index{
        .message{
            width: 80%;
            margin: 5px auto;
            padding: 8px 5px;
            overflow: hidden;
            position: relative;
            height: 25px;
            // border: 1px solid #f3f3f3;
            
            p{
                position: absolute;
                width: auto;
                font-size: 16px;
                white-space: nowrap;
            }
        }
        .m-tabbar{
            position: initial;
            background-color: #fff;
        }
        >.big-img-box{
            padding: 8px 15px;
            img{
            width: 100%;

            }
        }
        .img-link{
            padding: 15px;
            .big-img{
                width: 100%;
            }
            .flex-box{
                // display: flex;
                // flex-wrap: wrap;
                img{
                    display: inline-block;
                    width: 49%;

                    height: auto;
                    margin: 5px auto;
                }
            }
        }
        .m-tabbar{
            padding: 10px 0;
        }
        .swiper{
            img{
                width: 100%
            }
        }
    }
</style>
