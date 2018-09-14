<template>
    <div class="setup">
        <group>
            <cell title="关于我们" is-link link="/setup/about"></cell>
            <cell title="意见反馈" is-link link="/setup/feedback"></cell>
            <cell title="消息设置" is-link ></cell>
        </group>
        <!-- <x-button @click.native.stop="loginOut">退出登录</x-button> -->
    </div>
</template>
<script>
    import{ Group, Cell, XButton} from 'vux'
    export default{
        data (){
            return{
                
            }
        },
        components:{ Group, Cell, XButton },
        methods:{
            loginOut (){
                
            }
        }
    }
</script>
<style lang="less" scoped>
    .setup{
        button{
            width: 80%;
            font-size: 16px;
            background-color: #60a609;
            margin-top: 33px;
            color: #fff;
        }
    }
</style>
