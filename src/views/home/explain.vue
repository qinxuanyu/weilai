<template>
    <div class="explain">
        <tab custom-bar-width="90px" class="taber">
            <tab-item selected >升级代理</tab-item>
            <tab-item @on-item-click="$router.push('/my-friend')">我的好友</tab-item>
        </tab>
        <div class="text">
            <p v-for="(item,index) in gradeArr" 
            :key="index"
            >
                <span class="grade">成为{{item.grade}}条件</span>，直接销售 <span class="red">({{item.zSales}})</span> 张，销售渠道 <span class="red">({{item.qSales}})</span> 张
            </p>
            <!-- <p>成为经理条件，直接销售 <span>（30）</span>张，销售渠道 <span>（150）</span>张</p>
            <p>成为总监条件，直接销售 <span>（50）</span>张，销售渠道 <span>（500）</span>张</p>
            <p>成为理事条件，直接销售 <span>（300）</span>张，销售渠道 <span>（3000）</span>张</p> -->
        </div>
        <div class="bottom">
            <p class="num">当前：直推{{z_num}}张，渠道{{h_num}}张</p>
            <p class="title">{{textTitle}}</p>
            <x-button link="/qr-code">我要推广</x-button>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem, XButton } from 'vux'
    import api from '@/api'
    export default {
        data (){
            return{
                gradeArr:[{
                    grade:'店长',
                    zSales:10,
                    qSales:50
                },{
                    grade:'经理',
                    zSales:30,
                    qSales:150
                },{
                    grade:'总监',
                    zSales:50,
                    qSales:500
                },{
                    grade:'理事',
                    zSales:200,
                    qSales:20000
                }],
                z_num:0,
                h_num:0,
                textTitle:'您还未达标，快去推广吧！'
            }
        },
        components: {
            Tab,
            TabItem,
            XButton
        },
        methods:{
            getMyTeam (){
                let _this = this;
                api.myTeamNum().then(data =>{
                    if(data){
                        _this.z_num =  data.zhiNum.split('/')[1];
                       
                       
                        _this.h_num = data.tuanNum.split('/')[1];
                       
                    }
                }).catch(e =>{})
            },
            getMyInfo (){
                let _this = this;
                api.getMyInfo().then(data =>{
                    _this.textTitle = _this.setLevel(data.level);
                }).catch(e =>{})
            },
            setLevel (status){
                switch (status){
                    case 0:
                        return '您还未达标，快加油吧！';
                        break;
                     case 1:
                        return '您还未达标，快加油吧！';
                        break
                     case 2:
                        return '恭喜你成为店长！';
                        break
                     case 3:
                        return '恭喜你成为经理！';
                        break
                     case 4:
                        return '恭喜你成为总监！';
                        break
                     case 5:
                        return '恭喜你成为理事！';
                        break
                }
            }
        },
        created (){
            this.getMyTeam();
            this.getMyInfo()
        }
    }
</script>
<style lang="less" scoped>
    .explain{
        min-height: 100vh;
        // background-color: #efefef;
        .taber{
            .vux-tab-item{
                font-size: 12px !important;
            }
        }
        .text{
            font-size: 12px;
            padding: 40px 20px;
            text-align: center;
            p{
                margin-top: 10px;
                .grade{
                    color: #888888;
                }
                .red{
                    color: #f91212
                }
            }
        }
        .bottom{
            text-align: center;
            .num{
                color: #e95701;
            }
            .title{
                color: #ababab;
            }
            button{
                margin-top: 10px;
                font-size: 14px;
                width: 144px;
                height: 36px;
                background-color: #e95701 !important;
            }
        }
    }
</style>
