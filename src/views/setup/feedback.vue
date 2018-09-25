<template>
    <div class="feedback">
        <group title="问题描述">
            <x-textarea  placeholder="如果您对我们有什么建议、想法和期望，请告诉我们。" v-model="content"></x-textarea>
            <x-input title="手机号码" v-model="phone"></x-input>
            
        </group>
        <x-button @click.native.stop="postFeedback_fun">提交</x-button>
    </div>
</template>
<script>
    import { Group, XTextarea, XInput, XButton } from 'vux'
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
                content:'',
                phone:''
            }
        },
        components:{ Group, XTextarea, XInput, XButton },
        methods:{
            postFeedback_fun (){
                let _this = this;
                if(!this.content){
                    return this.showTips('请先填写反馈内容')
                }else if(!this.phone){
                    return this.showTips('请先填写手机号码')
                }
                else if(!tool.utils.isCNPhone(this.phone)){
                    return this.showTips('请填写正确的手机号码')
                }
                api.postFeedback({
                    content:_this.content,
                    phone:_this.phone
                }).then(data =>{
                    _this.showTips('提交成功，感谢您的反馈');
                    _this.content = '';
                    _this.phone = '';
                }).catch(e =>{})
            }
        }
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
            margin-top: 30px;
        }
    }
</style>
