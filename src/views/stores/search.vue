<template>
    <div class="search">
        <search  placeholder="输入你想搜索的商品" :auto-fixed="false" v-model.trim="name" @on-submit="searchGoodsFun" ></search>
        <div class="history">
            <div class="clear">
                <p class="f-16">最近搜索</p>
                <span @click.stop="clearData">清除</span>
            </div>
            <ul class="view">
                <li v-for="(i,index) in searchHistoryArr" :key="index">{{i}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { Search } from 'vux';
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data (){
            return {
                name:'',
                searchHistoryArr:[]
            }
        },
        components:{ Search },
        methods:{
            searchGoodsFun (){
                let _this = this;
                if(!this.name){
                    return this.showTips('请输入要搜索的内容')
                }
                let searchHistory = tool.local.get('searchHistory') || '[]';
                searchHistory = JSON.parse(searchHistory);
                searchHistory.push(this.name);
                searchHistory = JSON.stringify(searchHistory);
                tool.local.set('searchHistory',searchHistory)
                this.updateSearch()
                this.$router.push('/store/search-list/'+this.name)
            },
            updateSearch (){
                let searchHistory = tool.local.get('searchHistory') || '[]';
                searchHistory = JSON.parse(searchHistory);
                this.searchHistoryArr = searchHistory;
            },
            clearData (){
                tool.local.clear('searchHistory');
                this.updateSearch()
            }
        },
        created() {
            this.updateSearch()
        },
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
