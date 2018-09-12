<template>
    <div class="evaluate">
        <!-- <div class="grade">
            <span>描述相符</span><rater v-model="data3" active-color="#f4c60f"></rater>
        </div>
        <div class="grade">
            <span>物流服务</span><rater v-model="data3" active-color="#f4c60f"></rater>
        </div> -->
        <tabbar style="position:initial;background-color:#fff">
            <tabbar-item selected>
                <img slot="icon" src="src/assets/images/good@2x.png">
                <img slot="icon-active" src="src/assets/images/good_s@2x.png" alt="">
                <span slot="label">满意</span>
            </tabbar-item>
            <tabbar-item >
                <img slot="icon" src="src/assets/images/general@2x.png">
                <img slot="icon-active" src="src/assets/images/general_s@2x.png" alt="">
                <span slot="label">一般</span>
            </tabbar-item>
            <tabbar-item  >
                <img slot="icon" src="src/assets/images/negative@2x.png">
                <img slot="icon-active" src="src/assets/images/negative_s@2x.png" alt="">
                <span slot="label">不满意</span>
            </tabbar-item>
            
        </tabbar>
        <x-textarea :cols="30" :rows="5" placeholder="你的评价能帮助其他小伙伴哟"></x-textarea>
        <x-button>发表评论</x-button>
    </div>
</template>
<script>
    import { Rater, XTextarea, Group, XButton, Tabbar, TabbarItem, } from 'vux'
    export default{
        data (){
            return{
                data3:3,
                id:null
            }
        },
        components:{ Rater, XTextarea, Group, XButton, Tabbar, TabbarItem, },
        created() {
            let orderId = this.$route.params.orderId;
            this.id = orderId;
        },
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
            font-family: '微软雅黑';
            margin-top: 20px;
            border: 1px solid #dbdbdb;
        }
    }
</style>
