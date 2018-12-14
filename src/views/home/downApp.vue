<template>
    <div class="down-app">

    </div>
</template>
<script>
    export default {
        methods:{
            arouseApp (){
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    //这个是安卓操作系统
                    // alert('安卓系统')
                    window.location.href= "http://app.3k832.cn/efn"
                }
                if (isIOS) {
            　　　　//这个是ios操作系统
                    window.location.href = 'http://app.3k832.cn/efn'
                }
            }
        },
        created() {
            this.arouseApp()
        },
    }
</script>
<style lang="less" scoped>
    
</style>
