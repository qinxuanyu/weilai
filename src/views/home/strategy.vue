<template>
    <div class="strategy">
        <div class="text">
            小树200元/棵，每年服务费200元，三年挂果，服务周期10年，每年产量逐渐增加，第7年进入旺产期， 50斤-80斤之间<br>
            中树1000元/棵，每年服务费300元，一年挂果，服务周期5年，第4年进入旺产期，产量逐渐增加，50斤-80斤之间。<br>
            大树2000元/棵，每年服务费300元，一年挂果，服务周期5年，第3年进入丰产期，产量逐渐增加，50斤-80斤之间。<br>
            <div>
                <x-table full-bordered style="background-color:#fff;">
                    <!-- <thead>
                        <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        </tr>
                    </thead> -->
                    <tbody>
                        <tr>
                            <td>鼎樱系列</td>
                            <td>鼎樱小树</td>
                            <td>鼎樱中树</td>
                            <td>鼎樱大树</td>
                        </tr>
                        <tr>
                            <td>价格（元/棵）</td>
                            <td>200</td>
                            <td>1000</td>
                            <td>2000</td>
                        </tr>
                        <tr>
                            <td>服务费（元/年）</td>
                            <td>200</td>
                            <td>300</td>
                            <td>300</td>
                        </tr>
                        <tr>
                            <td>周期（年）</td>
                            <td>10</td>
                            <td>5</td>
                            <td>5</td>
                        </tr>
                        <tr>
                            <td>旺产周期</td>
                            <td>从第7年</td>
                            <td>从第4年</td>
                            <td>从第3年</td>
                        </tr>
                        <tr>
                            <td>旺产期（斤）</td>
                            <td>50-80</td>
                            <td>50-80</td>
                            <td>50-80</td>
                        </tr>
                    </tbody>
                </x-table>
            </div>
            <p class="remark">备注：生长周期中果树出现死亡情况，赔偿当年产量的果树一颗。</p>
        </div>
        
    </div>
</template>
<script>
    import api from '@/api'
    import { XTable } from 'vux'
    export default{
        data (){
            return {
                listData:[]
            }
        },
        components:{XTable},
        methods:{
            getListData (){
                let _this = this;
                api.goodsList({
                    page:0,
                    size:10,
                    type:5,
                    order:1,
                    from:1,
                }).then(data =>{
                    // console.log('加载')
                    _this.listData = data;
                  
                }).catch(error =>{})
            }
        },
        created() {
            // this.getListData()
        },
    }
</script>
<style lang="less" scoped>
    .strategy{
        background: url(/src/assets/images/strategy_bg.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        min-height: 100vh;
        margin: 0px;
        padding: 0px;
        position: relative;
        overflow: hidden;
        .text{
            width: 80%;
            padding: 115px 0;
            // position: absolute;
            // left: 50%;
            // top: 50%;
            // transform: translate(-50%,-50%);
            margin: auto;
            font-family: 'GBJenLei-Medium';
            font-size: 18px;
            color: #60a609;
            text-shadow:1px 1px 1px #60a609;
            table{
                font-size: 14px;
                margin-top: 20px;
                line-height: 28px !important;
            }
        }
        .remark{
            margin-top: 10px;
            color: #e01b15;
        }
    }
</style>
