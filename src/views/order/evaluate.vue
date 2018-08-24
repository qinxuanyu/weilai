<template>
    <div class="evaluate">
        <div class="grade">
            <span>描述相符</span><rater v-model="data3"></rater>
        </div>
        <div class="grade">
            <span>物流服务</span><rater v-model="data3"></rater>
        </div>
        <group>
            <x-textarea placeholder="你的评价能帮助其他小伙伴哟"></x-textarea>
        </group>
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
<style lang="less" scoped>
    .evaluate{
        padding: 20px 23px;
        .grade{
            text-align: center;
            span{
                margin-right: 23px;
            }
        }
        textarea{
            border: 1px solid #dbdbdb;
        }
        button{
            margin-top: 33px;
        }
    }
</style>
