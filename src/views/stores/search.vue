<template>
    <div class="search">
        <search  placeholder="输入你想搜索的商品" :auto-fixed="false" ></search>
        <div class="history">
            <div class="clear">
                <p class="f-16">最近搜索</p>
                <span>清除</span>
            </div>
            <ul class="view">
                <li>车厘子</li>
                <li>树苗</li>
                <li>阿萨德撒大</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { Search } from 'vux';
    export default{
        data (){
            return {

            }
        },
        components:{ Search }
    }
</script>
<style lang="less" scoped>
    .search{
        .history{
            padding: 16px;
            .clear{
                display: flex;
                justify-content: space-between;
                span{
                   color: #777  
                }
            }
            .view{
                display: flex;
                justify-content: flex-start;
                margin-top: 21px;
                li{
                    padding: 9px 20px;
                    color: #777;
                    background-color: #f2f2f2;
                    border-radius: 3px;
                    margin-right: 8px;
                }
            }
        }
    }
</style>
