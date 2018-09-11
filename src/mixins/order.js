export default{
    methods:{
        wxConfirmFun(data){
            let _this = this;
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', _this.onBridgeReady(data), false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', _this.onBridgeReady(data)); 
                    document.attachEvent('onWeixinJSBridgeReady', _this.onBridgeReady(data));
                }
            }else{
                _this.onBridgeReady(data);
            }
        },
        onBridgeReady(data){
            WeixinJSBridge.invoke('getBrandWCPayRequest',{
                "appId":data.appId,
                "timeStamp": data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                "nonceStr": data.nonceStr, // 支付签名随机串，不长于 32 位
                "package": data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                "signType": data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                "paySign": data.paySign, // 支付签名
            },function(res){
                console.log(res)
            })
        }
    }
}