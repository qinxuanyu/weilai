<template>
    <div class="sertice">
        <img src="/src/assets/images/my/contact1@2x.png" data-clipboard-target="#foo1" class="btn" alt="">
        <img src="/src/assets/images/my/contact2@2x.png" data-clipboard-target="#foo2" class="btn" alt="">
        <img src="/src/assets/images/my/contact3@2x.png" data-clipboard-target="#foo3" class="btn" alt="">
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

            }
        },
        methods:{

        },
        created() {
            let _this = this;
            var _clipboard = new clipboard('.btn');
            _clipboard.on('success', function(e) {
                _this.showTips('复制成功')

                e.clearSelection();
            });
        },
    }
</script>

<style lang="less" scoped>
    .sertice{
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        justify-content: space-around;
        img{
            width: 200px;
        }
        input{
            opacity: 0;
        }
    }
</style>
