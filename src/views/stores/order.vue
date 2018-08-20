<template>
    <div  class="order">
        <div class="site">
            <div class="icon">
                <img src="src/assets/images/mer_site@2x.png" alt="">
            </div>
            <group class="select">
                <cell title="小太阳  13020120102" value="" is-link inline-desc="广东省十大建设卡死了激发巅峰对决"></cell>
            </group>
        </div>
        <div class="goods">
            <div class="left">
                <img src="http://img5.imgtn.bdimg.com/it/u=4101850099,151997626&fm=27&gp=0.jpg" alt="">
            </div>
            <div class="right">
                <p>黑珍珠车厘子  新鲜水果大樱桃  1kg</p>
                <p>规格：1000g</p>
                <div>
                    <group>
                        <x-number title="￥100" v-model="changeValue" :min="1" width="30px" @on-change="change"  ></x-number>
                    </group>
                </div>
            </div>
        </div>
        <group>
            <cell title="优惠券" value="-￥10.0" is-link></cell>
        </group>
        <div>
            <group >
                <x-input title="留言" placeholder="请输入您想说的话" novalidate  :show-clear="false" @on-blur="onBlur" placeholder-align="left"></x-input>
            </group>
        </div>
        <div class="line"></div>
        <div class="pay">
            <group title="请选择支付方式">
                <radio :options="payList"  value="1">
                    
                </radio>
            </group>
        </div>
        <div class="bottom-btn">
            <div class="total">总价：<span>￥89.6</span></div>
            <div class="num">共1件商品</div>
            <div class="btn">提交订单</div>
        </div>
    </div>
</template>
<script>
    import { Cell, Group, XNumber, Radio, XInput } from 'vux'
    export default{
        data () {
            return{
                changeValue:1,
                payList: [{
                    value:'微信支付',
                    icon:'src/assets/images/mer_WeChat@2x.png',
                    key: '1',
                },{
                    value: '支付宝支付',
                    icon:'src/assets/images/mer_alipay@2x.png',
                    key: '2',
                } ],
                color:'#60a609'
            }
        },
        components:{
            Cell, Group, XNumber , Radio, XInput
        },
        methods:{
            change (){

            }
        }
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
                img{
                    width: 100%
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
            }
            
        }
        .weui-cells{
            font-size: 14px;
            margin-top: 0;
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
                flex: 1;
            }
            .total{
                color: #999999;
                padding-left: 15px;
                span{
                    color: #f11010;
                    font-size:16px;
                }
            }
            .num{
                padding-right: 12px;
                text-align: right;        
            }
            .btn{
                font-size: 16px;
                text-align: center;
                background: #60a609;
                color: #fff;
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
    }
</style>
