<template>
    <div class="nodata">
        <div>
            <img src="src/assets/images/nodata.png" alt="">
            <p>暂无数据</p>
        </div>
    </div>
</template>
<script>
    export default{

    }
</script>
<style lang="less" scoped>
    .nodata{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #b8b8b8;
        text-align: center;
        img{
            width: 100px;
        }
    }
</style>
