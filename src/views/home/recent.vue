<template>
    <div class="recent" >
        <div class="node" v-html="nodeText">

        </div>
    </div>
</template>
<script>
    import tool from '@/utils/tool'
    export default{
        data (){
            return{
                nodeText:''
            }
        },
        created() {
            let node = tool.local.get('recent');
            if(node){
                this.nodeText = node;
            }
        },
    }
</script>
<style lang="less">
    .recent{
        padding: 10px;
        .node{
            img{
                width: 100% !important;
            }
        }
       
    }
</style>
