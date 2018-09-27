<template>
    <div class="bargain">
        <div class="title">
            <h4 class="text-center">问鼎农业用户领种果树合同</h4>
            <p>甲方：{{data.bname}}</p>
            <p>乙方：{{data.aname}}</p>
            <p>果树编号：{{id}}</p>
        </div>
        <div class="node" v-html="data.content"></div>
    </div>
</template>
<script>
    import api from "@/api"
    export default{
        data (){
            return{
                id:null,      //果树id
                data:{}
            }
        },
        methods:{
            getContractFun (){
                let _this = this;
                api.getContract({
                    id:this.id
                }).then(data =>{
                    this.data = data;
                }).catch(e =>{})
            }
        },
        created() {
            this.id =  this.$route.params.id;
            this.getContractFun();

        },
    }
</script>
<style lang="less" scoped>
    .bargain{
        padding: 10px;
        // font-size: 16px;
        .title{
            h4{
                font-size: 18px;
            }
        }
    }
</style>
