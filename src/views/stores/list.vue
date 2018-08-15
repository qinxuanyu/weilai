<template>
    <div class="store-list">
       
        <scroller 
                  :on-infinite="infinite" 
                  ref="myscroller"
                  >
                 <sort-tab @srot="getSrotValue" ></sort-tab>
                 <div class="line"></div>
                 <goods-list></goods-list>
        </scroller>
    </div>
    
</template>
<script>
    import SortTab from '@/components/SortTab.vue';
    import GoodsList from '@/components/goods.vue'
    export default{
        components:{SortTab, GoodsList},
        methods:{
            getSrotValue(val){
                console.log(val)
            },
            refresh (){

            },
            infinite (done){
                console.log(this.noData);
                // this.$refs.myscroller.resize();
                this.$refs.myscroller.finishInfinite(2)
                // done()
            }
        }
    }
</script>
<style lang="less" scoped>
    .store-list{
        .line{
            height: 18px;
            background-color: #f3f3f3;
        }
    }
</style>
