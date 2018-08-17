<template>
    <div class="cart">
         <check-icon :value.sync="demo1">
             <div>
                 <div class="goods">
                    <div class="left">
                        <img src="http://img5.imgtn.bdimg.com/it/u=4101850099,151997626&fm=27&gp=0.jpg" alt="">
                    </div>
                    <div class="right">
                        <p>黑珍珠车厘子  新鲜水果大樱桃  1kg</p>
                        <p>规格：1000g</p>
                        <div>
                            <template>
                                 <group>
                                    <x-number title="￥100" v-model="changeValue" :min="1" width="30px"   ></x-number>
                                </group>
                            </template>
                        </div>
                    </div>
                </div>
             </div>
         </check-icon>
         <div class="bottom-btn">
             <flexbox :gutter="0" wrap="wrap">
                <flexbox-item class="left">
                    <div class="flex-demo">
                        <check-icon :value.sync="demo1">
                            共2件商品
                        </check-icon>
                    </div>
                </flexbox-item>
                <flexbox-item class="center text-right">
                    <div class="flex-demo">
                        <span>总价：</span>
                        <span>￥180.0</span>
                    </div>
                </flexbox-item>
                <flexbox-item class="right">
                    <div class="flex-demo">
                        <div class="btn">结算（2）</div>
                    </div>
                </flexbox-item>
            </flexbox>
         </div>
    </div>
</template>
<script>
    import { CheckIcon, Group, XNumber, Flexbox, FlexboxItem, XButton} from 'vux'
    export default{
        data (){
            return{
                demo1:false,
                changeValue:1,
                demo1:false
            }
        },
        components:{CheckIcon, XNumber, Group, Flexbox, FlexboxItem, XButton}
    }
</script>
<style lang="less" >
    .cart{
        .vux-check-icon{
            display: flex;
            align-items: center;
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
                    padding: 0;
                    font-size: 14px
                }
                .vux-number-input{
                    font-size: 14px;
                }
            }
             .vux-number-selector{
                font-size: 14px;
            }
        }
        .weui-cells:before {
            border-top: 0;
        }
        .weui-cells:after{
            border-bottom: 0;
        }
        .bottom-btn{
            width: 100%; 
            position: fixed;
            bottom: 50px;
            left: 0;
            border-top: 1px solid #dbdbdb;
            .right{
                .btn{
                    width: 100%;
                    height: 50px;
                    background-color: #60a609;
                    color: #fff;
                    text-align: center;
                    line-height: 50px;
                }
            }
            .center{
                padding-right: 10px;
                span:nth-child(1){
                    color: #999999;
                }
                span:nth-child(2){
                    font-size: 16px;
                    color: #f11010;
                }
            }
        }
    }
        
</style>
