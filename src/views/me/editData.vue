<template>
    <div class="edit-data">
        <div class="avatar">
            <div class="img-box">
                <img :src="avatar" alt="">
            </div>
        </div>
        <group>
            <cell title="用户名" :value="detalis.name" @click.native.stop="changeName"></cell>
            <cell title="身份信息" is-link link="/me/authentication"></cell>
            <popup-radio title="性别" :options="options1" @on-hide="submitData()" :placeholder="detalis.sex == 1 ? '男' :'女'">
               
            </popup-radio>
   
            <datetime
                v-model="detalis.birthday" 
                :min-year="1900"
                @on-hide="change"
                title="生日"
                ></datetime>
            <cell title="地址管理" is-link link="/me/site"></cell>
            
        </group>
    </div>
</template>
<script>
    import { Group, Cell, Datetime, PopupRadio  } from 'vux'
    import tool from '@/utils/tool'
    import api from '@/api'
    export default{
        data (){
            return{
                value1:'2015-11-12',
                detalis:{},
                options1: ['男', '女',],
                avatar:''
            }
        },
        components:{ Group, Cell, Datetime, PopupRadio  },
        methods:{
            change (){
                this.submitData()
            },
            getMyData (){
                let _this = this;
                api.getMyInfo().then(data =>{
                    if(data){
                        _this.detalis = data;
                    }
                }).catch(e =>{})
            },
            changeName (){
                let _this = this;
                this.$vux.confirm.prompt('placeholder', {
                    title:'修改昵称',
                    onCancel () {},
                    onConfirm (val) {
                        _this.detalis.name = val;
                        _this.submitData()
                    }
                })
                this.$vux.confirm.setInputValue(this.detalis.name)
            },
            submitData (){
                let Isex = this.detalis.sex;
                let _this = this;
                if(Isex === '男'){
                    Isex = 1
                }else if(Isex === '女'){
                     Isex = 2
                }
                api.changeMyInfo({
                    birthday:this.detalis.birthday,
                    name:this.detalis.name,
                    sex:Isex
                }).then(data =>{
                    _this.showTips('修改成功')
                }).catch(e =>{})
            }
        },
        created() {
            this.getMyData();
            this.avatar = tool.local.get('avatar')
        },
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
