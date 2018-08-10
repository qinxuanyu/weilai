<template>
    <div id="bottom-tab" :style="{'background-color':bgColor,'color':textColor}">
        <div>
            <img src="" alt="">
            <p>首页</p>
        </div>
        <div>
            <img src="" alt="">
            <p>商城</p>
        </div>
        <div>
            <img src="" alt="">
            <p>购物车</p>
        </div>
        <div>
            <img src="" alt="">
            <p>我的</p>
        </div>
    </div>
</template>
<script>
    export default{
        name:"bottomTab",
        props:['bgColor','textColor'],
        data (){
            return {

            }
        }
    }
</script>
<style lang="less" scoped>
    #bottom-tab{
        text-align: center;
        display: flex;
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        >div{
            width: 25%;
        }
        img{
            display: block
        }
    }
</style>
