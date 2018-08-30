<template>
    <div class="home">
        <div class="top">
             <flexbox :gutter="0" align="flex-start">
                <flexbox-item :span="2"><div class="flex-demo"><router-link to="">近况</router-link></div></flexbox-item>
                <flexbox-item>
                    <div class="flex-demo" >
                        <p>{{homeData.treeDtoList.introduce}}</p>
                        <p>编号{{homeData.treeDtoList.id}}</p>
                        <p>维护到期：{{homeData.treeDtoList.protectTime}}</p>
                    </div>
                </flexbox-item >
                <flexbox-item :span="2"><div class="flex-demo"><router-link to="/home/strategy">攻略</router-link></div></flexbox-item>
            </flexbox>
        </div>
        <div class="btn-view">
            <div class="flex-demo">
                <div class="btn">
                    <img src="/src/assets/images/ho_watering@3x.png" alt="" @click.stop="$animation('watering')">
                    <img src="/src/assets/images/ho_fertilization@3x.png" alt="" @click.stop="$animation('fertilizer')">
                    <img src="/src/assets/images/ho_pollination@3x.png" alt="" @click.stop="$animation('pollination')">
                </div>
            </div>
            <div class="flex-demo">
                <div class="btn text-right">
                    <img src="/src/assets/images/ho_insecticide@3x.png" alt="" @click.stop="$animation('vermifuge')">
                    <img src="/src/assets/images/ho_scissor@3x.png" alt="" @click.stop="$animation('scissor')">
                    <img src="/src/assets/images/ho_cultivation@3x.png" alt="" @click="$animation('shovel')">
                </div>
            </div>
        </div>
        <div class="shortcut">
            <div class="flow">
                <p class="text-right">{{gradeText}}</p>
                <div class="percent">
                    <div ></div>
                </div>
                <p class="text-center">距离收货</p>
            </div>
            <grid :show-lr-borders="false" :show-vertical-dividers="false">
                <grid-item :label="i.title" v-for="(i,index) in shortcut" :key="index" :link="i.link">
                    <img slot="icon" :src="i.icon">
                </grid-item>
            </grid>
        </div>
        <div class="tree">
            <img src="src/assets/images/home_tree.png" alt="">
            <ul class="operation">
                <li class="watering" >
                    <img v-show="animation.watering" src="/src/assets/images/home_watering.png" id="watering" alt="">
                </li>
                <li class="vermifuge">
                    <img v-show="animation.vermifuge" src="/src/assets/images/home_vermifuge.png" alt="" id="vermifuge">
                </li>
                <li class="fertilizer">
                    <img v-show="animation.fertilizer" src="/src/assets/images/home_fertilizer.png" alt="" id="fertilizer">
                </li>
                <li class="scissor">
                    <img v-show="animation.scissor" src="/src/assets/images/home_scissor.png" alt="" id="scissor">
                </li>
                <li class="pollination">
                    <img v-show="animation.pollination" src="/src/assets/images/home_pollination.png" alt="" id="pollination">
                </li>
                <li class="shovel">
                    <img v-show="animation.shovel" src="/src/assets/images/home_shovel.png" alt="" id="shovel">
                </li>
            </ul>
        </div>
    </div>
</template> 
<script>
    import { Flexbox, FlexboxItem, Grid, GridItem, } from 'vux';
    import api from '@/api'
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
                    icon:'src/assets/images/plant_trees@2x.png'
                },{
                    title:'收获',
                    icon:'src/assets/images/harvest@2x.png'
                },{
                    title:'钱包',
                    icon:'src/assets/images/wallet@2x.png',
                    link:'/me/my-wallet'
                },{
                    title:'积分',
                    icon:'src/assets/images/integral@2x.png',
                    link:'/me/integral'
                }],
                homeData:{},
                gradeText:'短工1级'
            }
        },
        components:{
            Flexbox, FlexboxItem, Grid, GridItem,
        },
        methods:{
            $animation (id){
                let $dom = document.getElementById(id);
                $dom.classList.add(id +'-animation');
                $dom.style.display = 'block';
                setTimeout(() => {
                    $dom.style.display = 'none';
                    $dom.classList.remove(id + '-animation')
                }, 3000);
            },
            getHomeDataFun (){
                let _this = this;
                api.getHomeData().then(data =>{
                    _this.homeData = data;
                }).catch(e =>{})
            },
            setGrade (grade){
                let gradeArr = ['短工','长工','佃户','贫农','渔夫','猎人','中农','富农','掌柜','商人','衙役','小财主','大财主','小地主','大地主','知县','通判','知府','总督','巡抚','丞相','帝王']
                // if(grade === 0 && grade <=10){
                //     this.gradeText = '短工' + grade +'级';
                //     return
                // }else if(grade > 10 && grade <=20){
                //     this.gradeText = '短工' + (grade/10) +'级';
                //     return
                // }else if(grade > 20 && grade <=30){
                //     this.gradeText = '长工' + (grade/20) +'级';
                //     return
                // }else if(grade > 20 && grade <=30){
                //     this.gradeText = '长工' + (grade/20) +'级';
                //     return
                // }
            }
        },created() {
            this.getHomeDataFun();
            console.log(parseInt(11/10))
        },
    }
</script>
<style lang="less" scoped>
    .home{
        background: url(/src/assets/images/home_bgImg.png);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        height: 100vh;
        margin: 0px;
        padding: 0px;
        .top{
           
            padding-top: 15px;
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
            width: 50%;
            position: fixed;
            bottom: 20%;
            text-align: center;
            margin: auto;
            left: 0;
            right: 0;
            >img{
                 width: 100%;
            }
            .operation{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                li{
                    width: 40%;
                    img{
                        width: 100%;
                    }
                }
                .watering{
                    position: absolute;
                    top: -50px;
                    left: -50px;
                    // display: none;
                }
                .watering-animation{
                    animation: watering 3s ease 1;
                }
                .vermifuge{
                    position: absolute;
                    top: -50px;
                    right: -50px;
                    // display: none;
                }
                .vermifuge-animation{
                    animation: vermifuge 3s ease 1;
                }
                .fertilizer{
                    position: absolute;
                    bottom: 0px;
                    left: 0;
                }
                .fertilizer-animation{
                    animation: fertilizer 3s ease 1;
                }
                .scissor{
                    position: absolute;
                    top: 10%;
                    left: 0;
                    margin-left: -60px;
                    // transform: rotate(90deg)
                }
                .scissor-animation{
                    animation: scissor 3s ease 1;
                }
                .pollination{
                    position: absolute;
                    top: -45%;
                    left: 10%;
                }
                 .pollination-animation{
                    animation: pollination 3s ease 1;
                }
                .shovel{
                    position: absolute;
                    left: 0;
                    bottom: -10%;
                }
                
                 .shovel-animation{
                    animation: shovel 3s ease 1;
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
