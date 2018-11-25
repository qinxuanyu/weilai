<template>
    <div class="record-list">
        <div class="item">
            <div class="top">
                <div class="time">{{time}}</div>
                <div class="type">{{type}}</div>
            </div>
            <p class="content">{{content}}</p>
        </div>
    </div>
</template>
<script>
    export default {
        props:{
            time:String,
            type:String,
            content:String
        }
    }
</script>
<style lang="less" scoped>
    .record-list{
        .item{
            padding: 10px 15px;
            border-bottom: 1px solid #f3f3f3;
            .top{
                display: flex;
                justify-content: space-between;
                .type{
                    color: red;
                }
            }
            .content{
                font-size: 16px;
            }
        }
    }
</style>
