<template>
    <div class="recent" v-html="nodeText"></div>
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
<style lang="less" scoped>
    .recent{
        padding: 10px;
    }
</style>
