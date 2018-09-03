<template>
    <div class="my-sale">
        <flexbox :gutter="0">
            <flexbox-item>
                <div class="flex-demo">
                    车厘子
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo">
                    1000g
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo">
                    ￥120.0
                </div>
            </flexbox-item>
            <flexbox-item>
                <div class="flex-demo">
                    <button>出售中</button>
                </div>
            </flexbox-item>
        </flexbox>
    </div>
</template>
<script>
    import { Flexbox, FlexboxItem, } from 'vux';
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[]
            }
        },
        components:{
            Flexbox, FlexboxItem
        },
        methods:{
            getMyFruit (){
                let _this = this;
                api.getMyFruit().then(data =>{
                    if(data){
                        _this.listData = data;
                    }
                }).catch(e =>{})
            }
        },
        created() {
            this.getMyFruit()
        },
    }
</script>
<style lang="less" scoped>
    .my-sale{
        line-height: 53px;
        background-color: #f3f3f3;
        .vux-flexbox {
            border-bottom: 1px solid #f3f3f3;
        }
        .flex-demo{
            text-align: center;
            background-color: #fff;
            word-wrap: normal;
            text-overflow: ellipsis;
            overflow: hidden;
            button{
                width: 75px;
                height: 28px;
                background: #60a609;
                border: 0;
                border-radius: 5px;
                color: #fff;
            }
        }
    }
</style>
