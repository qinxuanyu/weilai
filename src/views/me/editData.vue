<template>
    <div class="edit-data">
        <div class="avatar">
            <div class="img-box">
                <img src="" alt="">
            </div>
        </div>
        <group>
            <cell title="用户名" value="追随威风"></cell>
            <cell title="性别" value="女" is-link></cell>
            <datetime
                v-model="value1"
                @on-change="change"
                title="生日"
                ></datetime>
            <cell title="地址管理" is-link></cell>
        </group>
    </div>
</template>
<script>
    import { Group, Cell, Datetime } from 'vux'
    export default{
        data (){
            return{
                value1:'2015-11-12'
            }
        },
        components:{ Group, Cell, Datetime },
        methods:{
            change (){

            }
        }
    }
</script>
<style lang="less" scoped>
    .edit-data{
        .avatar{
            background-color: #f3f3f3;
            overflow: hidden;
            .img-box{
                width: 70px;
                height: 70px;
                border-radius: 50%;
                margin: 17px auto;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>
