<template>
    <div class="site">
        <check-icon>
            <div class="warp">
                <div class="name">
                    <span>郝彩英</span><span>1307980005</span>
                </div>
                <p>广东省1234565877458854442</p>
                <div class="btn">
                    <span>编辑</span>
                    <span>删除</span>
                </div>
            </div>
        </check-icon>
        <x-button>+新增地址</x-button>
    </div>
</template>
<script>
    import { CheckIcon, XButton } from 'vux'
    export default{
        data (){
            return{
                
            }
        },
        components:{CheckIcon, XButton}
    }
</script>
<style lang="less" >
    .site{
        .vux-check-icon{
            display: flex;
            align-items: center;
            padding: 15px  20px 15px 15px;
            border-bottom: 1px solid #f3f3f3;
            >span{
                flex: 1;
            }
            .warp{
               
                .name{
                    display: flex;
                    justify-content: space-between;
                }
                .btn{
                    display: flex;
                    justify-content: flex-end;
                    span{
                        margin-left: 30px;
                    }
                }
            }
        }
        button{
            width: 80% !important;
            margin-top: 150px;
        }
    }
</style>
