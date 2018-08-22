<template>
    <div class="capital">
        <tab custom-bar-width="50px" class="tab-top">
            <tab-item selected >支出</tab-item>
            <tab-item >收入</tab-item>
        </tab>
        <scroller>
            <group>
                <cell title="购树" value="-100.0" inline-desc='2018-1-1'></cell>
            </group>
        </scroller>
    </div>
</template>
<script>
    import { Group, Cell, Tab, TabItem  } from 'vux';
    
    export default{
        data (){
            return{

            }
        },
        components:{ Group, Cell, Tab, TabItem  },
        mounted() {
            var window_h = window.innerHeight;
            console.log(window_h)
            document.querySelector('._v-container').style.height = (window_h - 44) +'px';
            document.querySelector('._v-container').style.top = '44px'
        },
    }
</script>
<style lang="less">
    .capital{
        .weui-cell__ft{
            font-size: 16px;
            color: #f11010;
        }
        .vux-no-group-title{
            margin-top: 0;
        }
    }
</style>
