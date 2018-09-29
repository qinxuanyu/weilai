<template>
    <div >
        <div class="icon">
            <img src="src/assets/images/mer_alipay@2x.png" alt="">
        </div>
        <p>成功支付{{total_amount}}元，返回公众号查看吧！</p>
        <x-button @click.native.stop="testApp('weixin://')">返回微信</x-button>
    </div>
</template>
<script>
    import { XButton } from 'vux';
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
                total_amount:0
            }
        },
        components:{XButton},
        methods:{
          
                 testApp(url) { 
                    var u = navigator.userAgent, app = navigator.appVersion;
                    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
                    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
                    if (isAndroid) {
                        //这个是安卓操作系统
                        // alert('安卓系统')
                        var timeout, t = 1000, hasApp = true; 
                        setTimeout(function () { 
                            if (!hasApp) { 
                                //没有安装微信
                                var r=confirm("您没有安装微信，请先安装微信!");
                                if (r==true){
                                    location.href="http://weixin.qq.com/"
                                }
                            }else{
                                //安装微信
                            }
                            document.body.removeChild(ifr); 
                        }, 2000) 
                        
                        var t1 = Date.now(); 
                        var ifr = document.createElement("iframe"); 
                        ifr.setAttribute('src', url); 
                        ifr.setAttribute('style', 'display:none'); 
                        document.body.appendChild(ifr); 
                        timeout = setTimeout(function () { 
                            var t2 = Date.now(); 
                            if (!t1 || t2 - t1 < t + 100) { 
                                hasApp = false; 
                            } 
                        }, t); 
                    }
                    if (isIOS) {
                　　　　//这个是ios操作系统
                        // alert('ios系统')
                        window.location.href = 'weixin://'
                    }
                    
                } 
         //判断访问终端
        //  var browser={
        //      versions:function(){
        //          var u = navigator.userAgent, app = navigator.appVersion;
        //          return {
        //              trident: u.indexOf('Trident') > -1, //IE内核
        //            presto: u.indexOf('Presto') > -1, //opera内核
        //              webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        //             gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        //              mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        //              ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        //              android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        //              iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        //              iPad: u.indexOf('iPad') > -1, //是否iPad
        //              webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        //              weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        //              qq: u.match(/\sQQ/i) == " qq" //是否QQ
        //          };
        //      }(),
        //      language:(navigator.browserLanguage || navigator.language).toLowerCase()
        //  }
        
        },
        created() {
            this.total_amount = tool.utils.getUrlParam('total_amount') || this.$route.query.total_amount;
        },
    }
     var browser={
             versions:function(){
                 var u = navigator.userAgent, app = navigator.appVersion;
                 return {
                     trident: u.indexOf('Trident') > -1, //IE内核
                   presto: u.indexOf('Presto') > -1, //opera内核
                     webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
                     mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                     ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                     android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
                     iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                     iPad: u.indexOf('iPad') > -1, //是否iPad
                     webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                     weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                     qq: u.match(/\sQQ/i) == " qq" //是否QQ
                 };
             }(),
             language:(navigator.browserLanguage || navigator.language).toLowerCase()
         }
</script>
<style lang="less" scoped>
    .icon{
        width: 73px;
        margin: 100px auto 0 auto;
    }
    p{
         text-align: center;
         color: #2595c9;
         margin-top: 10px;
         font-size: 16px;
    }
    button{
        width: 80% !important;
        color: #fff !important;
        margin-top: 30px;
        // background-color: #f3f3f3 !important;
        a{
            color: #fff !important;
            font-size: 16px;
        }
    }
</style>
