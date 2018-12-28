<template>
    <div class="my">
        <div class="user">
            <div class="avatar">
                <img :src="myInfo.imageUrl" alt="">
            </div>
            <p class="name">{{myInfo.name}}</p>
            <p>id:{{myInfo.uid}}({{setLevel(myInfo.level)}})</p>
        </div>
        <grid>
            <grid-item :label="i.num | numFilter" v-for="(i,k) in gridArr" :key="k">
                <!-- <p >{{i.num}}</p> -->
                <p class="text-center">{{i.title}}</p>
            </grid-item>
        </grid>
        <group class="cell">
            <cell 
                v-for="(item,index) in cellArr" 
                :key="index" 
                :title="item.title" 
                is-link
                :link="item.link"
                :inline-desc="item.inline"
            >
                <img slot="icon" width="25" :src="item.icon">
            </cell>
        </group>
        
    </div>
</template>
<script>
    import { Grid, GridItem, Cell, Group } from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'

    export default {
        data (){
            return{
                gridArr:[{
                    title:'待赠积分',
                    num:'0'
                },{
                    title:'可提金额',
                    num:'0'
                },{
                    title:'总佣金',
                    num:'0'
                }],
                cellArr:[{
                    title:'我的好友',
                    icon:'/src/assets/images/my/me_friend@2x.png',
                    link:'/explain',
                    inline:'拓展你的好友圈！！'
                },{
                    title:'待赠积分',
                    icon:'/src/assets/images/my/me_give@2x.png',
                    link:'my-wallet/1',
                    inline:'每日累计，平台赠送'
                },{
                    title:'我的钱包',
                    icon:'/src/assets/images/my/me_wallet@2x.png',
                    link:'my-wallet/2',
                    inline:'加油累计，肆意挥霍你的任性'
                },{
                    title:'使用帮助',
                    icon:'/src/assets/images/my/me_question@2x.png',
                    link:'/flow',
                    inline:'常见问题，不懂戳这'
                },{
                    title:'在线客服',
                    icon:'/src/assets/images/my/me_service@2x.png',
                    link:'/service',
                    inline:'有问题及时咨询客服'
                }],
                myInfo:{}
            }
        },
        components: {
            Grid,
            GridItem,
            Cell,
            Group
        },
        methods:{
            getMyInfo (){
                let _this = this;
                api.getMyInfo().then(data =>{
                    _this.myInfo = data;
                    _this.gridArr[0].num =  data.waitMoney >= 0 ? data.waitMoney : 0;
                    _this.gridArr[1].num = data.freeMoney  ||'0';
                    // console.log(_this.gridArr[1].num)
                    _this.gridArr[2].num = data.allMoney || '0';
                    if(data.level == 0){
                        _this.cellArr = [{
                            title:'使用帮助',
                            icon:'/src/assets/images/my/me_question@2x.png',
                            link:'/flow',
                            inline:'常见问题，不懂戳这'
                        },{
                            title:'在线客服',
                            icon:'/src/assets/images/my/me_service@2x.png',
                            link:'/service',
                            inline:'有问题及时咨询客服'
                        }]
                    }
                }).catch(e =>{})
            },
            setLevel (status){
                switch (status){
                    case 0:
                        return '游客';
                        break;
                     case 1:
                        return '会员';
                        break
                     case 2:
                        return '店长';
                        break
                     case 3:
                        return '经理';
                        break
                     case 4:
                        return '总监';
                        break
                    case 5:
                        return '理事';
                        break
                }
            }
        },
        created() {
            this.getMyInfo();
             let code = tool.utils.getUrlParam('code');
             let tuiOnpenId = tool.local.get('tuiOnpenId')
            //  if(code){

            //  }
          
            if(code){
                if(!tuiOnpenId){
                    api.daiMoLogin({
                        code:code,
                        upId:0
                    }).then((result) => {
                        if(result){
                            tool.local.set('tuiOnpenId',result);
                        }else{
                            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ede578025b47fbc&redirect_uri=http%3a%2f%2fwcyc.o995zr.com%2f%23%2fmy&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
                        }
                    }).catch((err) => {
                        
                    });
                }
                
            }else{
                if(!tuiOnpenId){
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5ede578025b47fbc&redirect_uri=http%3a%2f%2fwcyc.o995zr.com%2f%23%2fmy&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect'
                }
            }
        },
    }
</script>

<style lang="less" >
    .my{
        .user{
            // padding: 40px 0 20px 0;
            height: 187px;
            background: linear-gradient(90deg,#faa54a,#f7650f);
            text-align: center;
            overflow: hidden;
            color: #fff;
            .avatar{
                width: 62px;
                height: 62px;
                border-radius: 50%;
                overflow: hidden;
                margin: 13px auto 10px auto;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .name{
                font-size: 16px;
            }
        }
        .cell{
            .vux-cell-primary{
                padding-left: 24px;
            }
        }
    }
</style>
