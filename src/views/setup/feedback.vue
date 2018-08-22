<template>
    <div class="feedback">
        <group title="问题描述">
            <x-textarea  placeholder="如果您对我们有什么建议、想法和期望，请告诉我们。"></x-textarea>
            <x-input title="联系方式"></x-input>
            
        </group>
        <x-button >提交</x-button>
    </div>
</template>
<script>
    import { Group, XTextarea, XInput, XButton } from 'vux'
    export default{
        data (){
            return{

            }
        },
        components:{ Group, XTextarea, XInput, XButton }
    }
</script>
<style lang="less">
    .feedback{
        .weui-textarea{
            height: 150px;
            font-family: '微软雅黑'
        }
        button.weui-btn{
            width: 80%;
        }
    }
</style>
