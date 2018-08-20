<template>
    <div class="order-info">
        <flow>
            <flow-state state="√" title="已拍下" is-done></flow-state>
            <flow-line is-done></flow-line>

            <flow-state state="√" is-done>
                <span slot="title">已付款</span>
            </flow-state>
            <flow-line ></flow-line>

            <flow-state state="√" title="已发货"></flow-state>
            <flow-line></flow-line>

            <flow-state state="√" title="待收货"></flow-state>
            <flow-line></flow-line>

            <flow-state state="√" title="完成"></flow-state>
        </flow>
        <div class="con">
            <h4>物流记录</h4>
            <group>
                <cell title="查看物流信息" link="https://vux.li" ></cell>
            </group>
            <div class="time">
                <p>
                    <span>订单编号：</span>
                    <span>2018072212345</span>
                </p>
                <p>
                    <span>交易时间：</span>
                    <span>2018-07-22</span>
                </p>
                <p>
                    <span>发货时间：</span>
                    <span>2018-07-22</span>
                </p>
            </div>
            <div class="num">
                <p>
                    <span>赚取金额：</span>
                    <span>￥120.0</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import { Flow, FlowState, FlowLine, Group, Cell } from 'vux'
    export default{
        data (){
            return{

            }
        },
        components: {
            Flow,
            FlowState,
            FlowLine, Group, Cell
        }
    }
</script>
<style lang="less">
    .order-info{
        .weui-wepay-flow{
            padding: 20px;
        }
        .weui-wepay-flow__li{
            width: 24px !important;
            height: 24px !important;
        }
        .weui-wepay-flow__state{
            width: 24px !important;
            height: 24px !important;
            line-height: 24px !important;
            border-radius: 50% !important;
        }
        .weui-wepay-flow__li_done{
           
            .weui-wepay-flow__state{
                background-color: #60a609 !important;
            }
            
        }
        .weui-wepay-flow__line_done{
            .weui-wepay-flow__process{
                background-color: #60a609 !important;
            }
        }
        .weui-wepay-flow__title-bottom{
            top: 40px;
        }
        .con{
            h4{
                font-size: 20px;
                color: #fdb509;
                text-align: center;
            }
            padding: 26px 0px 0 26px;
            .time{
                padding-top: 18px;
                border-bottom: 1px solid #f3f3f3;
                p{
                    margin-bottom: 18px;
                    span:nth-child(2){
                        color: #999999;
                    }
                }
            }
            .num{
                padding-top: 18px;
                p{
                    span:nth-child(2){
                        font-size: 16px;
                        color: #f11010;
                    }
                }
            }
        }
    }
    
</style>
