<template>
    <div class="integral">
          <scroller>
            <div class="top">
                <div class="name">
                    <div class="avatar">
                        <img src="src/assets/images/com_goodreputation@2x.png" alt="">
                    </div>
                    <router-link to="">积分明细</router-link>
                </div>
                <div class="num">
                    <img src="src/assets/images/ind_integral@2x.png" alt="">
                    <p>4230</p>
                </div>
            </div>
            <ul class="list">
                <li>
                    <div class="img">
                        <img src="src/assets/images/ho_banner1@2x.png" alt="">
                    </div>
                    <div class="title">
                        <p>下按时打卡了而空间就能给你看看到你发是 是份</p>
                        <div class="btn">
                            <span>4000积分</span>
                            <x-button mini>立即兑换</x-button>
                        </div>
                    </div>
                </li>
                <li></li>
                <li></li>
            </ul>
        </scroller>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    export default{
        data (){
            return{

            }
        },
        components:{ XButton },
        methods:{

        },
        mounted() {
           

        },
    }
</script>
<style lang="less" scoped>
    .integral{
        .top{
            height: 130px;
            background-color: #2f2b28;
            position: relative;
            .name{
                display: flex;
                padding: 14px;
                justify-content: space-between;
                align-items: center;
                .avatar{
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                }
                >a{
                    color: #fff;
                }
            }
            .num{
                position: absolute;
                left: 50%;
                top: 35px;
                margin-left: -31px;
                img{
                    width: 62px;
                }
                p{
                    font-size: 24px;
                    color: #a88c18;
                }
            }
        }
        .list{
            li{
                display: flex;
                padding: 10px;
                .img{
                    width: 125px;
                    height: 108px;
                    overflow: hidden;
                    img{
                        width: 100%;
                    }
                }
                .title{
                    flex: 1;
                    padding-left: 12px;
                    .btn{
                        display: flex;
                        font-size: 16px;
                        margin-top: 32px;
                        span{
                            // color: #v
                        }
                        button{
                            font-size: 14px;
                            background-color: #60a609;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
</style>
