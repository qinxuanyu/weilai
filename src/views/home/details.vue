<template>
    <div class="details">
        <p class="num-title"  v-if="listData.length">只显示最近100条数据</p>
        <record-list
            v-if="listData.length"
            v-for="(item,index) in listData"
            :key="index"
            :time="item.createTime "
            :type="setType(item.type)"
            :content="setContent(item.type,item.name,item.money)"
        >
             
        </record-list>
        
        <no-data v-if="!listData.length"></no-data>
    </div>
</template>
<script>
    import api from '@/api'
    import recordList from '@/components/recordList'
    import noData from '@/components/nodata'
    export default {
        data() {
            return{
                type:null,
                listData:[]
            }
        },
        components:{
            recordList,
            noData
        },
        methods:{
            getListData (){
                let _this = this;
                api.moneyDetail({
                    type:this.type
                }).then(data =>{
                    if(data){
                        _this.listData = data;
                    }
                }).catch(e =>{})
            },
            setType (type){
                switch (type){
                    case 0:
                        return '每日赠送'
                        break
                     case 1:
                        return '直推'
                        break
                     case 2:
                        return '级差'
                        break
                     case 3:
                        return '见点'
                        break
                    case 4:
                        return '提现'
                        break
                }
            },
            setContent(type,name,money){
                let _this = this;
                switch (type){
                    case 0:
                        return '每日赠送' + money.toString() +'元'
                        break
                     case 1:        //直推
                        return '会员【' + name + '】返佣' + money.toString() + '元'
                        break
                     case 2:   //级差
                        return '会员【' + name + '】返佣' + money.toString() + '元'
                        break
                     case 3:    //见点
                        return '总监提现，获得'+money.toString() +'元'
                        break
                    case 4:
                        return  '提现' + money.toString() +'元'
                        break
                }
            }
        },
        created() {
            let type = this.$route.params.type;
            if(type){
                this.type = type;
            }
            // console.log(type)
            this.getListData()
        },
    }
</script>
<style lang="less" scoped>
    .details{
        .num-title{
            padding: 10px;
            background: #f3f3f3;
            color: #999;
        }
    }
    
</style>
