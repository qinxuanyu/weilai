<template>
    <div class="home" :class="'grade'+ grade">
        <div class="top">
             <flexbox :gutter="0" align="flex-start">
                <flexbox-item :span="2"><div class="flex-demo"></div></flexbox-item>
                <flexbox-item>
                    <p>等级：{{gradeText}}</p>
                    <div class="flex-demo" style="min-height:70px;">

                        <!-- <p v-if="selectTreeData.introduce && btnShow">{{selectTreeData.introduce}}</p> -->
                        <p v-if="selectTreeData.code && btnShow">编号:{{selectTreeData.code}}</p>
                        <p v-if="selectTreeData.protectTime && btnShow">维护到期：{{selectTreeData.protectTime}}</p>
                    </div>
                </flexbox-item >
                <flexbox-item :span="2"><div class="flex-demo"><router-link to="/home/strategy">攻略</router-link></div></flexbox-item>
            </flexbox>
        </div>
        <div class="btn-view">
            <div class="flex-demo">
                <transition name="vux-pop-in">
                    <div class="btn" v-show="btnShow">
                        <img src="/src/assets/images/ho_watering@2x.png" alt="" @click.stop="$animation('watering')">
                        <img src="/src/assets/images/ho_fertilization@2x.png" alt="" @click.stop="$animation('fertilizer')">
                        <img src="/src/assets/images/ho_pollination@2x.png" alt="" @click.stop="$router.push('/home/recent')">  
                        <!-- 近况 -->
                    </div>
                </transition>
                    
            </div>
            <div class="flex-demo">
                <transition name="vux-pop-out">
                    <div class="btn text-right" v-show="btnShow">
                        <img src="/src/assets/images/ho_insecticide@2x.png" alt="" @click.stop="$animation('vermifuge');">
                        <img src="/src/assets/images/ho_scissor@2x.png" alt="" @click.stop="$animation('scissor')">
                        <img src="/src/assets/images/ho_cultivation@2x.png" alt="" @click="$animation('shovel')">
                    </div>
                </transition>
                
            </div>
        </div>
        <div class="shortcut" @click.stop="change">
            <!-- <div class="flow">
                <p class="text-right">{{gradeText}}</p>
                <div class="percent">
                    <div :style="{'width':homeData.progress || 0 +'%'}"></div>
                </div>
                <p class="text-center">距离收获</p>
            </div> -->
            <grid :show-lr-borders="false" :show-vertical-dividers="false">
                <grid-item :label="i.title" v-for="(i,index) in shortcut" :key="index" :link="i.link">
                    <img slot="icon" :src="i.icon">
                </grid-item>
            </grid>
        </div>
        <div class="tree">
            <!-- <img src="src/assets/images/home_tree.png" alt=""> -->
            <ul class="operation">
                <!-- <li class="watering" >
                    <img v-show="animation.watering" src="/src/assets/images/home_watering.gif" id="watering" alt="">
                </li>
                <li class="vermifuge">
                    <img v-show="animation.vermifuge" src="/src/assets/images/home_vermifuge.gif" alt="" id="vermifuge">
                </li>
                <li class="fertilizer">
                    <img v-show="animation.fertilizer" src="/src/assets/images/home_fertilizer.gif" alt="" id="fertilizer">
                </li>
                <li class="scissor">
                    <img v-show="animation.scissor" src="/src/assets/images/home_scissor.gif" alt="" id="scissor">
                </li>
                <li class="pollination">
                    <img v-show="animation.pollination" src="/src/assets/images/home_pollination.gif" alt="" id="pollination">
                </li>
                <li class="shovel">
                    <img v-show="animation.shovel" src="/src/assets/images/home_shovel.gif" alt="" id="shovel">
                </li> -->
                <li v-for="(item,index) in treeDtoList" :key="index" @click.stop="terrClick(index,item)" :class="{'active' : index === activaTree}">
                    <img src="src/assets/images/fruiter@2x.png" alt="" v-if="item.isTree">
                    <img src="src/assets/images/home_tree_min.png" alt="" v-else>
                </li>
                
            </ul>
            
        </div>
        <div class="gif-wrap">
            <div class="cultivation-div" id="shovel" style="display:none">
                <img src="src/assets/images/home_shovel.gif" alt="">
            </div>
            <div class="worm-div"  id="vermifuge" style="display:none">
                <img src="src/assets/images/home_vermifuge.gif" alt="">
                <img class="worm" src="src/assets/images/worm.gif" alt="">
            </div>
            <div class="cultivation-div" id="fertilizer" style="display:none">
                <img src="src/assets/images/home_fertilizer.gif" alt="">
            </div>
            <div class="cultivation-div" id="watering" style="display:none">
                <img src="src/assets/images/home_watering.gif" alt="">
            </div>
            <div class="cultivation-div" id="scissor" style="display:none">
                <img src="src/assets/images/home_scissor.gif" alt="">
            </div>
        </div>
    </div>
</template> 
<script>
    import { Flexbox, FlexboxItem, Grid, GridItem, } from 'vux';
    import api from '@/api'
    import tool from '@/utils/tool'
    export default{
        name:'index',
        data (){
            return {
                animation:{
                    watering:false,
                    vermifuge:false,
                    fertilizer:false,
                    scissor:false,
                    pollination:false,
                    shovel:false
                }, 
                shortcut:[{
                    title:'我的果树',
                    icon:'src/assets/images/fruiter@2x.png',
                    link:'/me/fruiter'
                },{
                    title:'种树',
                    icon:'src/assets/images/plant_trees@2x.png',
                    link:'/store/list/5'
                },{
                    title:'收获',
                    icon:'src/assets/images/harvest@2x.png',
                    link:'/me/my-harvest'
                },{
                    title:'钱包',
                    icon:'src/assets/images/wallet@2x.png',
                    link:'/me/my-wallet'
                },{
                    title:'积分',
                    icon:'src/assets/images/integral@2x.png',
                    link:'/me/integral'
                }],
                treeDtoList:{
                    
                },
                selectTreeData:{},
                grade:1,
                gradeText:'农夫',
                btnShow:false,
                treeLength:20,
                activaTree:null

            }
        },
        components:{
            Flexbox, FlexboxItem, Grid, GridItem,
        },
        methods:{
            $animation (id){
                let $dom = document.getElementById(id);
                // $dom.classList.add(id +'-animation');
                var sibling = $dom.parentNode.childNodes;
                sibling.forEach(element => {
                    if( element.nodeType === 1){
                        element.style.display = 'none'
                    }
                });
                $dom.style.display = 'block';

                setTimeout(() => {
                    $dom.style.display = 'none';
                    // $dom.classList.remove(id + '-animation')
                }, 3000);
            },
            change (){
                this.btnShow = !this.btnShow;
                // this.gradeText = '111'
            },
            getHomeDataFun (){
                let _this = this;
                api.getHomeData().then(data =>{
                    _this.treeDtoList = data.treeDtoList;
                    // if(!data.treeDtoList.length){
                    //      _this.$vux.confirm.show({
                    //         // 组件除show外的属性
                    //         content:"您还没购买果树，是否前去购买",
                    //         cancelText:"逛一逛",
                    //         onCancel () {
                    //            _this.$router.push('/store/index')
                    //         },
                    //         onConfirm () {
                    //            _this.$router.push('/store/list/5')
                    //         }
                    //     })
                    // }
                    _this.setGrade(data.grade);
                   
                }).catch(e =>{})
            },
            setGrade (grade){
                // let gradeArr = ['短工','长工','佃户','贫农','渔夫','猎人','中农','富农','掌柜','商人','衙役','小财主','大财主','小地主','大地主','知县','通判','知府','总督','巡抚','丞相','帝王']
                // // grade - 1
                // if(grade){
                //     let multiple = parseInt((grade - 1)/10);
                //     let str = grade.toString();
                //     str = str.substr(str.length-1,1)
                //     if(str === '0'){
                //         str = '10'
                //     }
                //     let $gradeText = gradeArr[multiple] + str +'级'
                //     this.gradeText = $gradeText;
                // }
                if(grade <= 5){
                    this.gradeText = '农夫';
                    this.grade = 1;
                    return
                }else if(grade > 5 && grade <= 10){
                    this.gradeText = '园丁';
                    this.grade = 2;
                    return
                }else if(grade > 10 && grade <= 20){
                    this.gradeText = '富人';
                    this.grade = 3;
                    return
                }else if(grade > 20 && grade <= 50){
                    this.gradeText = '土豪';
                    this.grade = 4;
                    return
                }else if(grade > 50){
                    this.gradeText = '庄主';
                    this.grade = 5;
                    return
                }
               
            },
            terrClick (index,data){
                if(this.activaTree !== index){
                    this.activaTree = index;
                    this.btnShow = true;
                }else{
                    this.activaTree = null;
                    this.btnShow = false;
                }
                this.selectTreeData = data;
                tool.local.set('recent',data.detail)
                
            }
        },created() {
            
            let code = tool.utils.getUrlParam('code');
            let _this = this;
           
            if(code){
                if(!this.$store.getters.token){
                    api.login({
                        code:code
                    }).then(data =>{
                        if(data.token){
                            _this.$store.commit('SET_TOKEN',data.token);
                            tool.local.set('avatar',data.imageUrl)
                            let _location = window.location.origin;
                            // window.location.href = _location;
                            // _this.$router.push(_location);
                            // _this.getHomeDataFun();
                        }
                    }).catch(e =>{})
                }else{
                    this.getHomeDataFun();
                }
                
            }else{
                this.getHomeDataFun();
                if(!this.$store.getters.token && !tool.local.get('isAuth')){
                    tool.local.set('isAuth','on');
                    setTimeout(()=>{
                        window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx813ac11958aee71a&redirect_uri=http%3a%2f%2fplant.mikao1688.com%2f%23%2f&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
                    },100)
                }
            }
            
           
            
        },
        mounted() {
            let window_h = window.innerHeight;
            document.querySelector('.home').style.height = (window_h - 50) +'px';
            fnResize()
            window.onresize = function () {
                fnResize()

            }
            function fnResize() {
                var deviceWidth = document.documentElement.clientWidth || window.innerWidth
            if (deviceWidth >= 750) {
                deviceWidth = 750
            }
            if (deviceWidth <= 320) {
                deviceWidth = 320
            }
                document.querySelector('.home').style.fontSize = (deviceWidth / 7.5) + 'px'
            }
        },
    }
</script>
<style lang="less" scoped>
    .grade1{
        background: url(/src/assets/images/home_grade1.jpg);
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 100%;
        background-color: #8cd12e;
    }
    .grade2{
        background: url(/src/assets/images/home_grade2.jpg);
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 100%;
        background-color: #007eae;
    }
    .grade3{
        background: url(/src/assets/images/home_grade3.jpg);
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 100%;
        background-color: #009cbf;
    }
    .grade4{
        background: url(/src/assets/images/home_grade4.jpg);
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 100%;
        background-color: #007dad;
    }
    .grade5{
        background: url(/src/assets/images/home_grade5.jpg);
        background-repeat: no-repeat;
        background-position: bottom left;
        background-size: 100%;
        background-color: #5a6cac;
    }
    .home{
        // background: url(/src/assets/images/home_bgimg2.png);
        // background-repeat: no-repeat;
        // background-position: bottom left;
        // background-size: 100%;
        // height: 100vh;
        margin: 0px;
        padding: 0px;
        
        // padding-bottom: 50px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        overflow-x: hidden;
        overflow-y: auto;
        -webkit-overflow-scrolling: auto;

        .top{
            font-size: 14px;
            padding-top: 15px;
             color: #fff;
            .vux-flexbox{
                text-align: center;
            }
            a{
                color: #fff;
            }
        }
        .btn-view{
            display: flex;
            justify-content: space-between;
            .btn{
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                img{
                    margin:5px 10px;
                    width: 50px;
                }
            }
        }
        .tree{
            width: 3.1em;
            height: 1.6em;
            position: fixed;
            bottom: 4.6em;
            text-align: center;
            margin: auto;
            // left: 0.2em;
            right: 1.6em;
            // background-color: red;
            transform:skew(-57deg,29deg);
            // opacity: .3;
           
            // >img{
            //      width: 100%;
            // }
            .operation{
                display: flex;
                flex-wrap: wrap;
                >li{
                    width: 20%;
                    height: 0.4em;
                    // background: #8cd12e;
                    position: relative;
                    img{
                        position: absolute;
                        left: -3px;
                        top: -3px;
                        width: 50%;
                        transform:skew(57deg,-29deg);
                    }
                }
                >li.active{
                    border-color: #66afe9;
                    // outline: 0;
                    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
                    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6);
                    img{
                        width: 70%;
                        top: -9px;
                        left: -10px;
                    }
                }
                
            }
           
            // .operation{
            //     width: 100%;
            //     height: 100%;
            //     position: absolute;
            //     left: 0;
            //     top: 0;
            //     li{
            //         width: 40%;
            //         img{
            //             width: 100%;
            //         }
            //     }
            //     .watering{
            //         position: absolute;
            //         width: 50%;
            //         top: -30%;
            //         left: 0%;
            //         // display: none;
            //     }
            //     .watering-animation{
            //         // animation: watering 3s ease 1;
            //     }
            //     .vermifuge{
            //         position: absolute;
            //         top: -50px;
            //         right: 0;
            //         // display: none;
            //     }
            //     .vermifuge-animation{
            //         // animation: vermifuge 3s ease 1;
            //     }
            //     .fertilizer{
            //         position: absolute;
            //         bottom: 0px;
            //         left: 10%;
            //     }
            //     .fertilizer-animation{
            //         // animation: fertilizer 3s ease 1;
            //     }
            //     .scissor{
            //         position: absolute;
            //         top: 10%;
            //         left: 50%;
            //         margin-left: -60px;
            //         // transform: rotate(90deg)
            //     }
            //     .scissor-animation{
            //         // animation: scissor 3s ease 1;
            //     }
            //     .pollination{
            //         position: absolute;
            //         width: 20%;
            //         top: -15%;
            //         left: 30%;
            //     }
            //      .pollination-animation{
            //         // animation: pollination 3s ease 1;
            //     }
            //     .shovel{
            //         position: absolute;
            //         width: 30%;
            //         left: 60%;
            //         bottom: 0%;
            //     }
                
            //      .shovel-animation{
            //         // animation: shovel 3s ease 1;
            //     }
            // }
        }
        .gif-wrap{
            position: fixed;
            left: 3em;
            bottom: 5em;
            img{
                width: 150px;
            }
            >div{
                // position: absolute;
                // left: 0;
                // top: 0;
                position: relative;
                
            }
            .worm-div{
                position: relative;
                height: 180px;
                img{
                    width: 130px;
                }
                .worm{
                    position: absolute;
                    top: 200px;
                    width: 100px;
                    margin-top: -100px;
                }
            }
            #scissor{
                position: relative;
                height: 180px;
               img{
                   position: absolute;
                    width: 110px;
                    top: 1.5em;
               }
            }
            #fertilizer{
               
                img{
                   
                    width: 120px;
                    margin-left: -20px;
                }
            }
            #watering{
                 position: relative;
                 height: 180px;
                img{
                    position: absolute;
                    // margin-right: 20px;
                    left: -1em;
                    top: 0.5em

                }
            }
            #shovel{
                img{
                    width: 120px;
                }
            }
        }
        .shortcut{
            width: 100%;
            position: fixed;
            left: 0;
            bottom: 53px;
            z-index: 10;
            .weui-grid{padding: 0}
            .weui-grids::before{
                height: 0;
                border-top: 0;
            }
            .flow{
                color: #fff;
                 width: 80%;
                 margin: 0 auto;
                .percent{
                    width: 100%;
                    height: 12px;
                    border-radius: 6px;
                    border: 1px solid #fff;
                    position: relative;
                    box-sizing: border-box;
                    >div{
                        height: 100%;
                        width: 50%;
                        border-radius: 6px;
                        position: absolute;
                        left: 0;
                        top: 0;
                        background-color: #fff;
                        
                    }
                }
            }
            .weui-grid:after{
                height: 0;
                border: 0;
            }
        }
        
    }
    // .watering-enter ,.watering-leave{
    //     opacity: 0;
    // }
    // .watering-enter-active, .watering-leave-active {
    //     transition: opacity 1s;
    // }
    // .watering-enter, .watering-leave-to /* .fade-leave-active below version 2.1.8 */ {
    //     opacity: 0;
    //     transform: translateX(10px)
    // }
        .vux-pop-out-enter-active,
        .vux-pop-out-leave-active,
        .vux-pop-in-enter-active,
        .vux-pop-in-leave-active {
            will-change: transform;
            transition: transform 500ms;
        }

        .vux-pop-out-enter {
            transform: translateX(100%);
        }

        .vux-pop-out-leave-active {
            transform: translateX(100%);
        }

        .vux-pop-in-enter {
            transform: translateX(-100%);
        }

        .vux-pop-in-leave-active {
            transform: translateX(-100%);
        }
    @keyframes watering {
        form{
            opacity: 0;
            transform: rotate(0)
        }
        to{
            opacity: 1;
            transform: rotate(45deg)
        }
    }
    @keyframes  vermifuge{
        form{
            opacity: 0;
            transform: rotate(0)
        }
        to{
            opacity: 1;
            transform: rotate(-45deg)
        }
    }
    // 施肥
    @keyframes fertilizer {
        0%{
            transform: translateX(0)
        }
        25%{
            transform: translateX(200%)
        }
        50%{
            transform: translateX(0)
        }
        100%{
            transform: translateX(200%)
        }
    }
    //剪枝
    @keyframes scissor {
        0%{
            transform: translateX(0)
        }
        25%{
            transform: translateX(200%)
        }
        50%{
            transform: translateX(0)
        }
        100%{
            transform: translateX(200%)
        }
    }
    //授粉
    @keyframes pollination {
        0%{
            transform: translateX(0)
        }
        25%{
            transform: translateX(100%) rotateY(60deg)
            
        }
        50%{
            transform: translateX(0) rotateY(180deg)
        }
        100%{
            transform: translateX(100%)
        }
    }
    //翻土
    @keyframes shovel {
        0%{
            transform: translateX(0)
        }
        10%{
            transform: translateY(10px)
        }
        25%{
            transform: translateX(200%) translateY(0px)
        }
        50%{
            transform: translateX(0) translateY(-10px)
        }
        100%{
            transform: translateX(200%) translateY(0px)
        }
    }
</style>
