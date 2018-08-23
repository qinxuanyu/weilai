<template>
    <div  class="order-details">
        <div class="status">
            <span>代收款</span>
            <img src="src/assets/images/ind_obligation@2x.png" alt="">
        </div>
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
                <div class="num">
                   <p><span>￥120.0</span>x1</p>
                   <x-button mini plain >取消订单</x-button>
                </div>
            </div>
        </div>
        <group>
            <cell title="运费" value="-￥10.0" ></cell>
            <cell title="优惠券" value="-￥10.0" ></cell>
            <cell title="实付款（含运费）" value="-￥10.0" ></cell>
        </group>
       
        <div class="line"></div>
         <div class="time">
             <p>订单编号：</p>
             <p>创建时间：</p>
             <p>成立时间：2018823</p>
         </div>
        <div class="bottom-btn">
            <x-button mini plain>查看物流</x-button>
            <x-button mini >确认收货</x-button>
        </div>
    </div>
</template>
<script>
    import { Cell, Group, XNumber, Radio, XInput, XButton } from 'vux'
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
            Cell, Group, XNumber , Radio, XInput, XButton
        },
        methods:{
            change (){

            }
        }
    }
</script>
<style lang="less" >
    .order-details{
        .status{
            height: 85px;
            background: linear-gradient(left top,rgb(154, 217, 76),rgb(99, 168, 14));
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 30px;
            img{
                width: 42px;
            }
            span{
                font-size: 20px;
                color: #fff;
            }
        }
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
                .num{
                    display: flex;
                    justify-content: space-between;
                    p{
                        span{
                            color: #f11010;
                            font-size: 16px;
                        }
                    }
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
            justify-content: flex-end;
            align-items: center;
            button{
                margin: 0;
                margin-right: 10px;
                box-sizing: border-box;
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
        .time{
            line-height: 30px;
            color: #999999;
            padding: 0 20px;
        }
    }
</style>
