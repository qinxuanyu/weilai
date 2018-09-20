<template>
    <div class="evaluate">
        <scroller>
            <div class="top">
                <img :src="avatar" alt="">
                <div class="text">
                    <p><span>{{goodsRate}}%</span> 好评</p>
                    <p class="num">{{goodsNum}}人好评</p>
                </div>
            </div>
            <div class="line"></div>
            <ul class="list" v-for="(item,index) in listData" :key="index">
                <li>
                    <div class="user">
                        <div class="avatar">
                            <img :src="item.imageUrl" alt="">
                        </div>
                        <span>{{item.nickname}}</span>
                    </div>
                    <div class="content">{{item.content}}</div>
                    <div class="time">
                        <span>{{item.createTime}}</span>
                        <span>规格：标准（100g）</span>
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
                createTime:'',
                size:10,
                goodsId:null,
                listData:[],
                goodsRate:0,
                goodsNum:0,
                avatar:''
            }
        },
        methods:{
            getListData (){
                let _this = this;
                api.evaluateList({
                    createTime:this.createTime,
                    size:this.size,
                    goodsId:this.goodsId
                }).then(data =>{
                    if(data.evaluates.length){
                        _this.listData = _this.listData.concat(data.evaluates);
                    }
                    _this.goodsRate = Number(data.goodsRate) * 100;
                    _this.goodsNum = data.goodsNum;
                }).catch(e =>{})
            }
        },
        created() {
            let goodsId = this.$route.params.goodsId;
            this.goodsId = goodsId;
            this.avatar = tool.local.get('avatar')
            this.getListData()
        },
    }
</script>
<style lang="less" scoped>
    .evaluate{
        .top{
            display: flex;
            justify-content: center;
            padding: 17px 0;
            img{
                width: 42px;
                height: 42px;
            }
            .text{
                span{
                    font-size: 18px;
                }
                .num{
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
        .line{
            height: 8px;
            background-color: #f3f3f3;
        }
        .list{
            li{
                padding: 12px;
                font-size: 14px;
                border-bottom: 1px solid #f5f5f5;
                .user{
                    display: flex;
                    .avatar{
                        width: 27px;
                        height: 27px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 8px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    >span{
                        color: #8f8f8f;
                    }
                }
                .content{
                    margin-top: 10px;
                    margin-bottom: 15px;
                }
                .time{
                    color: #8f8f8f;
                    margin-bottom: 12px;
                    
                }
            
            }
        }
    }
</style>
