<template>
    <div class="srot f-16">
        <div class="item" @click.stop="change(1)">销量
            <div>
                <span :class="{'active': !sales}">&lt;</span>
                <span :class="{'active': sales}">&gt;</span>
            </div>
        </div>
        <div class="item" @click.stop="change(2)">新发布
            <div>
                <span :class="{'active': !time}">&lt;</span>
                <span :class="{'active': time}">&gt;</span>
            </div>
        </div>
        <div class="item" @click.stop="change(3)">价格
            <div>
                <span :class="{'active': !price}">&lt;</span>
                <span :class="{'active': price}">&gt;</span>
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
                switch (index){
                    case 1:
                        this.sales = !this.sales;
                        this.$emit('srot',{'sales':this.sales})
                        break;
                    case 2:
                        this.time = !this.time;
                        this.$emit('srot',{'time':this.time})
                        break;
                    case 3:
                        this.price = !this.price;
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
                font-size: 14px;
                color: #8a8a8a;
                transform: rotate(90deg);
                >span.active{
                    color:#60a609
                }
            }
           
        }
    }
</style>
