<template>
    <div class="authentication">
        <group>
            <x-input title="真实姓名" placeholder="请输入真实姓名" v-model="realName"></x-input>
            <x-input title="身份证号"  placeholder="请输入18位身份证号" v-model="idCard"></x-input>
            <x-button @click.native.stop="sureRealName">保存</x-button>
        </group>
    </div>
</template>
<script>
    import { XInput, XButton } from 'vux'
    import tool from '@/utils/tool'
    import api from "@/api"
    export default{
        data (){
            return{
                idCard:'',
                realName:''
            }
        },
        components:{ XInput, XButton },
        methods:{

            sureRealName (){
                let _this = this;
                if(!this.realName){
                    return this.showTips('请输入真实姓名')
                }else if(!this.idCard){
                    return this.showTips('请输入身份证号码')
                }else if(!tool.utils.isidCard(this.idCard)){
                    return this.showTips('请输入正确的身份证号码')
                }
                api.sureRealName({
                   idCard:this.idCard,
                   realName:this.realName
                }).then(data =>{
                    _this.showTips('提交成功');
                    history.go(-1)
                }).catch(e =>{})
            }
        }
    }
</script>
<style lang="less" scoped>
    .authentication{
        button{
            width: 80%;
            font-size: 16px;
            margin-top: 50px;
        }
    }
</style>
