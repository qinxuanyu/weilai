<template>
    <div>
        <div class="list">
            <div>
                <div class="img">
                    <img src="src/assets/images/ho_banner1@2x.png" alt="">
                </div>
                <div class="title">
                    <p>下按时打卡了而空间就能给你看看到你发是 是份</p>
                    <p class="size">规格：1000g</p>
                    <p class="num"><span>￥110.0</span>x1</p>
                </div>
                <div class="state">待发货</div>
            </div>
        </div>
        <div class="from">
            <group>
                <x-input  title="售后类型" value="仅退款" disabled></x-input>
                <popup-picker title="退款原因" :data="list1" v-model="value1" placeholder="请选择退款原因"></popup-picker>
                <x-textarea title="退款描述" :max="200"  placeholder="请填写退款描述（限200字）" ></x-textarea>
            </group>
            <group title="上传凭证" class="upload">
                <div class="icon">+<input type="file" multiple></div>
                
            </group>
            <x-button>提交</x-button>
        </div>
    </div>
</template>
<script>
    import{ Group, XInput, PopupPicker, XTextarea, XButton } from 'vux'
    export default{
        data (){
            return{
                 list1: [['小米', 'iPhone', '华为', '情怀', '三星', '其他', '不告诉你']],
            }
        },
        components:{Group, XInput, PopupPicker, XTextarea, XButton}
    }
</script>
<style lang="less" scoped>
    .list{
        >div{
            display: flex;
            padding: 10px;
            border-bottom: 1px solid #f3f3f3;
            .img{
                width: 125px;
                height: 108px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
            .title{
                flex: 1;
                padding-left: 12px;
                .btn{
                    display: flex;
                    font-size: 16px;
                    margin-top: 20px;
                    justify-content: flex-end;
                    span{
                        color: #f11010;
                    }
                    button{
                        font-size: 13px;
                        margin: 0;
                        padding: 0 10px;
                        // background-color: #60a609;
                        // color: #fff;
                    }
                    button.two{
                        border-color: #60a609;
                        color: #60a609;
                    }
                    button.one{
                        margin-right: 12px;
                    }
                }
                >p{
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                .status{
                    text-align: right;
                    span{
                        color: #f7ab08;
                        margin-right: 13px;
                    }
                }
                .size{
                    color: #999999;
                }
                .num{
                    span{
                        font-size: 16px;
                        color: #f11010;
                    }
                }
            }
            .state{
                color: #f7ab08;
            }
        }
    }
    .from{
        .icon{
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            border:1px solid #dbdbdb;
            color: #dbdbdb;
            font-size: 16px;
            margin: 10px 20px;
            position: relative;
            input{
                width: 100%;
                height: 100%;
                position: absolute;
                left: 0;
                top: 0;
                opacity: 0;
            }
        }
        button{
            width: 80%;
            margin-top: 33px;
        }
    }
</style>