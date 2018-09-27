<template>
    <div class="discount">
        <scroller :on-infinite="infinite" 
                  ref="myscroller" >
            <ul class="view">
                <li class="item" v-for="(item,index) in listData" :key="index" @click.stop="$router.push('/store/detail/'+item.id+'/6')">
                    <div class="left">
                        <img :src="item.coverImage" alt="">
                    </div>
                    <div class="right">
                        <p class="name">{{item.introduce}}</p>
                        <div class="bottom">
                            <div class="data">
                                <p class="price">￥{{item.price }}<span>￥{{(item.price / item.discount).toFixed(2)}}</span></p>
                                <p class="num">已售{{item.saledNum}}件</p>
                            </div>
                            <x-button :mini="true">立即抢购</x-button>
                        </div>
                    </div>
                </li>
            </ul>
        </scroller>    
    </div>
</template>
<script>
    import { XButton } from 'vux';
    import api from '@/api'
    export default{
        data (){
            return {
                createTime:'',
                size:10,
                listData:[]
            }
        },
        components:{ XButton },
        methods:{
            getDicounListFun (){
                let _this = this;
                api.getDicounList({
                    createTime:_this.createTime,
                    size:_this.size
                }).then(data =>{
                    
                    if(data.length){
                        _this.listData = _this.listData.concat(data)
                    }
                    if(data.length < _this.size){
                       _this.$refs.myscroller.finishInfinite(2)
                    }else{
                        _this.$refs.myscroller.finishInfinite(0)
                    }
                }).catch(e =>{})
            },
            infinite (){
                 this.getDicounListFun()
            }
        },
        created() {
            // this.getDicounListFun()
        },
    }
</script>
<style lang="less" scoped>
    .discount{
        .view{
            padding: 6px 0 6px 6px;
            .item{
                padding-right: 6px;
                border-bottom: 1px solid #dbdbdb;
                display: flex;
                .left{
                    width: 124px;
                    height: 108px;
                    overflow: hidden;
                    img{
                        width: 100%;
                        // height: 100%;
                    }
                }     
                .right{
                    padding-left: 13px;
                    flex: 1;
                    .name{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        min-height: 44px;
                    }
                   .bottom{
                       display: flex;
                       align-items: center;
                       .data{
                           color: #f11010;
                           font-size: 16px;
                           span{
                               font-size: 12px;
                               color: #999999;
                               text-decoration:line-through
                           }
                       }
                       .num{
                           color: #999999;
                           font-size: 12px;
                       }
                       button{
                           height: 30px;
                           background-color: #60a609;
                           color: #fff;
                       }
                   }

                }           
            }
        }
    }
</style>
