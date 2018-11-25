<template>
    <div class="qr-code">
        <div class="canvas-box">
            <canvas id="myCanvas" width="350" height="500" style="display:none"></canvas>
        </div>
        <div class="material">
            <img src="/src/assets/t_bg_ing.jpg" id="bg-img" alt="" >
            <!-- <img :src="avatar" class="qr-img" alt=""  width="50" height="50"> -->
            <qrcode :value="'http://yoh.tongyanbaby.cn/#/?uid='+uid" class="qrcode" type="img"></qrcode>
        </div>
        <img src="" alt="" class="result" v-if="isShowQRcode">
        
    </div>
</template>
<script>
    import { Qrcode, AlertPlugin  } from 'vux'
    import tool from "@/utils/tool"
    import api from '@/api'
    export default {
        data (){
            return{
                avatar:null,
                name:null,
                uid:null,
                isShowQRcode:true
            }
        },
        components: {
            Qrcode
        },
        methods:{
            setCanvas (){
                let _this = this;
            // window.onLoad = function(){
                const wWidth = window.innerWidth;
                var canvas = document.getElementById('myCanvas');
                var context = canvas.getContext('2d');
                canvas.width = wWidth;
                canvas.height = (wWidth ) * 2;
                
                var bgImg = document.getElementById('bg-img');
                bgImg.style.width =  (wWidth) + 'px';
                
                bgImg.onload = function(){
                
                    let height = bgImg.height;
                    context.drawImage(bgImg,0,0,(wWidth ),height);
                        context.font="20px 微软雅黑";
                    context.fillStyle  = 'white';
                    
                    context.fillText(_this.name,30,50);
                }
                
                
                //二维码
                var qrcode = document.querySelector('.qrcode img')
                qrcode.onload = function (){
                    setTimeout(function(){
                        context.drawImage(qrcode,(wWidth  *0.5) - 50, ((wWidth ) * 2) * 0.7,100,100);
                    },200)

                }
                // console.log(strDataURI)
            // }
                
              
            },
            getMyInfo (){
                let _this = this;
                api.getMyInfo().then(data =>{
                    if(data.level === 0){
                        _this.isShowQRcode = false;
                        _this.$vux.alert.show({
                            title: '提示',
                            content: '您暂时无法生成名片',
                            onShow () {
                               
                            },
                            onHide () {
                               _this.$router.push('/my')
                            }
                        })

                    }
                }).catch(e =>{})
            }
        },created() {
            this.avatar = tool.local.get('avatar');
            this.name = tool.local.get('nickName');
            this.uid =  tool.local.get('uid');
            this.getMyInfo()
        },
        mounted() {
            this.setCanvas();
            this.$nextTick(()=>{
                console.log(2)
                 setTimeout(function(){
                    var canvas = document.getElementById('myCanvas');
                    var strDataURI = canvas.toDataURL("image/jpeg");
                    document.querySelector('.result').setAttribute('src',strDataURI)
                },1000)
            })
        },
        updated() {
            
        },
    }
    // window.onload = function(){
    //     console.log('就绪')
    //     setTimeout(function(){
    //         var canvas = document.getElementById('myCanvas');
    //         var strDataURI = canvas.toDataURL("image/jpeg");
    //         document.querySelector('.result').setAttribute('src',strDataURI)
    //     },1000)
    // }
</script>
<style lang="less">
    .qr-code{
        .canvas-box{
            width: 90%;
            margin: 0 auto;
        }
        canvas{
            // width: 100vw;
            // height: 100vh;
            margin: 0 auto;
        }
        .material{
            height: 0;
            overflow: hidden;
            #bg-img{
                opacity: 0;
            
            }
            .qrcode{
                opacity: 0;
            }
        }
        
        .result{
            display: block;
            margin: 0 auto;
        }
        //  .weui-mask{
        //     background: rgba(0, 0, 0, 9) !important;
        // }
    }
   
</style>
