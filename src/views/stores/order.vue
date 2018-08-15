<template>
    <div  class="order">
        <div class="site">
            <div class="icon">
                <img src="src/assets/images/mer_site@2x.png" alt="">
            </div>
            <group class="select">
                <cell title="收货人：小太阳" value="13020120102" is-link inline-desc="广东省十大建设卡死了激发巅峰对决"></cell>
            </group>
        </div>
    </div>
</template>
<script>
    import { Cell, Group } from 'vux'
    export default{
        components:{
            Cell, Group
        }
    }
</script>
<style lang="less" >
    .order{
        .site{
            display: flex;
            align-items: center;
            .icon{
                width: 52px;
                position: relative;
                img{
                    position: absolute;
                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;
                    width: 20px;
                    display: block;
                    margin: auto;
                }
            }
            .select{
                flex: 1;
                .weui-cells:before{
                    height: 0 !important;
                    border-top: 0;
                }
                .weui-cells:after{
                    height: 0 !important;
                    border-bottom: 0;
                }
            }
        }
        
    }
</style>
