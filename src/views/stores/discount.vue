<template>
    <div class="discount">
        <scroller>
            <ul class="view">
                <li class="item">
                    <div class="left">
                        <img src="http://image5.suning.cn/b2c/catentries/000000000140693701_2_800x800.jpg" alt="">
                    </div>
                    <div class="right">
                        <p class="name">美国车厘子  新鲜水果  进口新鲜大樱桃1KG装  果经约28-30mm</p>
                        <div class="bottom">
                            <div class="data">
                                <p class="price">￥115.2 <span>￥168</span></p>
                                <p class="num">已售2451件</p>
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
    export default{
        components:{XButton}
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
