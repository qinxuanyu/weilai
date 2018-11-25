<template>
    <div class="my-friend">
         <tab custom-bar-width="60px" class="taber">
            <tab-item class="one"  @on-item-click="$router.push('/explain')">升级代理</tab-item>
            <tab-item selected @on-item-click="type = 1">直推({{z_num}}张)</tab-item>
            <tab-item @on-item-click="type = 2">好友({{h_num}}张)</tab-item>
         </tab>
         <p class="num-title">只显示1000条数据</p>
        <div v-if="type == 1">
            <user-list
                v-for="(item,index) in z_list"
                :key="index"
                :url="item.imageUrl"
                :name="item.name + '('+ setLevel(item.level )+')'"
                :id="item.uid "
                :time="item.createTime "
            >

            </user-list>
            <no-data v-if="!z_list.length"></no-data>
        </div>
        <div v-if="type == 2">
            <user-list
                v-for="(item,index) in h_list"
                :key="index"
                :url="item.imageUrl"
                :name="item.name"
                :id="item.uid "
                :time="item.createTime "
            >

            </user-list>
            <no-data v-if="!h_list.length"></no-data>
        </div>
    </div>

</template>
<script>
    import { Tab, TabItem } from 'vux'
    import userList from '@/components/userList'
    import noData from '@/components/nodata'
    import api from '@/api'
    export default {
        data (){
            return{
                z_list:[],
                z_num:'0人/0',
                h_list:[],
                h_num:'0人/0',
                type:1,
            }
        },
        components:{Tab, TabItem, userList, noData},
        methods:{
            getMyTeam (){
                let _this = this;
                api.myTeam().then(data =>{
                    if(data){
                        _this.z_num = data.zhiNum.split('/')[0] + '人/' + data.zhiNum.split('/')[1];
                       
                        _this.z_list = data.zhiDtos;
                        _this.h_num = data.tuanNum.split('/')[0] + '人/' + data.zhiNum.split('/')[1];
                        _this.h_list = data.tuanDtos;
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
                }
            }
        },
        created() {
            this.getMyTeam()
        },
    }
</script>
<style lang="less" scoped>
    .my-friend{
        .taber{
            .vux-tab-item{
                font-size: 12px !important;
            }
            .one{
                // flex: initial;
                // width: 50px;
            }
        }
        .num-title{
            padding: 10px;
            background: #f3f3f3;
            color: #999;
        }
    }
</style>
