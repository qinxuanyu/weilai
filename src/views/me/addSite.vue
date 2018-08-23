<template>
    <div class="add-site" >
        <group>
            <x-input title="联系人" placeholder="真实姓名"></x-input>
            <x-input title="手机号码" placeholder="11位手机号码"></x-input>
            <x-address title="地区&nbsp;&nbsp;" :list="addressData" placeholder="省市区" value-text-align="left"></x-address>
            <x-input title="详细地址" placeholder="街道门牌信息"></x-input>
            <x-input title="邮政编码" placeholder="邮政编码"></x-input>
        </group>
    </div>
</template>
<script>
    import { Group, XInput, XAddress, ChinaAddressV4Data } from 'vux'
    export default{
        data (){
            return{
                addressData:ChinaAddressV4Data
            }
        },
        components:{ Group, XInput, XAddress }
    }
</script>
<style lang="less" scoped>
    .add-site{

    }
</style>
