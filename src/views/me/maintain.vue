<template>
    <div class="fruiter">
        <!-- <tab :line-width="2" custom-bar-width="50px">
            <tab-item selected @on-item-click="onItemClick" >列表</tab-item>
            <tab-item @on-item-click="$router.push('/me/farm')">大图</tab-item>
        </tab> -->
        <x-table v-if="listData.length" padding="10px" class="table" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
            <thead>
                <tr style="background-color: #F7F7F7">
                    <th>品种</th>
                    <th>编号</th>
                    <th>种植时长</th>
                    <th>维护到期</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in listData" :key="index" v-if="item.status != 7">
                    <td>{{item.name }}</td>
                    <td>{{item.code }}</td>
                    <td class="red">{{item.days}}</td>
                    <td>{{setFruiterType(item.status)}} <span v-if="item.recyclePrice && item.status == 4">(￥{{item.recyclePrice}})</span></td>
                    <td>
                        <x-button mini @click.native.stop="operation(item.status,item.id,item.recyclePrice)" >维护</x-button>
                    </td>
                </tr>
               
            </tbody>
        </x-table>
        <no-data v-else></no-data>
        <div v-transfer-dom class="one-pop">
            <popup v-model="show1">
                <div class="popup0">
                    <p class="title">选择卖出方向</p>
                    <div class="option-1" @click.stop="show2 = true;show1 = false">其他用户，由你自由定价</div>
                    <div class="option-2" @click.stop="submit(1,2,selectId)">商城、由平台工作人员报价</div>
                    
                </div>
            </popup>
        </div>
        <div v-transfer-dom class="two-pop">
            <popup v-model="show2" >
                <div class="popup0">
                    <div class="info">
                        <p class="title">确认信息</p>
                        <p>品种：车厘子</p>
                        <p>编号：NO.214135</p>
                        <p>种植时长：30天</p>
                        <div>联系方式：<input class="input" type="number" v-model="phone" placeholder="请输入联系方式"></div>
                        <div class="price">
                            <span>定价：</span>
                            <!-- <inline-x-number width="50px" v-model="recyclePrice"></inline-x-number> -->
                            <input class="input" type="number" v-model="recyclePrice" placeholder="请输入定价">
                        </div>
                        
                    </div>
                    <div class="bottom">
                        <div @click.stop="show2 = false">取消</div>
                        <div class="confirm" @click.stop="submit(1,1,selectId)">确定</div>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem, XTable, XButton, Group, Popup, TransferDom, InlineXNumber } from 'vux'
    import api from '@/api'
    import noData from '@/components/nodata.vue'
    export default{
        data (){
            return{
                show1:false,
                show2:false,
                listData:[],
                recyclePrice:null,
                phone:null,
                selectId:null
            }
        },
        directives: {
            TransferDom
        },
        components:{ Tab, TabItem, XTable, XButton,Group, Popup, InlineXNumber, noData },
        methods:{
            onItemClick (){

            },
            showPop (){
                this.show1 = !this.show1;
            },


            getMyTreeFun (){
                let _this = this;
                api.getMyTree().then(data =>{
                    _this.listData = data;
                }).catch(e =>{})
            },
            setFruiterType (type){
                switch (type){
                    case 1:
                        return '待报价'
                        break
                    case 2:
                        return '已报价'
                        break
                    case 3:
                        return '已完成'
                        break
                    case 4:
                        return '挂单'
                        break
                    case 5:
                        return '待发货'
                        break
                    case 6:
                        return '持有'
                        break
                }
            },
            setBtnText (type){
                switch (type){
                    case 1:
                        return '待报价'
                        break
                    case 2:
                        return '处理'
                        break
                    case 3:
                        return '已完成'
                        break
                    case 4:
                        return '取消出售'
                        break
                    case 6:
                        return '卖出'
                        break
                }
            }
        },
        created() {
            this.getMyTreeFun()
        },
    }
</script>
<style lang="less">
    .fruiter{
        .table{
            button{
                width: 58px;
                padding-left: 0;
                padding-right: 0;
            }
            .red{
                color: #f72525;
            }
        }
        .weui-btn_disabled.weui-btn_default {
            color: rgba(0, 0, 0, 0.3) !important;
            background-color: #F7F7F7 !important;
        }
        .vux-table{
            line-height: 18px;
            white-space:normal;
            word-break:break-all;   
            tr,td,th{
                padding: 12px 0;
            }
        }
    }
    .one-pop{
        .popup0{
            background-color: #fff;
            text-align: center;
            padding: 25px 0;
            border-radius: 10px 10px 0 0;
            .title{
                font-size: 18px;
            }
            >div{
                font-size: 16px;
                padding:20px 0;
            }
            .option-1{
                margin-top: 30px;
            }
            .option-2{
                color: #60a609;
                border-top: 1px solid #dbdbdb;
            }
        }
    }
    .two-pop{
        background-color: #fff;
        .popup0{
            background-color: #fff;
            // padding: 25px 25px 0 25px;
            padding-top: 25px;
            border-radius: 10px 10px 0 0;
            line-height: 30px;
            .info{
                padding: 0 25px;
                .title{
                    font-size: 18px;
                    text-align: center;
                }
                .price{
                    display: flex;
                    align-content: center;
                }
            }
            .bottom{
                display: flex;
                text-align: center;
                line-height: 45px;
                border-top: 1px solid #dbdbdb;
                margin-top: 10px;
                >div{
                    width: 50%;
                }
                .confirm{
                    color: #60a609;
                    border-left: 1px solid #dbdbdb;
                }
            }
            
        }
        .input{
            font-size: 14px;
            line-height: 18px;
            padding: 2px;
            border:0;
        }
    }
</style>
