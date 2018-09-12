<template>
    <div class="coupon">
        <tab custom-bar-width="50px" class="tab-top" :line-width="2">
            <tab-item selected @on-item-click="status = false;listData = [];getMyTicketListFun()">未使用</tab-item>
            <tab-item @on-item-click="status = true;listData = [];getMyTicketListFun()">不可用</tab-item>
        </tab>
        <div class="list">
            <scroller ref="myscroller" :on-infinite="infinite">
                <div></div>
                <ul>
                    <li v-for="(item,index) in listData" :key="index" >
                        <i></i>
                        <div class="center">
                            <p class="value">￥{{item.price}}</p>
                            <p>满{{item.suitPrice}}减{{item.price}}</p>
                        </div>
                        <div class="right" @click.stop="$router.push('/store/index')">
                            <span>去购物</span>
                        </div>
                    </li>
                
                </ul>
            </scroller>
            
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem } from 'vux';
    import api from '@/api'
    export default{
        data (){
            return{
                status:false,
                listData:[]
            }
        },
        components:{
            Tab, TabItem
        },
        methods:{
            getMyTicketListFun (){
                let _this = this;
                api.getMyTicketList({
                    status:this.status
                }).then(data =>{
                    if(data.length){
                        _this.listData = data;
                    }
                    _this.$refs.myscroller.finishInfinite(2)
                }).catch(e =>{})
            },
            infinite (){

            }
        },
        created() {
            this.getMyTicketListFun()
        },
        mounted() {
           
            var window_h = window.innerHeight;
            document.querySelector('._v-container').style.height = (window_h - 44) +'px';
            document.querySelector('._v-container').style.top = '44px'
        },
    }
</script>
<style lang="less" scoped>
    .coupon{
        .list{
            ._v-container{
                background-color: #f3f3f3;
            }
            ul{
                // min-height: 100vh;
                padding: 13px 10px;
                
                li{
                    display: flex;
                    align-items: center;
                    font-size: 16px;
                    margin-bottom: 8px;
                    background-color: #fff;
                    i{
                        width: 93px;
                        height: 98px;
                        background: url(/src/assets/images/me_coupon_tag.png) no-repeat;
                        background-size: 100% 100%;
                    }
                    .center{
                        flex: 1;
                        padding-left: 15px;
                        .value{
                            font-size: 26px;
                            color: #f11010;
                        }
                    }
                    .right{
                        padding-right: 15px;
                        display: flex;
                        align-items: center;
                    }
                    .right::after{
                        content: " ";
                        display: inline-block;
                        width: 8px;
                        height: 16px;
                        margin-left: 12px;
                        background: url(/src/assets/images/com_right@2x.png) no-repeat;
                        background-size: 100% 100%;
                    }
                }
            }
        }
    }
</style>
