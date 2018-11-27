<template>
    <div class="sertice">
        <div class="img-box">
            <img src="/src/assets/images/my/contact1@2x.png" data-clipboard-target="#foo1" class="btn" alt="">
            <img src="/src/assets/images/my/contact2@2x.png" data-clipboard-target="#foo2" class="btn" alt="">
            <img src="/src/assets/images/my/contact3@2x.png" data-clipboard-target="#foo3" class="btn" alt="">
        </div>
        <div class="button-box">
            <button type="button"
            v-clipboard:copy="qqNum1"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"></button>
            <button type="button"
            v-clipboard:copy="qqNum2"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"></button>
            <button type="button"
            v-clipboard:copy="qqNum3"
            v-clipboard:success="onCopy"
            v-clipboard:error="onError"></button>
        </div>
        
        <input type="text" value="2815015609" id="foo1">
        <input type="text" value="3145048776" id="foo2">
        <input type="text" value="3066995759" id="foo3">
       
    </div>
</template>
<script>
    import clipboard from 'clipboard'
    export default {
        data (){
            return{
                qqNum1:2815015609,
                qqNum2:3145048776,
                qqNum3:3066995759
            }
        },
        methods:{
            onCopy(e){
                this.showTips('复制成功')
            },
            onError(){

            }
        },
        created() {
            
        },
        mounted() {
            let _this = this;
            var _clipboard = new clipboard('.btn');
            _clipboard.on('success', function(e) {
                console.log(1)
                _this.showTips('复制成功')

                e.clearSelection();
            })
            _clipboard.on('error', function(e) {
                console.error('Action:', e.action);
                console.error('Trigger:', e.trigger);
            });
        },
    }
</script>

<style lang="less" scoped>
    .sertice{
        position:relative;
        .img-box{
            width:100%;
            position:absolute;
            left:0;
            top:0;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            justify-content: space-around;
            img{
                width: 200px;
            }
        }
        .button-box{
            width:100%;
            position:absolute;
            left:0;
            top:0;
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            justify-content: space-around;
            z-index:10;

            button{
                width:200px;
                height:165px;
                opacity: 0;
            }
        }
        input{
            opacity: 0;
        }
    }
</style>
