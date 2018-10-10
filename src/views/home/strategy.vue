<template>
    <div class="strategy">
        <div class="text">
            <span v-for="(item,index) in listData" :key="index">{{item.introduce}}￥{{item.price}}</span>
            ，维护费每课每年
            200元，正常情况下第三年
            开始挂果，一般初次结果量很少。
            以后每年产量逐渐增加，到第四
            年以后进入旺产期。旺产期大树
            每棵结果60-90斤之间，您可以选
            择收回果实，或按统一收购价卖
            给平台，或卖给平台其他植友。
        </div>
    </div>
</template>
<script>
    import api from '@/api'
    export default{
        data (){
            return {
                listData:[]
            }
        },
        methods:{
            getListData (){
                let _this = this;
                api.goodsList({
                    page:0,
                    size:10,
                    type:5,
                    order:1,
                    from:1,
                }).then(data =>{
                    // console.log('加载')
                    _this.listData = data;
                  
                }).catch(error =>{})
            }
        },
        created() {
            this.getListData()
        },
    }
</script>
<style lang="less" scoped>
    .strategy{
        background: url(/src/assets/images/strategy_bg.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100vh;
        margin: 0px;
        padding: 0px;
        position: relative;
        .text{
            width: 70%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%,-50%);
            margin: auto;
            font-family: 'GBJenLei-Medium';
            font-size: 18px;
            color: #60a609;
            text-shadow:1px 1px 1px #60a609;
        }
    }
</style>
