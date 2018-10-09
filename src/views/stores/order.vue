<template>
    <div  class="order">
        <div class="site" v-if="type == 4 || type == 7">
            <div class="icon" >
                <img src="src/assets/images/mer_site@2x.png" alt="">
            </div>
            <group class="select" v-if="goodsData.receiverName && goodsData.address && goodsData.receiverPhone">
                <cell :title="goodsData.receiverName + goodsData.receiverPhone" value="" is-link :inline-desc="goodsData.address" link="/me/site"></cell>
            </group>
            <group class="select" v-else>
                <cell title="添加收货地址" value="" is-link link="/me/add-site"></cell>
            </group>
        </div>
        <div class="goods">
            <div class="left">
                <img :src="goodsData.coverImage || 'http://120.77.173.162/cdn/f5d15b75-78a6-4f31-86e4-ffd73405750c.jpg'" alt="">
            </div>
            <div class="right">
                <p>{{goodsData.introduce }}</p>
                <p v-if="goodsData.weight">规格：{{goodsData.weight}}斤</p>
                <div v-if="!isIntegral  && (type == 5 || type == 4) && isPlatformGoods == 1">
                    <group>
                        <x-number :title="!isIntegral ? '￥' + goodsData.price : '积分：' + goodsData.price" v-model="goodsNum" :min="1" width="30px"   ></x-number>
                    </group>
                </div>
                <p v-else-if="type != 7">{{!isIntegral ? '￥' + goodsData.price : '积分：' + goodsData.price}}</p>
            </div>
        </div>
        <group v-if="!isIntegral">
            <cell v-if="type == 5" :title="'维护费1年（至'+setServicingTime+'）'" value="￥200"></cell>
         
            <popup-radio title="包装费" :options="packOption" v-model="selectPack.price" v-if="type == 4 || type == 7">
                <template slot-scope="props" slot="each-item"><!-- use scope="props" when vue < 2.5.0 -->
                    <p>
                        {{packageLis[props.index].introduce }}
                    <br>
                    <span style="color:#666;">￥{{packageLis[props.index].price }}/斤</span>
                    </p>
                </template>
            </popup-radio>
             <cell v-if="type == 7" title="快递费用" :value="'￥'+delivery"></cell>
            <cell title="优惠券" v-else-if="type != 7 && type != 2" :value="ticketData.price ? '-￥' + ticketData.price : '暂无可用优惠券' " is-link @click.native.stop="ticket_show = !ticket_show"></cell>
           
        </group>
        <div v-if="!isIntegral ">
            <group >
                <x-input title="留言" placeholder="请输入您想说的话" novalidate v-model="message"  :show-clear="false"  placeholder-align="left"></x-input>
            </group>
        </div>
        <div class="line"></div>
        <div class="pay" v-if="!isIntegral">
            <group title="请选择支付方式">
                <radio :options="payList"  v-model="payType">
                    
                </radio>
            </group>
        </div>
        <div id="alipayForm"></div>
        <div class="bargain" v-if="type == 5 || type == 2">
             <check-icon :value.sync="isSigningContract">同意签署 <span class="link" @click.stop="bargainLink">合同</span></check-icon>
        </div>
        <div class="bottom-btn">
            <div class="total">总价：<span>￥{{totalPrices.toFixed(2)}}</span></div>
            <div class="num">共{{goodsNum || 1}}件商品</div>
            <div class="btn" @click.stop="submitClick">提交订单</div>
        </div>
        <div v-transfer-dom class="ticket-pop">
            <popup v-model="ticket_show" >
                <group v-for="(item,index) in ticketList" :key="index" >
                    <cell :title="item.price + '元'"  :inline-desc="'满'+item.suitPrice+'元减'+item.price+'元'">
                        <x-button  mini plain type="primary" @click.native.stop="employTicketFun(item)" :disabled="usable_ticketList.indexOf(item.id) === -1">使用</x-button>
                    </cell>
                </group>
                
            </popup>
        </div>
       
        <div v-transfer-dom class="pack-pop">
            <popup v-model="packShow" >
                <group v-for="(item,index) in packageLis" :key="index">
                    <cell :title="item.price + '元'"  :inline-desc="item.introduce">
                        <x-button  mini plain type="primary" @click.native.stop="employTicketFun(item)">使用</x-button>
                    </cell>
                </group>
            </popup>
        </div>
    </div>
</template>
<script>
    import { Cell, Group, XNumber, Radio, XInput, Popup, TransferDom, XButton, PopupRadio, CheckIcon  } from 'vux'
    import api from '@/api'
    import order from '@/mixins/order'
    import tool from '@/utils/tool'
    export default{
        data () {
            return{
                payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: 1,
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: 2,
                }],
                isIntegral:null,      //是否为积分商品
                payType:1,
                color:'#60a609',
                goodsId:null,
                goodsData:{},
                goodsNum:null,
                ticket_show:false,
                ticketList:[],          //我的优惠券列表
                totalPrices_no:0,         //总价(未使用优惠券)
                usable_ticketList:[],       //可以使用的优惠券id列表
                usable_ticketData:[],       //可以使用的优惠券数据列表
                ticketData:{
                    price:0,
                    id:0,
                    suitPrice:0
                },               //正在使用的优惠券
                touch:0,
                message:'',                      //留言
                type:null,                   //2.果树 4果子 5树苗 
                packageLis:[],                 //包装费列表
                packShow:false,
                packOption:[],                     
                selectPack:{
                    price:10
                },                  //选中的包装
                isSigningContract:false,     //是否同意签署合同
                weight:null,              //规格、重量用于自留购买
                delivery:30,              //快递费用
                isPlatformGoods:null     //商品来源，1-商城 2-植友
            }
        },
        mixins:[order],
        directives: {
            TransferDom
        },
        components:{
            Cell, Group, XNumber , Radio, XInput, Popup, TransferDom, XButton, PopupRadio, CheckIcon 
        },
        methods:{
            bargainLink (){
                if(this.goodsData.isSureName){
                    this.$router.push('/store/bargain/'+this.goodsId+'/1')
                }else{
                    this.showTips('请先完善身份信息')
                    this.$router.push('/me/authentication')
                }
            },
            getOrderData (){
                let _this = this;
                if(this.type != 7){
                    api.getOrderData({
                        id:_this.goodsId
                    }).then(data =>{

                        _this.goodsData = data;
                        _this.goodsData.price = parseFloat(_this.goodsData.price).toFixed(2)
                        _this.getPackageListFun();
                    }).catch(e =>{
                        _this.showTips(e.data.msg);
                        history.go(-2)
                    })
                }else{
                    api.getSureOrder({
                        id:this.goodsId,
                        weight:this.weight
                    }).then(data =>{
                        _this.goodsData = data;
                        _this.goodsData.price = parseFloat(_this.goodsData.price).toFixed(2)
                        _this.getPackageListFun();

                    }).catch(e =>{
                        _this.showTips(e.data.msg);
                        history.go(-2)
                    })
                }
                
            }, 
            //获取我的优惠券
            getMyTicketListFun (){
                let _this = this;
                api.getMyTicketList({
                    status:false
                }).then(data =>{
                    _this.ticketList = data;
                }).catch(e =>{})
            },
            setUsable_ticketList (){
               
            },
            //使用优惠券
            employTicketFun (data){
                this.touch ++;
                this.ticketData = data;
                this.ticket_show = false;
                // console.log( this.ticketData)
            },
            //提交订单
            submitClick (){
                let _this = this;
                
                if(!this.isIntegral){
                    if(!this.goodsData.addressId && this.type == 4){
                       return this.showTips('请先选择地址')
                    }
                    if((this.type == 5 || this.type == 2) && !this.goodsData.isSureName){
                        this.showTips('请先完善身份信息')
                        this.$router.push('/me/authentication')
                        return
                    }else if((this.type == 5 || this.type == 2) && this.goodsData.isSureName && !this.isSigningContract){
                        this.showTips('请先同意签署合同');
                        return
                    }
                    if(this.type == 7){
                        this.ownFruit();
                        return
                    }
                    api.submitOrder({
                        addressId:_this.goodsData.addressId,
                        goodsId:_this.goodsData.goodsId,
                        message:_this.message,
                        num:_this.goodsNum,
                        ticketId:_this.ticketData.id || 0,
                        payType:_this.payType,
                        packageId:this.selectPack.id,
                        totalMoney:this.totalPrices,
                    }).then(data =>{
                        if(_this.payType == 3){
                            _this.showTips('购买成功');
                            _this.$router.push('/me/fruiter')
                            return
                        }
                        if(data){
                            if(_this.type == 4){
                                _this.payFun(data)

                            }else if(_this.type == 5 || _this.type == 2){
                                _this.payTreeFun(data)
                            }
                        }else{
                            _this.showTips('订单id错误')
                        }
                    }).catch(e =>{
                         _this.showTips(e.data.msg)
                        if(e.code == 1011){
                            _this.showTips('钱包余额不足')
                        }
                    })
                }else{
                    if(!this.goodsData.addressId){
                       return this.showTips('请先选择地址')
                    }
                    api.submitPoint({
                        addressId:_this.goodsData.addressId,
                        goodsId:this.goodsData.goodsId,
                    }).then(data =>{
                        _this.showTips('兑换成功');
                        _this.$router.push('/order/order-inform/2')
                    }).catch(e =>{
                        // console.log(e)
                        _this.showTips(e.data.msg);
                    })
                }
                

            },
            //自留水果下单
            ownFruit (){
                let _this = this;
                api.ziSubmitOrder({
                    addressId:this.goodsData.addressId,
                    goodsId:this.goodsData.goodsId,
                    message:this.message,
                    num:this.weight,
                    packageId:this.selectPack.id,
                    totalMoney:this.totalPrices,
                }).then(data =>{
                    _this.payFun(data)
                }).catch(e =>{})
            },
            //支付水果
            payFun (id){
                let _this = this;
                api.wxPAy({
                    orderId:id,
                    total_fee:this.totalPrices,
                    type:_this.payType
                }).then(data =>{
                    if(data){
                        if(_this.payType == 1){
                            _this.wxConfirmFun(data)
                        }else if(_this.payType == 2){
                            _this.alipayPay(data)
                        }
                       
                    }else{
                        _this.showTips('参数错误')
                    }
                }).catch(e =>{})
            },
            //支付果树、树苗
            payTreeFun (id){
                let _this = this;
                api.payTree({
                    orderId:id,
                    total_fee:this.totalPrices,
                    type:_this.payType
                }).then(data =>{
                    if(data){
                        if(_this.payType == 1){
                            _this.wxConfirmFun(data)
                        }else if(_this.payType == 2){
                            _this.alipayPay(data)
                        }
                    }else{
                        _this.showTips('参数错误')
                    }
                }).catch(e =>{})
            },
            //包装费列表
            getPackageListFun (){
                let _this = this;
                api.getPackageList().then(data =>{
                    _this.packageLis = data;
                    if(_this.type != 7){
                         data.forEach(item => {
                            let obj = {};
                            obj.key = item.price;
                            obj.value = item.price * this.goodsData.weight * parseInt(this.goodsNum) +'元';
                            _this.packOption.push(obj);
                            console.log(item.price,this.goodsData.weight,this.goodsNum)
                        });
                    }else{
                         data.forEach(item => {
                            let obj = {};
                            obj.key = item.price;
                            obj.value = item.price * this.weight +'元';
                            _this.packOption.push(obj);
                            
                        });
                    }
                   
                    if(data.length){
                        _this.selectPack = data[0]
                        // console.log(_this.selectPack)
                    }
                }).catch(e =>{})
            }
        },
        computed:{
            totalPrices (){
                this.totalPrices_no = this.goodsNum * this.goodsData.price;
                let _this = this;
                this.usable_ticketList = [];
                this.usable_ticketData = [];
               if(this.type != 7){   
                    this.ticketList.forEach(item => {        //判断优惠券是否可用
                    if(item.suitPrice <= _this.totalPrices_no){
                            this.usable_ticketList.push(item.id);
                            this.usable_ticketData.push(item);
                        }
                    });
                 
                
                    this.usable_ticketData.sort(function(a,b){
                        return a.price - b.price
                    })
                    let $length = this.usable_ticketData.length;
                    //树苗价格 --需加上维护费
                    // this.ticketData.price = 0;
                    if(this.type == 5 && $length){
                        if(this.touch === 0){
                           
                            this.ticketData = this.usable_ticketData[$length - 1];
                            
                        }
                        let ticketNum = !this.isIntegral ? this.ticketData.price : 0;
                        return  (this.goodsNum * this.goodsData.price) - ticketNum + (200 * this.goodsNum) 
                    }else if(this.type == 5 && !$length){
                        return  (this.goodsNum * this.goodsData.price) + (200 * this.goodsNum) 
                    }
                    //果子购买 多加包装费
                    if(this.type == 4 && $length){
                        if(this.touch === 0){
                            this.ticketData = this.usable_ticketData[$length - 1];
                        }
                        let ticketNum = !this.isIntegral ? this.ticketData.price : 0;
                        return  (this.goodsNum * this.goodsData.price) - ticketNum + (this.selectPack.price * parseInt(this.goodsNum) * this.goodsData.weight)
                    }else if(this.type == 4 && !$length){
                        return  (this.goodsNum * this.goodsData.price) +  (this.selectPack.price * parseInt(this.goodsNum) * this.goodsData.weight)
                    }
                    if(this.type == 2){
                         return (this.goodsNum * this.goodsData.price) 
                    }
                    //else
                    if($length){
                        if(this.touch === 0){
                            this.ticketData = this.usable_ticketData[$length - 1];
                        }
                        let ticketNum = !this.isIntegral ? this.ticketData.price : 0;
                        
                        return  (this.goodsNum * this.goodsData.price) - ticketNum
                    }
                    
                    return (this.goodsNum * this.goodsData.price) 
               }else{
                   return this.delivery + (this.selectPack.price * parseInt(this.weight))
               }
                
                // if(this.goodsNum && this.goodsData.price){
                //     return
                //     this.goodsNum * this.goodsData.price
                // }
            },
            setServicingTime (){
                if(this.type == 5){
                    let unm =tool.utils.getDateByDaysApart(new Date(),365)
                    return tool.utils.formatDate(unm,'yyyy-MM-dd')
                    // return 
                }else{
                    return 0
                }
            },
            
        },
        watch:{
            goodsNum (){
                let _this = this;
                this.packOption = []
                this.packageLis.forEach(item => {
                    let obj = {};
                    obj.key = item.price;
                    obj.value = item.price * this.goodsData.weight * parseInt(this.goodsNum) +'元';
                    _this.packOption.push(obj);
                    
                });
            }
        },
        created() {
            let id = this.$route.params.id;
            this.goodsId = id;
            let num = this.$route.query.num;
            let type = this.$route.params.type;
            let isIntegral = this.$route.query.type;
            this.type = type;
            this.weight = this.$route.query.weight;
            this.isPlatformGoods = tool.local.get('isPlatformGoods')
            if(!num && type != 7){
                this.showTips('数量参数错误');
                history.go(-1)
            }
            if(isIntegral){
                this.isIntegral = isIntegral;
            }else{
                this.getMyTicketListFun()
            }
            this.goodsNum = parseInt(num);
            this.getOrderData();
            
            if(type == 5 || type == 2){
                this.payList.push({
                    value:'钱包支付',
                    icon:'src/assets/images/mer_wallet@2x.png',
                    key: 3,
                })
            }
        },
    }
</script>
<style lang="less" >
    .order{
        .site{
            display: flex;
            align-items: center; 
            .icon{
                width: 52px;
                position: relative;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 20px;
                    display: block;
                    margin: auto;
                }
            }
            .select{
                flex: 1;
                font-size: 14px;
                .vux-label{
                    font-size: 14px;
                }
                .weui-cells{
                    margin-top: 0;
                }
                .weui-cells:before{
                    height: 0 !important;
                    border-top: 0;
                }
                .weui-cells:after{
                    height: 0 !important;
                    border-bottom: 0;
                }
            }
        }
        .goods{
            display: flex;
            padding: 12px;
            .left{
                width: 100px;
                height: 95px;
                overflow: hidden;
                text-align: center;
                img{
                    // width: 100%;
                    height: 100%;
                }
            }
            .right{
                flex: 1;
                padding-left: 8px;
                .weui-cell{
                    font-size: 14px
                }
                .vux-number-input{
                    font-size: 14px;
                }
                .weui-cells:before{
                    height: 0;
                    border-top: 0;
                }
            }
            
        }
        .weui-cells{
            font-size: 14px;
            margin-top: 0;
        }
        .bargain{
            position: fixed;
            bottom: 50px;
            left: 0;
            line-height: 45px;
            .link{
                color: #60a609;
            }
        }
        .bottom-btn{
            position: fixed;
            width: 100%;
            height: 50px;
            line-height: 50px;
            left: 0;
            bottom: 0; 
            display: flex;
            border-top: 1px solid #bdbdbd;
            >div{
                
            }
            .total{
                color: #999999;
                padding-left: 15px;
                flex: auto;
                span{
                    color: #f11010;
                    font-size:16px;
                }
            }
            .num{
                padding-right: 12px;
                text-align: right;   
                // flex: 1;     
                width: 66px;
            }
            .btn{
                width: 105px;
                font-size: 16px;
                text-align: center;
                background: #60a609;
                color: #fff;
            }
        }
        .weui-cells:before {
            // border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
    }
</style>
