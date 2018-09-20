<template>
    <div class="store-list">
        <tab v-if="requestData.type == 4" :line-width="2" custom-bar-width="50px" active-color="#60a609">
            <tab-item selected @on-item-click="onItemClick(1)">商城直售</tab-item>
            <tab-item @on-item-click="onItemClick(2)">植友特卖</tab-item>
        </tab>
        <sort-tab v-if="requestData.type != 1" @srot="getSrotValue" ref="sortTab"></sort-tab>
        <scroller 
                  :on-infinite="infinite" 
                  ref="myscroller" 
                  >
                 <div class="line" ></div>
                 <goods-list :list-data="listData" :type="requestData.type"></goods-list>
        </scroller>
    </div>
    
</template>
<script>
    import SortTab from '@/components/SortTab.vue';
    import GoodsList from '@/components/goods.vue'
    import {Tab, TabItem} from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
       
        data (){
            return{
                scroller_h:'500',
                requestData:{
                    createTime:'',
                    size:10,
                    type:1,     
                    order:1,    //排序（1、时间倒序2、销量从高到低3、价格从低到高，默认时间倒序）
                    from:1      //	来源，1、商城2、植友
                },
                listData:[],
                isALlData:false
            }
        },
        components:{SortTab, GoodsList, Tab, TabItem},
        methods:{
            //排序
            getSrotValue(val){
                if(val.sales !== undefined){
                    val.sales ? this.requestData.order = 2 : this.requestData.order = 4;
                    this.requestData.createTime = '';
                    this.listData = [];
                    this.getListData()
                }else if(val.time !== undefined){
                    val.time === true ? this.requestData.order = 1 : this.requestData.order = 6;
                    this.requestData.createTime = '';
                    this.listData = [];
                    this.getListData()
                }else if(val.price !== undefined){
                    val.price ? this.requestData.order = 3 :  this.requestData.order = 5;
                    this.requestData.createTime = '';
                    this.listData = [];
                    this.getListData()
                }
            },
            refresh (){

            },
            infinite (done){
                // this.$refs.myscroller.resize();
                 this.getListData();
                // done()
            },
            onItemClick($from){
                tool.local.set('isPlatformGoods',$from)   //判断是否是平台商品还是植友商品 1-商城  2-植友
                let from = $from;
                this.requestData.from = from;
                this.requestData.createTime = '';
                this.listData = [];
                this.getListData()
            },
            getListData (){
                let _this = this;
                api.goodsList({
                    createTime:_this.requestData.createTime,
                    size:_this.requestData.size,
                    type:_this.requestData.type,
                    order:_this.requestData.order,
                    from:_this.requestData.from,
                }).then(data =>{
                    _this.listData = _this.listData.concat(data);
                    if(data.length){
                        _this.requestData.createTime = data[data.length - 1].createTime;
                    }
                    if(data.length < _this.requestData.size){
                       _this.$refs.myscroller.finishInfinite(2)
                    }else{
                        _this.$refs.myscroller.finishInfinite(0)
                    }
                }).catch(error =>{})
            }
        },
        created() {
            let type =  this.$route.params.type;
            this.requestData.type = type;
            switch (type){
                case '5' :
                    this.$store.commit('UPDATE_TITLE','树苗');
                    break;
                case '2':
                    this.$store.commit('UPDATE_TITLE','果树');
                    break;
                case '4':
                    this.$store.commit('UPDATE_TITLE','水果');
                    break;
               
            }
           tool.local.set('isPlatformGoods',1)   //判断是否是平台商品还是植友商品 1-商城  2-植友
        },
        mounted() {
            
        },
        mounted() {
            var window_h = window.innerHeight;
            var sort_h = document.querySelector('.srot') ? document.querySelector('.srot').scrollHeight : 0;
            let tab_h = document.querySelector('.vux-tab') ? document.querySelector('.vux-tab').scrollHeight : 0;
            let result =  String(window_h - (sort_h + tab_h));
            // document.querySelector('._v-container').style.height = result +'px'
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
