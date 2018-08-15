<template>
    <div class="evaluate">
        <scroller>
            <div class="top">
                <img src="src/assets/images/com_goodreputation@2x.png" alt="">
                <div class="text">
                    <p><span>100%</span> 好评</p>
                    <p class="num">1121人好评</p>
                </div>
            </div>
            <div class="line"></div>
            <ul class="list">
                <li>
                    <div class="user">
                        <div class="avatar">
                            <img src="http://img5.imgtn.bdimg.com/it/u=4101850099,151997626&fm=27&gp=0.jpg" alt="">
                        </div>
                        <span>123456</span>
                    </div>
                    <div class="content">车厘子很新鲜，很甜。是在做活动的时候买的很划算，以后还会回购。</div>
                    <div class="time">
                        <span>2018-10-10</span>
                        <span>规格：标准（100g）</span>
                    </div>
                </li>
            </ul>
        </scroller>
    </div>
</template>
<script>
    export default{

    }
</script>
<style lang="less" scoped>
    .evaluate{
        .top{
            display: flex;
            justify-content: center;
            padding: 17px 0;
            img{
                width: 42px;
                height: 42px;
            }
            .text{
                span{
                    font-size: 18px;
                }
                .num{
                    font-size: 12px;
                    color: #999999;
                }
            }
        }
        .line{
            height: 8px;
            background-color: #f3f3f3;
        }
        .list{
            li{
                padding: 12px;
                font-size: 14px;
                border-bottom: 1px solid #f5f5f5;
                .user{
                    display: flex;
                    .avatar{
                        width: 27px;
                        height: 27px;
                        border-radius: 50%;
                        overflow: hidden;
                        margin-right: 8px;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                    >span{
                        color: #8f8f8f;
                    }
                }
                .content{
                    margin-top: 10px;
                    margin-bottom: 15px;
                }
                .time{
                    color: #8f8f8f;
                    margin-bottom: 12px;
                    
                }
            
            }
        }
    }
</style>
