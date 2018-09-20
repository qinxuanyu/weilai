<template>
    <div class="capital">
        
            <tab custom-bar-width="50px" class="tab-top">
                <tab-item selected @on-item-click="type = 1;listData = [];getListData()">支出</tab-item>
                <tab-item @on-item-click="type = 2;listData = [];getListData()">收入</tab-item>
            </tab>
            <div v-if="listData.length">
                 <group >
                    <cell v-for="(item,index) in listData" :key="index" :title="item.introduce" :value="type === 1 ? '-' + item.money : '+' + item.money" :inline-desc='item.createTime '></cell>
                </group>
            </div>
            <no-data v-else></no-data>
       
    </div>
</template>
<script>
    import { Group, Cell, Tab, TabItem  } from 'vux';
    import noData from '@/components/nodata.vue'
    import api from '@/api'
    export default{
        data (){
            return{
                type:1,
                listData:[]
            }
        },
        components:{ Group, Cell, Tab, TabItem, noData  },
        methods:{
            getListData (){
                let _this = this;
                api.getMoneyDetail({
                    type:_this.type
                }).then(data =>{
                    _this.listData = data;
                    _this.$refs.myscroller.finishInfinite(2)
                }).catch(e =>{})
            },
            infinite (){
                console.log(1)
                this.getListData()
            }
        },
        created() {
            // this.getListData()
        },
        mounted() {
           
            var window_h = window.innerHeight;
            console.log(window_h)
            // document.querySelector('._v-container').style.height = (window_h - 44) +'px';
            // document.querySelector('._v-container').style.top = '44px'
        },
    }
</script>
<style lang="less">
    .capital{
        .weui-cell__ft{
            font-size: 16px;
            color: #f11010;
        }
        .vux-no-group-title{
            margin-top: 0;
        }
    }
</style>
