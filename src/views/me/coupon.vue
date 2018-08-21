<template>
    <div class="coupon">
        <tab custom-bar-width="50px" class="tab-top">
            <tab-item selected >支出</tab-item>
            <tab-item >收入</tab-item>
        </tab>
        <div class="list">
            <ul>
                <li>
                    <i></i>
                    <div class="center">
                        <p class="value">￥10</p>
                        <p>满199减10</p>
                    </div>
                    <div class="right">
                        <span>去购物</span>
                    </div>
                </li>
               
            </ul>
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem } from 'vux';
    export default{
        data (){
            return{

            }
        },
        components:{
            Tab, TabItem
        }
    }
</script>
<style lang="less" scoped>
    .coupon{
        .list{
            >ul{
                height: 100vh;
                padding: 13px 10px;
                background-color: #f3f3f3;
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
