<template>
    <div class="store-list">
        <tab :line-width="2" custom-bar-width="50px" active-color="#60a609">
            <tab-item selected @on-item-click="onItemClick">商城直售</tab-item>
            <tab-item @on-item-click="onItemClick">植友特卖</tab-item>
        </tab>
        <sort-tab @srot="getSrotValue" ref="sortTab"></sort-tab>
        <scroller 
                  :on-infinite="infinite" 
                  ref="myscroller" 
                  :height="scroller_h"
                  >
                
                 <div class="line"></div>
                 <goods-list></goods-list>
        </scroller>
    </div>
    
</template>
<script>
    import SortTab from '@/components/SortTab.vue';
    import GoodsList from '@/components/goods.vue'
    import {Tab, TabItem} from 'vux'
    export default{
        components:{SortTab, GoodsList, Tab, TabItem},
        data (){
            return{
                scroller_h:'500'
            }
        },
        methods:{
            getSrotValue(val){
                console.log(val)
            },
            refresh (){

            },
            infinite (done){
                // this.$refs.myscroller.resize();
                this.$refs.myscroller.finishInfinite(2)
                // done()
            },
            onItemClick(){
                
            }
        },
        mounted() {
            var window_h = window.innerHeight;
            var sort_h = document.querySelector('.srot').scrollHeight;
            let tab_h =  document.querySelector('.vux-tab').scrollHeight || 0;
            let result =  String(window_h - (sort_h + tab_h));
            
            document.querySelector('._v-container').style.height = result +'px'
        },
    }
</script>
<style lang="less" scoped>
    .store-list{
        .line{
            height: 18px;
            background-color: #f3f3f3;
        }
        ._v-container{
            position: initial;
        }
    }
</style>
