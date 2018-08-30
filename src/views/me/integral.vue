<template>
    <div class="integral">
          <scroller>
            <div class="top">
                <div class="name">
                    <div class="avatar">
                        <img src="src/assets/images/com_goodreputation@2x.png" alt="">
                    </div>
                    <router-link to="/me/integral-details">积分明细</router-link>
                </div>
                <div class="num">
                    <img src="src/assets/images/ind_integral@2x.png" alt="">
                    <p>{{point}}</p>
                </div>
            </div>
            <ul class="list">
                <li v-for="(item,index) in listData" :key="index" @click.stop="$router.push('/store/detail/'+ item.id + '?type=integral')">
                    <div class="img">
                        <img :src="item.coverImage" alt="">
                    </div>
                    <div class="title">
                        <p>{{item.introduce}}</p>
                        <div class="btn">
                            <span>{{item.point}}积分</span>
                            <x-button mini>立即兑换</x-button>
                        </div>
                    </div>
                </li>
               
            </ul>
        </scroller>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[],
                point:0
            }
        },
        components:{ XButton },
        methods:{
            getListData (){
                let _this = this;
                api.getPointGoodsList().then(data =>{
                    if(data){
                        _this.listData = _this.listData.concat(data.dtos);
                        _this.point = data.point;
                    }
                }).catch(e =>{})
            }
        },
        created() {
            this.getListData()
        },
        mounted() {
           

        },
    }
</script>
<style lang="less" scoped>
    .integral{
        .top{
            height: 130px;
            background-color: #2f2b28;
            position: relative;
            .name{
                display: flex;
                padding: 14px;
                justify-content: space-between;
                align-items: center;
                .avatar{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                >a{
                    color: #fff;
                }
            }
            .num{
                position: absolute;
                left: 50%;
                top: 35px;
                margin-left: -31px;
                text-align: center;
                img{
                    width: 62px;
                }
                p{
                    font-size: 24px;
                    color: #a88c18;
                }
            }
        }
        .list{
            li{
                display: flex;
                padding: 10px;
                border-bottom: 1px solid #f3f3f3;
                .img{
                    width: 125px;
                    height: 108px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .title{
                    flex: 1;
                    padding-left: 12px;
                    .btn{
                        display: flex;
                        font-size: 16px;
                        margin-top: 32px;
                        span{
                            color: #f11010;
                        }
                        button{
                            font-size: 14px;
                            background-color: #60a609;
                            color: #fff;
                        }
                    }
                    >p{
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        overflow: hidden;
                    }
                }
            }
        }
    }
</style>
