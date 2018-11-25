<template>
    <div class="code">
        <div class="content">
            <p>请您复制下列激活码</p>
            <input type="text" id="foo" v-model="code">
        </div>
        <x-button data-clipboard-target="#foo" class="btn" :disabled="btnDis">点击复制激活码</x-button>
        <x-button type="primary" link="/app">APP下载</x-button>
    </div>
</template>
<script>
    import { XButton } from 'vux'
    import api from '@/api'
    import clipboard from 'clipboard'
    export default {
        data (){
            return{
                code:'',
                btnDis:false
            }
        },
        components: {
            XButton
        },
        methods:{
            getCode (){
                let _this = this;
                api.getMyCode().then(data =>{
                    _this.code = data || '未获得激活码';
                    _this.btnDis = false;
                }).catch(e =>{
                    _this.code =  '未获得激活码';
                    _this.btnDis = true;
                })
            }
        },
        created() {
            this.getCode()
        },
        mounted() {
            let _this = this;
            // if(!this.btnDis)
            var _clipboard = new clipboard('.btn');
            _clipboard.on('success', function(e) {
                _this.showTips('复制成功')

                e.clearSelection();
            });
        },
    }
</script>
<style lang="less" scoped>
    .code{
        text-align: center;
        min-height: 100vh;
        background-color: #efefef;
        padding: 10px;
        .content{
            height: 162px;
            background-color: #fff;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-size: 18px;
            margin-bottom: 20px;
            input{
                border: 0;
                font-size: 16px;
                color: #e95701;
                text-align: center;
            }
        }
        button{
            // width: 80%;
            font-size: 18px;
            text-align: center;
            margin-top: 15px;
            background-color: #e95701 !important;
            margin-top: 26px;
        }
        >button:nth-child(2){
            margin-top: 50px;
        }
    }
</style>
