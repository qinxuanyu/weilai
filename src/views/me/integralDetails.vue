<template>
    <div class="capital">
        <tab custom-bar-width="50px" class="tab-top" :line-width="2">
            <tab-item selected @click.native.stop="type = 0;listData = [];getListData()">支出</tab-item>
            <tab-item @click.native.stop="type = 1;listData = [];getListData()">收入</tab-item>
        </tab>
        <!-- <scroller v-show="type === 0"  :on-infinite="infinite_z" ref="scroller-z">
            <group>
                <cell title="购树" value="-100.0" inline-desc='2018-1-1'></cell>
            </group>
        </scroller>
        <scroller v-show="type === 1" :on-infinite="infinite_s" ref="scroller-s">
            <group>
                <cell title="购树1" value="-100.0" inline-desc='2018-1-1'></cell>
            </group>
        </scroller> -->
         
            <div >
                <group>
                    <cell v-for="(item,index) in listData" :key="index" :title="item.explains" :value="'-' + item.point" :inline-desc='item.createTime '></cell>
                </group>
            </div>
  
    </div>
</template>
<script>
    import { Group, Cell, Tab, TabItem  } from 'vux';
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[],     
                type:0,  // 1收入 0支出
                
            }
        },
        components:{ Group, Cell, Tab, TabItem  },
        methods:{
            getListData (){
                let _this = this;
                api.getPointDetail({
                    type:this.type
                }).then(data =>{
                    if(data && data.length){
                        _this.listData = data;
                    }
                    // _this.$refs.myscroller.finishInfinite(2)
                }).catch(e =>{})
                
            },
            infinite_s (){

            }
        },
        created() {
            this.getListData()
        },
        mounted() {
            // var window_h = window.innerHeight;
            // document.querySelector('._v-container').style.height = (window_h - 44) +'px';
            // document.querySelector('._v-container').style.top = '44px';
            // document.querySelectorAll('._v-container')[1].style.height = (window_h - 44) +'px';
            // document.querySelectorAll('._v-container')[1].style.top = '44px'
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
