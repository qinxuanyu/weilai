<template>
    <div class="goods">
        <flexbox :gutter="0" wrap="wrap" align="flex-start">
            <flexbox-item @click.native.stop="$router.push('/store/detail/' + item.id+'/'+type)" v-for="(item,index) in listData" :key="index" :span="6">
                <div class="flex-demo">
                    <div class="img-wrap" :style="{'height' : imgWrapWidth + 'px'}">
                        <img :src="item.coverImage" alt="">
                    </div>
                    <p class="f-12">{{item.introduce}}</p>
                    <div class="price">
                        <span>￥{{item.price}}</span><span>已售{{item.saledNum}}件</span>
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
        props:['listData','type'],
        components:{Flexbox, FlexboxItem},
        methods:{
           
        },
        updated() {
            if(document.querySelector('.img-wrap')){
                var width = document.querySelector('.img-wrap').offsetwidth;
                this.imgWrapWidth = width;
            }
          

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
                min-height: 38px;
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
