//发布红包
function _soapGeneralFunction002(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function008",
        namespaceURL: NAMESPACE_URL,
        data: {
            orderNo : mhtOrderNo    //订单号
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if( json.error.no == 0 ){
                alert(json.result.packet);
                var packet = json.result.packet;
                //正确并获取到红包id
                share(packet,openid,myname)
            } else if ( json.error.no == 1 ) {
                //用户没有登陆

            } else if ( json.error.no == 11 ) {
                //数量不合法
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            } else if ( json.error.no == 12 ) {
                //余额不足
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            } else {
                //显示活动失败页
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            }
        },error:function(error){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}
_soapGeneralFunction002();


function share(pack,openid,name){
    wx.onMenuShareAppMessage({
        title : name+'的[流量红包]！', // 分享标题
        desc : '手机党们，送你1G流量随便花！', // 分享描述
        link : 'http://tmp.wboll.com/liulianghongbao/friend?packID='+pack+'&openid='+openid, // 分享链接,
        type : "link",
        imgUrl : imgUrl, // 分享图标
        success: function () {
            alert('55')
        },
        cancel: function () {

        }
    })

}

