<template>
    <div>
        <scroller ref="myscroller" :on-infinite="infinite" >
            <div></div>
            <goods-list :list-data="listData" ></goods-list>
        </scroller>
    </div>
</template>
<script>
import goodsList from '@/components/goods.vue'
import api from "@/api"
export default {
    data (){
        return{
            name:'',
            createTime:'',
            size:10,
            listData:[],
        }
    },
    components:{ goodsList },
    methods:{
        getSearchList (){
            let _this = this;
            api.searchGoods({
                name:this.name,
                createTime:this.createTime,
                size:this.size
            }).then(data =>{
                if(data.length){
                    _this.listData = _this.listData.concat(data);
                    _this.createTime = data[data.length - 1].createTime;
                }
                if(data.length < _this.size){
                    console.log('暂无数据')
                    _this.$refs.myscroller.finishInfinite(2)
                }else{
                    _this.$refs.myscroller.finishInfinite(0)
                }
            }).catch(e =>{})
        },
        infinite (){
            this.getSearchList()
        }

    },
    created() {
        let name = this.$route.params.name;
        this.name = name;
    },
}
</script>
<style lang="less" scoped>

</style>
