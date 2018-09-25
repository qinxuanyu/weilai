<template>
    <div class="service">
        <ul>
            <li class="item" v-for="(item,index) in listData" :key="index">
                <div>
                    <span>客服名称：</span>
                    <span>{{item.name}}</span>
                </div>
                <div>
                    <span>客服微信号：</span>
                    <span>{{item.vxCode}}</span>
                </div>
                <div>
                    <span>客服二维码（长按识别）</span>
                    <img :src="item.imageUrl" alt="" @click.stop="preview(item.imageUrl)">
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
    import api from '@/api'
    export default{
        data (){
            return{
                listData:[]
            }
        },
        methods:{
            getListData (){
                let _this = this;
                api.getServiceList().then(data =>{
                    if(data){
                         _this.listData = data;
                    }
                }).catch(e =>{})
            },
            preview(url){

                this.$wechat.previewImage({
                    current: url, // 当前显示图片的http链接
                    urls: [url] // 需要预览的图片http链接列表
                });
            }
        },
        created() {
            this.getListData()
        },
    }
</script>
<style lang="less" scoped>
    .service{
       
        .item{
            padding: 15px;
            border-bottom: 1px solid #bdbdbd;
            >div{
                font-size: 16px;
                display: flex;
                justify-content: space-between;
                span:nth-child(2){
                    color: #60a609;
                }
                img{
                    // width: 100px;
                    height: 100px;
                }
            }
        }
    }
</style>
