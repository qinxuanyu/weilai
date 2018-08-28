<template>
    <div class="evaluate">
        <div class="grade">
            <span>描述相符</span><rater v-model="data3" active-color="#f4c60f"></rater>
        </div>
        <div class="grade">
            <span>物流服务</span><rater v-model="data3" active-color="#f4c60f"></rater>
        </div>
        <x-textarea :cols="30" :rows="5" placeholder="你的评价能帮助其他小伙伴哟"></x-textarea>
        <x-button>发表评论</x-button>
    </div>
</template>
<script>
    import { Rater, XTextarea, Group, XButton } from 'vux'
    export default{
        data (){
            return{
                data3:3
            }
        },
        components:{ Rater, XTextarea, Group, XButton }
    }
</script>
<style lang="less">
    .evaluate{
        padding-top: 20px;
        .grade{
            text-align: center;
            span{
                margin-right: 23px;
            }
        }
       
        button{
            margin-top: 33px;
            width: 80% !important;
        }
        .weui-cell:before{
            border-top: 0;
            height: 0;
        }
        textarea{
            border: 1px solid #dbdbdb;
        }
    }
</style>
