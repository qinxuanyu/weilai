<template>
    <div class="bargain">
        <div class="title">
            <p class="number"><span>问鼎种植</span><span>合同编号:{{data.aname}}</span></p>
            <h4 class="text-center">问鼎农业用户领种果树合同</h4>
            <p>甲方：{{data.bname}}（以下简称甲方） </p>
            <p>身份证号码：</p>
            <p>乙方：{{data.aname}}（以下简称乙方）</p>
            <p>单位法人：{{data.lawyer}}</p>
            <p>身份证号码：{{data.idcard}}</p>
            <p>签订地点：贵州省铜仁市万山区</p>
            <p>{{data.say}}</p>
            <p>一、甲方所购果树规格为：树苗，单价：{{data.price}}，数量：{{data.num || 1}}，果树编号 ：{{data.code}}。</p>
        </div>
        <div class="node" v-html="data.content"></div>
        <p>合同有效期：{{data.endTime}}</p>
        <p>以下无内容！</p>
        <p class="text-right">甲方：{{data.bname}}</p>
        <p class="text-right">乙方：{{data.aname}}</p>
        <p class="text-right">乙方负责人{{data.lawyer}}</p>
        <p class="text-right">签约日期：{{data.time || '未签订'}}</p>
    </div>
</template>
<script>
    import api from "@/api"
    export default{
        data (){
            return{
                id:null,      //果树id
                data:{},
                type:null
            }
        },
        methods:{
            getContractFun (){
                let _this = this;
                if(this.type == 1){
                    api.getSeeContract({
                        id:this.id
                    }).then(data =>{
                        this.data = data;
                        if(!data.code){
                            _this.$vux.confirm.show({
                                // 组件除show外的属性
                                content:"下单购买后才会生成果树编号",
                                // cancelText:"逛一逛",
                                onCancel () {

                                },
                                onConfirm () {

                                }
                            })
                        }
                    }).catch(e =>{})
                }else{
                    api.getContract({
                        id:this.id
                    }).then(data =>{
                        this.data = data;
                        if(!data.code){
                            _this.$vux.confirm.show({
                                // 组件除show外的属性
                                content:"下单购买后才会生成果树编号",
                                // cancelText:"逛一逛",
                                onCancel () {

                                },
                                onConfirm () {

                                }
                            })
                        }
                    }).catch(e =>{})
                }
               
            },
            
        },
        created() {
            this.id =  this.$route.params.id;
            this.type = this.$route.params.type;
            this.getContractFun();

        },
    }
</script>
<style lang="less" scoped>
    .bargain{
        padding: 10px;
        // font-size: 16px;
        font-family: '微软雅黑' !important;
        .title{
            h4{
                font-size: 18px;
            }
            .number{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
