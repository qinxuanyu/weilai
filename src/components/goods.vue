<template>
    <div class="goods">
        <flexbox :gutter="0">
            <flexbox-item>
                <div class="flex-demo">
                    <div class="img-wrap" :style="{'heigth' : imgWrapWidth + 'px'}">
                        <img src="http://image5.suning.cn/b2c/catentries/000000000140693701_2_800x800.jpg" alt="">
                    </div>
                    <p class="f-12">树懒果园  美国进口车厘子大樱桃水果  1kg  果经28-30mm啥说法是否对</p>
                    <div class="price">
                        <span>￥109.1</span><span>已售1054件</span>
                    </div>
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo">
                    <div class="img-wrap" :style="{'heigth' : imgWrapWidth + 'px'}">
                        <img src="http://image5.suning.cn/b2c/catentries/000000000140693701_2_800x800.jpg" alt="">
                    </div>
                    <p class="f-12">树懒果园  美国进口车厘子大樱桃水果  1kg  果经28-30mm啥说法是否对</p>
                    <div class="price">
                        <span>￥109.1</span><span>已售1054件</span>
                    </div>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
    import { Flexbox, FlexboxItem } from 'vux'
    export default{
        name:'goods',
        data (){
            return {
                 imgWrapWidth:160
            }
        },
        components:{Flexbox, FlexboxItem},
        methods:{
           
        },
        mounted() {
            var width = document.querySelector('.img-wrap').clientWidth;
            this.imgWrapWidth = width;
        },
    }
</script>
<style lang="less" scoped>
    .goods{
        padding: 10px;
        .flex-demo{
            .img-wrap{
                width: 100%;
                height: 160px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            >p{
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;  
                overflow: hidden;
            }
            .price{
                font-size: 16px;
                :nth-child(1){
                    color: #f11010
                }
                :nth-child(2){
                    margin-left: 8px;
                    color: #999999;
                    font-size: 12px;
                }
            }
        }
        .flex-demo:nth-child(2n-1){
            padding-left: 10px;
        }
        
    }
</style>
