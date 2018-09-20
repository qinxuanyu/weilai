<template>
    <div class="fruiter">
        
        <x-table v-if="listData.length" class="table" :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
            <thead>
                <tr style="background-color: #F7F7F7">
                    <th>品种</th>
                    <th>编号</th>
                    <th>状态</th>
                    <th>收获量</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item,index) in listData" :key="index">
                    <td> <check-icon :value.sync="item.isCheck"> </check-icon> {{item.name }}</td>
                    <td>{{item.goodsId }}</td>
                    <td class="red">{{item.type === 1 ? '未收获'  : '已收获' }}</td>
                    <td>{{item.weight}}</td>
                    <td>
                        <x-button mini v-if="item.type === 2" @click.native.stop="showPop(item.id);checkData = item">处理</x-button>
                    </td>
                </tr>
               
            </tbody>
        </x-table>
        <no-data v-else></no-data>
        <!-- <div class="check-all">
            <div>
                <check-icon :value.sync="allCheck"> </check-icon>
                <span>全选</span>
            </div>
           
            <div class="text-right btn">
                <div class="num">
                    <span>处理：</span>
                    <span>3000g</span>
                </div>
                <x-button mini >处理</x-button>
            </div>
        </div> -->
        <div v-transfer-dom class="one-pop">
            <popup v-model="show1" >
                <div class="popup0">
                    <p class="title">选择卖出方向</p>
                    <div class="option-1" @click.stop="sellClick(1)">商城统一收购</div>
                    <div class="option-2" @click.stop="show1 = false;show2 = true">卖给其他植友</div>
                    <div class="option-2" @click.stop="show1 = false;show2 = true">自留/送朋友</div>
                </div>
            </popup>
        </div>
        <div v-transfer-dom class="two-pop">
            <popup v-model="show2">
                <div class="popup0">
                    <div class="info">
                        <p class="title">卖给植友</p>
                        <p>品种：{{checkData.name}}</p>
                        <p>采摘时间：{{checkData.modifiedTime}}</p>
                        <p>种植时长：30天</p>
                        <div>重量：<input class="input" type="number" v-model="sellWeight" placeholder="请输入重量"></div>
                        <div>定价：<input class="input" type="number" v-model="sellPrice" placeholder="请输入定价"></div>
                        
                    </div>
                    <div class="bottom">
                        <div @click.stop="show2 = false">取消</div>
                        <div class="confirm" @click.stop="sellClick(2);">确定</div>
                    </div>
                </div>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem, XTable, XButton, Group, Popup, TransferDom, InlineXNumber, CheckIcon } from 'vux'
    import noData from '@/components/nodata.vue'
    import api from '@/api'
    export default{
        data (){
            return{
                show1:false,
                show2:false,
                listData:[],
                fruitId:null, 
                sellPrice:0,        ///卖给植友-价格
                sellWeight:0,         //卖给植友 -重量
                allCheck:false,
                checkData:{} 
            }
        },
        directives: {
            TransferDom
        },
        components:{ Tab, TabItem, XTable, XButton,Group, Popup, InlineXNumber, CheckIcon, noData },
        methods:{
            onItemClick (){

            },
            showPop (id){
                this.show1 = !this.show1;
                this.fruitId = id;
            },
            sellClick (type){
                if(!this.fruitId){
                    return
                }
                let _this = this;
                if(!this.sellWeight && type === 2){
                    return this.showTips('请输入重量')
                }else if(!this.sellPrice && type === 2){
                    return this.showTips('请输入定价')
                }
                api.setDoFruit({
                    button:type,
                    id:_this.fruitId,
                    price:_this.sellPrice,
                    weight:_this.sellWeight
                }).then(data =>{
                    _this.showTips('操作成功');
                    _this.listData = [];
                    _this.getMyFruit()

                }).catch(e =>{})
            },
            getMyFruit (){
                let _this = this;
                api.getMyFruit().then(data =>{
                    if(data){
                        data.forEach(item => {
                            item.isCheck = false;
                        });
                        _this.listData = data;
                    }
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
                }
            },
            setBtnText (type){
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
                }
            }
        },
        watch:{
            allCheck (oldVal,newVal){
                this.listData.forEach(item => {
                    item.isCheck = oldVal
                });
            }
        },
        created() {
            this.getMyFruit()
        },
    }
</script>
<style lang="less">
    .fruiter{
        min-height: 100vh;
        background-color: #f3f3f3;
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
        .check-all{
            display: flex;
            width: 100%;
            line-height: 55px;
            background-color: #fff;
            position: fixed;
            bottom: 0;
            left: 0;
            align-items: center;
            padding: 0 13px;
            box-sizing: border-box;
            >div{
               
            }
            >div.btn{
                flex: 1;
               .num{
                   display: inline-block;
                   span:nth-child(2){
                       color: #f72525;
                   }
               }
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
