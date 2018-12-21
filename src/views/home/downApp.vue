<template>
    <div class="down-app">

    </div>
</template>
<script>
    import api from '@/api';
    export default {
        data (){
            return{
                urlList:[]
            }
        },
        methods:{
            arouseApp (){
                var u = navigator.userAgent, app = navigator.appVersion;
                var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                if (isAndroid) {
                    //这个是安卓操作系统
                    // alert('安卓系统')
                    window.location.href= this.urlList[0].address;
                }
                if (isIOS) {
            // 　　　　//这个是ios操作系统
                    window.location.href =  this.urlList[1].address;
                }
            },
            getAppUrl (){
                api.downloadAddress().then((result) => {
                    console.log(result)
                    if(result){
                        
                        this.urlList = result;
                        this.arouseApp()
                    }else{
                        this.showTips('获取链接失败')
                    }
                }).catch((err) => {
                    
                });
            }
        },
        created() {
            // this.arouseApp()
            this.getAppUrl()
        },
    }
</script>
<style lang="less" scoped>
    
</style>
