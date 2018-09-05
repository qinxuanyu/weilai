<template>
    <div class="farm">
        <tab :line-width="2" custom-bar-width="50px">
            <tab-item  @on-item-click="$router.push('/me/fruiter')" >列表</tab-item>
            <tab-item selected @on-item-click="onItemClick">大图</tab-item>
        </tab>
        <ul>
            <li v-for="(item,index) in num" :key="index"></li>
           
        </ul>
        <div class="btn">
            一键操作
        </div>
    </div>
</template>
<script>
    import { Tab, TabItem, } from 'vux'
    import api from '@/api'
    export default{
        data (){
            return{
                num:0
            }
        },
        components:{ Tab, TabItem },
        methods:{
            getMyfruiter (){
                let _this = this;
                api.getMyfruiterNum().then(data =>{
                    if(data){
                        _this.num = data;
                    }
                }).catch(e =>{})
            }
        },
        created() {
            this.getMyfruiter()
        },
    }
</script>
<style lang="less" scoped>
    .farm{
        background: url(/src/assets/images/farm_bg.jpg);
        // background-repeat: no-repeat;
        background-position: center;
        background-size: 100%;
        min-height: 100vh;
        margin: 0px;
        padding: 0px;
        >ul{
            display: flex;
            flex-wrap: wrap;
            >li{
                margin-top: 10px;
                width: 33.3333%;
                height: 15vh;
                background: url(/src/assets/images/acarpous@2x.png) no-repeat;
                background-size: auto 100%;
                background-position: center;
            }
        }
        .btn{
            width: 60px;
            line-height: 60px;
            height: 60px;
            text-align: center;
            background-color: #fff;
            border-radius: 50%;
            color: #60a609;
            border: 1px solid #bdbdbd;
            position: fixed;
            left: 50%;
            bottom: 15px;
            margin-left: -30px;
        }
    }
</style>
