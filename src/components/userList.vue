<template>
    <div class="user-list">
        <div class="item">
            <div class="avatar">
                <img :src="url" alt="">
            </div>
            <div class="right">
                <p class="name">{{name}}</p>
                <p>ID:{{id}}</p>
                <p class="text-right">{{time}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            url:String,
            name:String,
            id:String,
            time:String
        }
    }
</script>
<style lang="less" scoped>
    .user-list{
        .item{
            padding: 10px;
            border-bottom: 1px solid #f3f3f3;
            display: flex;
            .avatar{
                width: 60px;
                height: 60px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .right{
                flex: 1;
                padding-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
            }
        }
    }
</style>
