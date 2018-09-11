<template>
    <div class="srot f-16">
        <div class="item" @click.stop="change(1)">销量
            <div :class="{'active': !sales}">
                <!-- <span :class="{'active': !sales}">&lt;</span>
                <span :class="{'active': sales}">&gt;</span> -->
            </div>
        </div>
        <div class="item" @click.stop="change(2)">新发布
            <div :class="{'active': !time}">
                <!-- <span :class="{'active': !time}">&lt;</span>
                <span :class="{'active': time}">&gt;</span> -->
            </div>
        </div>
        <div class="item" @click.stop="change(3)">价格
            <div :class="{'active': !price}">
                <!-- <span :class="{'active': !price}">&lt;</span>
                <span :class="{'active': price}">&gt;</span> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data (){
            return{
                sales:false,
                time:false,
                price:false
            }
        },
        methods:{
            change (index){
                console.log(index)
                switch (index){
                    case 1:
                        this.sales = !this.sales;
                        this.time = false;
                        this.price = false;
                        this.$emit('srot',{'sales':this.sales})
                        break;
                    case 2:
                    
                        this.time = !this.time;
                        this.sales = false;
                        this.price = false;
                        this.$emit('srot',{'time':this.time})
                        break;
                    case 3:
                        this.price = !this.price;
                        this.sales = false;
                        this.time = false;
                        this.$emit('srot',{'price':this.price})
                        break

                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .srot{
        display: flex;
        justify-content: space-between;
        padding: 13px 21px;
        .item{
            >div{
                display: inline-block;
                vertical-align: middle;
                // font-size: 14px;
                // color: #8a8a8a;
                // transform: rotate(90deg);
                // font-weight: 600;
                // >span.active{
                //     color:#60a609
                // }
                width: 10px;
                height: 15px;
                background:url(/src/assets/images/com_down@2x.png) no-repeat;
                background-size: 100%;

            }
            >div.active{
                background:url(/src/assets/images/com_up@2x.png) no-repeat;
                background-size: 100%;
            }
           
        }
    }
</style>
