<template>
    <div class="inform">
        <group >
            <x-switch title="接收消息通知"  v-model="stringValue"></x-switch>
            <x-switch title="接收活动通知"  v-model="stringValue"></x-switch>
        </group>
    </div>
</template>
<script>
    import { Group, XSwitch } from 'vux'
    export default{
        data (){
            return{
                stringValue:true
            }
        },
        components:{ Group, XSwitch }
    }
</script>
<style lang="less" scoped>

</style>
