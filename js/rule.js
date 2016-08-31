var NAMESPACE_URL = "http://webservices.wechat.xfreedata.com";
var BASE_URL = "http://123.56.79.171/xfreedata_wechat_WebServices/services/";
var AUTHENTICATION_URL = BASE_URL + "Authentication/";
var BUSINESS_URL = BASE_URL + "Red.RedHttpEndpoint/";
var RED_URL = BASE_URL + "Business/";
var CONFIGURATION_URL = BASE_URL + "Configuration/";
var packID;

//注册用户
function _soapGeneralFunction003(dialog, callbackFunc, params) {
    $.soap({
        url: CONFIGURATION_URL,
        method: "function010",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid,
            cellphone : phone ,
            authCode :  code,//验证码
            nickname : myname,
            avatar   : headimgurl
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                //正确
                $('#inputCount').val(inputCount);
                $('.text-facai').val(message);
                $('#register').hide();
                $("#payFuchuang").show();
            } else if ( json.error.no == 1 ) {
                //用户未绑定
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            } else if ( json.error.no == 11 ) {
                //手机号不合法
                $('.errorbg').show();
            } else if ( json.error.no == 12 ) {
                //验证码不合法
                $('#verifyTip').html('验证码不能为空')
            } else if ( json.error.no == 13 ) {
                //密码不合法
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            } else if ( json.error.no == 14 ) {
                //验证码不匹配
                $('#verifyTip').html('验证码不正确')
            } else {
                //显示活动失败页
                $('.errorbg').show()
            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}

//发送验证码
function _soapRuleFunction001(dialog, callbackFunc, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function001",
        namespaceURL: NAMESPACE_URL,
        data: {
            cellphone : phone //手机号
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            console.log( json );
            if(json.error.no == 0){
                //正确
                showtime(30);
                $('#btnSendVerify').attr("disabled","disabled");
            }else if( json.error.no == 11 ){
                //手机号不合法
                $('#phoneTip').show();
            }else if( json.error.no == 12 ){
                //验证码创建失败
                $('#verifyTip').show();
                $('#verifyTip').html('验证码创建失败')
            }else if( json.error.no == 13 ){
                //验证码发送失败
                $('#verifyTip').show();
                $('#verifyTip').html('验证码发送失败')
            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}

//查询X币余额
function _soapGeneralFunction006(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function006",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                //X币余额
                $('#payFuchuang').show();
            } else if(json.error.no == 11){
                //openid不合法
                $('#register').show();
            } else if(json.error.no == 12){
                //openid不存在
                inputCount = $('#inputCount').val();
                message = $('.text-facai').val();
                $('#register').show();
            } else{
                //错误
                $('#register').show();
            }
        },error:function(){
            //显示活动失败页
        }
    });
}

//微信支付
function _soapRedFunction003(dialog, callbackFunc, params) {
    $.soap({
        url: RED_URL,
        method: "function003",
        namespaceURL: NAMESPACE_URL,
        data: {
            orderName   : '扭蛋',//
            orderDetail : '流量',
            orderMoney  : $('#inputCount').val(),
            frontNotifyUrl :'http://tmp.wboll.com/liulianghongbao/form?openid='+openid,
            reserved    : $('.text-facai').val(),
            accountID   : openid,
            accountName : myname

        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                $('#funcode').val(json.result.funcode);
                $('#mhtOrderName').val(json.result.mhtOrderName);
                $('#appId').val(json.result.appId);
                $('#mhtOrderNo').val(json.result.mhtOrderNo);
                $('#mhtCurrencyType').val(json.result.mhtCurrencyType);
                $('#mhtOrderAmt').val(json.result.mhtOrderAmt);
                $('#mhtOrderDetail').val(json.result.mhtOrderDetail);
                $('#mhtOrderType').val(json.result.mhtOrderType);
                $('#mhtOrderStartTime').val(json.result.mhtOrderStartTime);
                $('#notifyUrl').val(json.result.notifyUrl);
                $('#frontNotifyUrl').val(json.result.frontNotifyUrl);
                $('#mhtCharset').val(json.result.mhtCharset);
                $('#deviceType').val(json.result.deviceType);
                $('#payChannelType').val(json.result.payChannelType);
                $('#mhtReserved').val(json.result.mhtReserved);
                $('#mhtSignType').val(json.result.mhtSignType);
                $('#consumerId').val(json.result.consumerId);
                $('#consumerName').val(json.result.consumerName);
                $('#mhtSignature').val(json.result.mhtSignature);
                $("#form").submit();
            }else if( json.error.no == 11 ){
                //数量不合法
            }else if( json.error.no == 12 ){
                //余额不足
            }else{

            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}

