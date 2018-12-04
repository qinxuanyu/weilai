<template>
    <div class="qr-code">
        <div class="canvas-box">
            <canvas id="myCanvas" style="display:none"></canvas>
        </div>
        <div class="material">
            <img src="/src/assets/t_bg_ing.jpg" id="bg-img" alt="" >
            <!-- <img :src="avatar" class="qr-img" alt=""  width="50" height="50"> -->
            <qrcode :value="'http://slx.familyiu.com/#/?uid='+uid" class="qrcode" type="img"></qrcode>
        </div>
        <img src="" alt="" class="result" v-show="isShowQRcode">
        
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
                canvas.width = 1000;
                canvas.height = 2000;
                
                var bgImg = document.getElementById('bg-img');
                bgImg.style.width =  (wWidth) + 'px';
                
                bgImg.onload = function(){
                
                    let height = bgImg.height;
                    context.drawImage(bgImg,0,0,1000,2000);
                    context.font="50px 微软雅黑";
                    context.fillStyle  = 'white';
                    
                    context.fillText(_this.name,70,130);
                }
                
                
                //二维码
                var qrcode = document.querySelector('.qrcode img')
                qrcode.onload = function (){
                    setTimeout(function(){
                        context.drawImage(qrcode,350, 1400,300,300);
                    },1000)
                }
                qrcode.onerror = function(){
                    window.location.reload();
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
            let _this = this;
           
            this.$nextTick(()=>{
                
                _this.setCanvas();
                 setTimeout(function(){
                    var canvas = document.getElementById('myCanvas');
                    var strDataURI = canvas.toDataURL("image/jpeg");
                    document.querySelector('.result').setAttribute('src',strDataURI);
                    console.log('关闭')
                    // _this.$store.commit("UPDATE_LOADING", false);
                },1200)
            })
        },
        updated() {
            // this.$store.commit("UPDATE_LOADING", true);
        },
    }

</script>
<style lang="less">
    .qr-code{
        .canvas-box{
            // width: 90%;
            margin: 0 auto;
        }
        canvas{
            width: 100vw;
            height: 200vw;
            // margin: 0 auto;
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
            width: 100vw;
            margin: 0 auto;
        }
        //  .weui-mask{
        //     background: rgba(0, 0, 0, 9) !important;
        // }
    }
   
</style>
