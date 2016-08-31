var NAMESPACE_URL = "http://webservices.wechat.xfreedata.com";
var BASE_URL = "http://123.56.79.171/xfreedata_wechat_WebServices/services/";
var CONFIGURATION_URL = BASE_URL + "Configuration/";
var BUSINESS_URL = BASE_URL + "Red.RedHttpEndpoint/";
var AUTHENTICATION_URL = BASE_URL + "Authentication/";
//是否注册
var iszhuce = 0;
//判断自己是否是移动
var Sect  = 0;
//判断自己是否是电信
var Sect1 = 0;
//判断自己是否是联通
var Sect2 = 0;
//朋友手机号是否是移动
var helpSect = 0;
//朋友手机号是否是联通
var helpSect1 = 0;
//朋友手机号是否是电信
var helpSect2 = 0;
//朋友攒的流量
var helpgood = 0;
//请求003端口需要的base
var base = 5;
//朋友的手机号
var helpphone ;
//名字
var username ;
//是否北京电信联通
var status ;
//用户领奖以后的状态
var clickstatus;
//查看自己的红包领取情况

//自己可以领奖的状态
var mystatus;
function _soapGeneralFunction004(dialog, callbackFunc, params) {

    $.soap({
        url: BUSINESS_URL,
        method: "function004",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid,
            packet : packID       //红包id
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){

                for(var i=0;i<json.result.friends.length;i++){
                    var datetime = json.result.friends[i].datetime.split('.');
                    datetime = datetime[0];
                    $(".friend-list").append(
                        "<li class=\"clearfloat\">"+
                        "<span class=\"friend-span1\">"+
                        "<img src="+json.result.friends[i].avatar+" /></span>"+
                        "<div class=\"friend-span2\"><span class=\"friendName\">"+json.result.friends[i].name+"</span>" +
                        "<span class=\"friendDate\">"+datetime+"<span>"+
                        "</div>"+
                        "<span class=\"friend-span3 fr\">"+ json.result.friends[i].amount+"M</span>" +
                        "</li>"
                    )
                }
                if( json.result.friends.length>4 ){
                    $(".friend-list").append("<li id=\"loadingMore\" class=\"clearfloat loadingMore\"> <div>加载更多...</div></li>")
                }
                $('#loadingMore').on('touchstart',function(){
                    _soapruleFunction003();
                });
                $('#currentFlow').html( '当前已攒[<span id="zong">'+json.result.sum+'</span>]M' );

                //自己进自己的页面
                if( identical ){
                    if(Sect){
                        //移动
                        showMe(2,json.result.sum);
                        if(json.result.sum<70){
                            $('#btnFlowCharge').on('click',function(){
                                alert('您还没有攒够最低的起兑档位，继续加油！')
                                $('#personBagDetatil').show();
                                $("#chargeDetail").hide();
                            });
                            $("#flowTips").html("您当前可兑换0M流量,</br>还差"+(70-json.result.sum)+"M即可获得70M流量");
                            $('#liuliang').html('0');
                        }else if(json.result.sum>=70&&json.result.sum<150){
                            $("#flowTips").html("您当前可兑换70M流量,</br>还差"+(150-json.result.sum)+"M即可获得150M流量");
                            $('#liuliang').html('70');
                        }else if(json.result.sum>=150&&json.result.sum<500){
                            $("#flowTips").html("您当前可兑换150M流量,</br>还差"+(500-json.result.sum)+"M即可获得500M流量");
                            $('#liuliang').html('150');
                        }else if(son.result.sum>=500&&json.result.sum<1024){
                            $("#flowTips").html("您当前可兑换500M流量,</br>还差"+(1024-json.result.sum)+"M即可获得1G流量");
                            $('#liuliang').html('500');
                        }else{
                            $('#liuliang').html('1024');
                            $("#flowTips").html("您当前可兑换1G流量");
                        }
                    } else if( Sect1 ) {
                        //北京电信
                        if( status ){
                            showMe(1,json.result.sum);
                            if(json.result.sum<100){
                                $('#btnFlowCharge').on('click',function(){
                                   alert('您还没有攒够最低的起兑档位，继续加油！')
                                    $('#personBagDetatil').show();
                                    $("#chargeDetail").hide();
                                });
                                $("#flowTips").html("您当前可兑换0M流量，<br>还差"+(100-json.result.sum)+"M即可获得100M+100M流量");
                                $('#liuliang').html('0');
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $("#flowTips").html("您当前可兑换100M+100M流量，<br>还差"+(200-json.result.sum)+"M即可获得200M流量");
                                $('#liuliang').html('100');
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $("#flowTips").html("您当前可兑换200M流量，<br>还差"+(500-json.result.sum)+"M即可获得500M+500M流量");
                                $('#liuliang').html('200');
                            }else if(json.result.sum>=500&&json.result.sum<1024){
                                $("#flowTips").html("您当前可兑换500M+500M流量，<br>还差"+(1024-json.result.sum)+"M即可获得1G+1G流量");
                                $('#liuliang').html('500');
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html("您当前可兑换1G+1G流量，<br>您的好友很给力哟！");
                            }
                        }else{
                            //其他电信
                            showMe(1,json.result.sum);
                            if(json.result.sum<100){
                                $('#btnFlowCharge').on('click',function(){
                                    alert('您还没有攒够最低的起兑档位，继续加油！')
                                    $('#personBagDetatil').show();
                                    $("#chargeDetail").hide();
                                });
                                $('#liuliang').html('0');
                                $("#flowTips").html("您当前可兑换0M流量，<br>还差"+(100-json.result.sum)+"M即可获得100M流量");
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $("#flowTips").html("您当前可兑换"+json.result.sum+"M流量，<br>还差"+(200-json.result.sum)+"M即可获得200M流量");
                                $('#liuliang').html('100');
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $('#liuliang').html('200');
                                $("#flowTips").html("您当前可兑换"+json.result.sum+"M流量，<br>还差"+(500-json.result.sum)+"M即可获得500M流量");
                            }else if(json.result.sum>=500&&json.result.sum<1024){
                                $('#liuliang').html('500');
                                $("#flowTips").html("您当前可兑换"+json.result.sum+"M流量，<br>还差"+(1024-json.result.sum)+"M即可获得1G流量");
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html("您当前可兑换"+json.result.sum+"M流量，<br>您的好友很给力哟！");
                            }

                        }
                    }else if( Sect2 ) {
                        //联通
                        if( status ){
                            //北京联通
                            showMe(1,json.result.sum);
                            if(json.result.sum<100){
                                $("#flowTips").html("您当前可兑换0M流量，<br>还差"+(100-json.result.sum)+"M即可获得100M+50M流量");
                                $('#btnFlowCharge').on('click',function(){
                                    alert('您还没有攒够最低的起兑档位，继续加油！')
                                    $('#personBagDetatil').show();
                                    $("#chargeDetail").hide();
                                });
                                $('#liuliang').html('0');
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $('#liuliang').html('100');
                                $("#flowTips").html("您当前可兑换100M+50M流量，<br>还差"+(200-json.result.sum)+"M即可获得200M+100M流量");
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $('#liuliang').html('200');
                                $("#flowTips").html("您当前可兑换200M+100M流量，<br>还差"+(500-json.result.sum)+"M即可获得500M+200M流量");
                            }else if(json.result.sum>=500&&json.result.sum<1024){
                                $('#liuliang').html('500');
                                $("#flowTips").html("您当前可兑换500M+200M流量，<br>还差"+(1024-json.result.sum)+"M即可获得1G+200M流量");
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html("您当前可兑换1G+200M流量，<br>您的好友很给力哟！");
                            }
                        }else{
                            showMe(1,json.result.sum);
                            if(json.result.sum<100){
                                $("#flowTips").html("您当前可兑换0M流量，<br>还差"+(100-json.result.sum)+"M即可获得100M流量");
                                $('#btnFlowCharge').on('click',function(){
                                    alert('您还没有攒够最低的起兑档位，继续加油！')
                                    $('#personBagDetatil').show();
                                    $("#chargeDetail").hide();
                                });
                                $('#liuliang').html('0');
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $("#flowTips").html("您当前可兑换100M流量，<br>还差"+(200-json.result.sum)+"M即可获得200M流量");
                                $('#liuliang').html('100');
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $("#flowTips").html("您当前可兑换200M流量，<br>还差"+(500-json.result.sum)+"M即可获得500M流量");
                                $('#liuliang').html('200');
                            }else if(json.result.sum>=500&&json.result.sum<1024){
                                $("#flowTips").html("您当前可兑换500M流量，<br>还差"+(1024-json.result.sum)+"M即可获得1G流量");
                                $('#liuliang').html('500');
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html("您当前可兑换1G流量，<br>您的好友很给力哟！");
                            }
                        }
                    }
                }else{
                    //朋友
                    if( Sect ){
                        //移动
                        showMe(2,json.result.sum);
                        if(json.result.sum<70){
                            $("#flowTips").html(username+"当前可兑换0M流量");
                            $('#liuliang').html('0');
                        }else if(json.result.sum>=70&&json.result.sum<150){
                            $('#liuliang').html('70');
                            $("#flowTips").html(username+"当前可兑换70M流量");
                        }else if(json.result.sum>=150&&json.result.sum<500){
                            $('#liuliang').html('150');
                            $("#flowTips").html(username+"当前可兑换150M流量");
                        }else if(son.result.sum>=500&&json.result.sum<1024){
                            $('#liuliang').html('500');
                            $("#flowTips").html(username+"当前可兑换500M流量");
                        }else{
                            $('#liuliang').html('1024');
                            $("#flowTips").html(username+"当前可兑换1G流量");
                        }
                    } else  {
                        if( status ){
                            showMe(1,json.result.sum);
                            //是北京联通电信
                            if(json.result.sum<100){
                                $("#flowTips").html(username+"当前可兑换0M流量");
                                $('#liuliang').html('0');
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $("#flowTips").html(username+"当前可兑换100M+100M流量");
                                $('#liuliang').html('100');
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $("#flowTips").html(username+"当前可兑换200M+200M流量");
                                $('#liuliang').html('200');
                            }else if(son.result.sum>=500&&json.result.sum<1024){
                                $("#flowTips").html(username+"当前可兑换500M+500M流量");
                                $('#liuliang').html('500');
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html(username+"当前可兑换1G+1G流量");
                            }
                        }else{
                            showMe(1,json.result.sum);
                            //不是北京联通电信
                            if(json.result.sum<100){
                                $('#liuliang').html('0');
                                $("#flowTips").html(username+"当前可兑换0M流量");
                            }else if(json.result.sum>=100&&json.result.sum<200){
                                $('#liuliang').html('100');
                                $("#flowTips").html(username+"当前可兑换100M流量");
                            }else if(json.result.sum>=200&&json.result.sum<500){
                                $('#liuliang').html('200');
                                $("#flowTips").html(username+"当前可兑换200M流量");
                            }else if(son.result.sum>=500&&json.result.sum<1024){
                                $('#liuliang').html('500');
                                $("#flowTips").html(username+"当前可兑换500M流量");
                            }else{
                                $('#liuliang').html('1024');
                                $("#flowTips").html(username+"当前可兑换1G流量");
                            }
                        }
                    }
                }
            } else if ( json.error.no == 1 ) {
                //用户没有登陆
                $('#getError').show();
                $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
                $('#errorText2').html('');
            } else if ( json.error.no == 11 ) {
                //手机号不合法
                $('.errorbg').show()
            } else if ( json.error.no == 12 ) {
                //验证码不合法
                $('.errorbg').show()
            } else if ( json.error.no == 13 ) {
                //密码不合法
                $('.errorbg').show()
            } else if ( json.error.no == 14 ) {
                //验证码不匹配
                $('.errorbg').show()
            } else {
                //显示活动失败页
                $('.errorbg').show()
            }
        },error:function(){
            //显示活动失败页
            $('.errorbg').show()
        }
    });
}
//查询红包领取列表
function _soapruleFunction003(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function003",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid,
            packet : packID,  //红包id
            base   : base    ,//基数
            step   : 5    //步长
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //正确
            if(json.error.no == 0){
                $('#loadingMore').remove();
                for(var i=0;i<json.result.length;i++){
                    base +=json.result.length;
                    var datetime = json.result[i].datetime.split('.');
                    datetime = datetime[0];
                    $(".friend-list").append(
                        "<li class=\"clearfloat\">"+
                        "<span class=\"friend-span1\">"+
                        "<img src="+json.result[i].avatar+" /></span>"+
                        "<div class=\"friend-span2\"><span class=\"friendName\">"+json.result[i].name+"</span>" +
                        "<span class=\"friendDate\">"+datetime+"<span>"+
                        "</div>"+
                        "<span class=\"friend-span3 fr\">"+ json.result[i].amount+"M</span>" +
                        "</li>"
                    )

                }
                if( json.result.length>4 ){
                    $(".friend-list").append("<li id=\"loadingMore\" class=\"clearfloat loadingMore\"> <div>加载更多...</div></li>")
                }
                $('#loadingMore').on('touchstart',function(){
                    _soapruleFunction003();
                })
            }

        },error:function(error){
            //显示活动失败页
            $('.errorbg').show()
        }
    });
}
//领红包
function _soapGeneralFunction001(dialog,callbackFunc,params)  {
    $.soap({
        url: BUSINESS_URL,
        method: "function001",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid,    //发包人的openid
            packet : packID,  //包id
            dstOpenID : helpopenid  //领取者的openid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            console.log(json);
            if(json.error.no == 0){
                $('#btnAtOnce').hide();
                $('#btnFlowCharge').show();
                $('#yizhuce').show();
                helpgood = json.result.good;
                $('.flowCount').html(helpgood+'M');
                $('#flowNum').html(helpgood+'M');
                $('#xCount').html( json.result.sum );
                $('.totalFlowNum').html( json.result.sum );
                if( openid == helpopenid ){
                    $('#liuliang').html(json.result.sum)
                }

                _soapGeneralFunction004();
            }else if ( json.error.no == 11 ) {
                //红包id不存在
                $('.errorbg').show();
            }else if ( json.error.no == 12 ) {
                //手机号不合法
                $('')
            }else if ( json.error.no == 13 ) {
                //红包不存在
                $('.errorbg').show();
            }else if ( json.error.no == 14 ) {
                //自己不能领
                alert('不能领取自己的红包')
            }else if ( json.error.no ==15 ) {
                //已经领过
                $('#yilingwan').show();
            }else if ( json.error.no ==16 ) {
                //红包不存在
                $('.errorbg').show();
            }else if ( json.error.no ==17 ) {
                //领人不注册
                $('#register').show();
            }else if ( json.error.no ==18 ) {
                //红包已经领完
                $('#yilingwan').show();
            }else{
                $('.errorbg').show();
            }
        },error:function(err){
            //显示活动失败页
            $('.errorbg').show();
        }
    });
}
//是否注册
function _soapGeneralFunction006(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function006",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            console.log(json);
            if( json.error.no == 0 ){
                //X币余额
                helpphone = json.result.cellphone;
                $("#chargeTel").html( json.result.cellphone );
                 helpSect =  Section( json.result.cellphone+'' );
                 helpSect1 = Section1( json.result.cellphone+'' );
                 helpSect2 = Section2( json.result.cellphone+'' );
                if( helpSect ){
                } else if(helpSect1){
                    helpSect1 = 1;
                } else if(helpSect2){
                    helpSect2 = 1;
                }
            } else if(json.error.no == 11){
                /*inputCount = $('#inputCount').val();
                message = $('.text-facai').val();
                $('#register').show();*/
                 iszhuce = 1;
            } else if(json.error.no == 12){
                //openid不存在
                /*inputCount = $('#inputCount').val();
                message = $('.text-facai').val();
                $('#register').show();*/
                 iszhuce = 1;

            } else{
                //错误
                $('.errorbg').show()
            }
        },error:function(){
            //显示活动失败页
            $('.errorbg').show()
        }
    });
}
//注册用户
function _soapGeneralFunction003(dialog, callbackFunc, params) {
    $.soap({
        url: CONFIGURATION_URL,
        method: "function010",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid,
            cellphone : phone,
            authCode : code,
            nickname : myname,
            avatar   : headimgurl   //验证码
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            console.log(json);
            if(json.error.no == 0){
                //正确
                $('#register').hide();
                //查看收包人的手机号是哪个运营商
                helpSect = Section( json.result.cellphone+'' );
                helpSect1 = Section1( json.result.cellphone+'' );
                helpSect2 = Section2( json.result.cellphone+'' );
                if(helpSect){
                    $('#operator').html('中国移动')
                } else if( helpSect1 ){
                    $('#operator').html('中国电信')
                } else if( helpSect2 ){
                    $('#operator').html('中国联通')
                }
                _soapGeneralFunction001();
            } else if ( json.error.no == 1 ) {
                //用户没有登陆
                $('.errorbg').show()
            } else if ( json.error.no == 11 ) {
                //手机号不合法
                $('#phoneTip').html('手机号不能为空')
            } else if ( json.error.no == 12 ) {
                //验证码不合法
                $('#verifyTip').html('验证码不能为空')
            }  else if ( json.error.no == 14 ) {
                //验证码不匹配
                $('#verifyTip').html('验证码不匹配')
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
//充值流量
function _soapGeneralFunction005(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function005",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid, //openid
            packet : packID   //红包id
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            console.log(json);
            if(json.error.no == 0){
                $("#chargeSuccess").show();
                _soapRuleFunction009();
                _soapRuleFunction010();
            }else if( json.error.no == 11 ){
                //openid不合法
                $('.errorbg').show()
            }else if( json.error.no == 12 ){
                //余额不足
                $('.errorbg').show()
                $('#indexErrorText').html('您不能充值')
            }else if( json.error.no == 13 ){
                //没有领过红包
                $('#chargeFail').show()
            }else if( json.error.no == 14 ){
                //已充值过流量
                $('.errorbg').show();
                $('#indexErrorText').html('您已经充值过流量啦')
            }else if( json.error.no == 15 ){
                //已充值过X币
                $('.errorbg').show()
                $('#indexErrorText').html('您已经充值过X币啦')
            }else{
                $('.errorbg').show()
            }
        },error:function(err){
            $('.errorbg').show()
        }
    });
}
//查询个人信息
function _soapGeneralFunction002(dialog, callbackFunc, params) {
    $.soap({
        url: CONFIGURATION_URL,
        method: "function002",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            //查看发包人的手机号是三大运营商的哪个
            if(json.error.no == 0){
                username = json.result.display_name;
                $('.user').html(json.result.display_name);
                $('.touxiang').attr('src',json.result.avatar);
                $('#helpurl').attr('src',headimgurl);
                Sect = Section( json.result.cellphone+'' );
                Sect1 = Section1( json.result.cellphone+'' );
                Sect2 = Section1( json.result.cellphone+'' );
                cellphone = json.result.cellphone;
                _soapGeneralFunction013();
                if(Sect){
                    $('.zuobiao100').html('70M');
                    $('.zuobiao200').html('150M')
                }

            }else if( json.error.no == 11 ){
                //openid不合法
            }else if( json.error.no == 12 ){
                //余额不足
            }else{
                $('.errorbg').show();
            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}

function _soapGeneralFunction0022(dialog, callbackFunc, params) {
    $.soap({
        url: CONFIGURATION_URL,
        method: "function002",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            //查看发包人的手机号是三大运营商的哪个
            if(json.error.no == 0){
                helpSect = Section( json.result.cellphone+'' );
                helpSect1 = Section1( json.result.cellphone+'' );
                helpSect2 = Section1( json.result.cellphone+'' );
                if(helpSect){
                    $('#operator').html('中国移动')
                } else if( helpSect1 ){
                    $('#operator').html('中国电信')
                } else if( helpSect2 ){
                    $('#operator').html('中国联通')
                }

            }else if( json.error.no == 11 ){
                //openid不合法
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
_soapGeneralFunction0022();
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
            $('.errorbg').show()
        }
    });
}
//充值X币
function _soapRuleFunction007(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function007",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid,
            packet : packID
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                $('#exchangeSuccess').show();
                //正确w
                $('#btnSendVerify').attr("disabled","disabled");
            }else if( json.error.no == 11 ){
                //OpenID不合法
                $('.errorbg').show();
            }else if( json.error.no == 12 ){
                //红包ID不合法
                $('.errorbg').show();
            }else if( json.error.no == 13 ){
                //没有领过该红包
                $('.errorbg').show();
                $('#indexErrorText').html('您没有领取过改红包')
            }else if( json.error.no == 14 ){
                //已兑换成流量
                $('.errorbg').show();
                $('#indexErrorText').html('您已经充值过流量啦')
            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}
//收到的红包
function _soapRuleFunction009(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function009",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                for( var i =0 ;i<json.result.records.length;i++ ){
                    var status;
                    if( json.result.records[i].status == '未知'){
                        status = '充值中'
                    } else{
                        status = json.result.records[i].status
                    }
                    $('#usercont').append(
                        "<li id="+json.result.records[i].packet+">" +
                        "<div class=\"hongbaoleft fl\">" +
                        "<h3 class=\"hongbaoTitle\">"+json.result.records[i].title+"</h3>" +
                        "<i class=\"color999 sendDate\">"+json.result.records[i].datetime+"</i>"+
                        "</div>" +"" +
                        "<div class=\"hongbaoright fr\">" +
                        "<h3 class=\"hongbaoTitle\">"+json.result.records[i].amount+"M</h3>"+
                        "<div class=\"color999\">"+status+"</span>" +
                        "</div>"+
                        "</div>"+
                        "</li>"
                    )
                }
            }else if( json.error.no == 11 ){
                //OpenID不合法
                $('.errorbg').show()
            }else if( json.error.no == 12 ){
                //红包ID不合法
                $('.errorbg').show()
            }else if( json.error.no == 13 ){
                //没有领过该红包

            }else if( json.error.no == 14 ){
                //已兑换成流量
            }else{
                $('.errorbg').show()
            }
        },error:function(){
            //显示活动失败页
            $('.errorbg').show()
        }
    });
}
//我发出去的红包
function _soapRuleFunction010(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function010",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : openid
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确

            if(json.error.no == 0){
                for( var i =0 ;i<json.result.length;i++ ){
                    if( json.result.length == 0 ){
                        $('#bagcount').html(0)
                    }else{
                        var datetime = json.result[i].datetime.split('.');
                            datetime = datetime[0];
                        $('#bagcount').html(json.result.length);
                        $('#mycont').append(

                            "<li id="+json.result[i].id+">" +
                            "<div class=\"hongbaoleft fl\">" +
                            "<h3 class=\"hongbaoTitle\">攒手机扭蛋</h3>" +
                            "<i class=\"color999 sendDate\">"+json.result[i].datetime+"</i>"+
                            "</div>" +"" +
                            "<div class=\"hongbaoright fr\">" +
                            "<h3 class=\"hongbaoTitle\">"+json.result[i].total*5+"元</h3>"+
                            "<div class=\"color999\">已领完"+json.result[i].progress+"/"+json.result[i].total+"</span>" +
                            "</div>"+
                            "</div>"+
                            "</li>"
                        );
                        $('#'+json.result[i].id).on('touchstart',function(e){
                            event = event ? event : window.event;
                            var obj = event.srcElement ? event.srcElement : event.target;
                            var $obj = $(obj);
                            $('#shareMask').show();
                            shareTitle = '['+username+'的流量扭蛋]出炉了！手慢无哟';
                            lineLink = 'http://tmp.wboll.com/liulianghongbao/friend?openid='+helpopenid+'&packID='+$obj.attr("id");
                            weixin(shareTitle, lineLink, imgUrl, descContent);
                        })
                    }
                }
            }else if( json.error.no == 11 ){
                //OpenID不合法
                $('.errorbg').show()
            }else if( json.error.no == 12 ){
                //红包ID不合法
                $('.errorbg').show()
            }else if( json.error.no == 13 ){
                //没有领过该红包

            }else if( json.error.no == 14 ){
                //已兑换成流量
            }
        },error:function(){
            //显示活动失败页
            $('#getError').show();
            $('#errorText1').html('活动暂时不可用，我们深感抱歉！请稍后再试。');
            $('#errorText2').html('');
        }
    });
}
//判断当前人是否领取过
function _soapRuleFunction011(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function011",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid,
            packet : packID
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            $('.zhufuyu').html(json.result.wording);
            if( json.error.no == 0){
                $('#chaiRedbag').show();
            }else if( json.error.no == 11 ) {//openid空

            }else if( json.error.no == 12 ) {//红包id空

            }else if( json.error.no == 13 ){
                clickstatus =1;
                //领过流量
                //$('#btnFlowCharge').show();
                //$('.rob-over').hide();
                //$('#btnAtOnce').hide();
                ('#chargeDetail').hide();
            } else if( json.error.no == 14 ) {
                clickstatus = 1;

                //领过x币
                //$('#btnFlowCharge').show();
                //$('.rob-over').hide();
                //$('#btnAtOnce').hide();
                //('#btnFlowCharge').hide();
            } else if( json.error.no == 15 ){
                //领过但是没有兑换流量或者x币
                clickstatus =3;
                helpgood = json.result.amount;
                $('#liuliang').html(helpgood);
                $('#btnFlowCharge').show();
                $('.rob-over').hide();
                $('#btnAtOnce').hide();
            }else{
                $('.errorbg').show();
            }
        },error:function(){
            //显示活动失败页
            $('.errorbg').show();
        }
    });
}
//发包人点充值按钮
/*function _soapGeneralFunction012(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function012",
        namespaceURL: NAMESPACE_URL,
        data: {
            openID : helpopenid, //openid
            type   : mytype//红包id
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            alert('1111');
            if(json.error.no == 0){
                $("#chargeSuccess").show();
            }else{
                $('#errorbg').show()
            }
        },error:function(err){
            //显示活动失败页
            alert('wo');
            $('.errorbg').show();
        }
    });
}*/
//查看运营商
function _soapGeneralFunction013(dialog, callbackFunc, params) {
    $.soap({
        url: BUSINESS_URL,
        method: "function013",
        namespaceURL: NAMESPACE_URL,
        data: {
            cellphone : cellphone
        },
        success : function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            //是否正确
            if(json.error.no == 0){
                if( json.result.operator =='北京联通' ){
                    status =1;
                } else if( json.result.operator =='北京电信' ){
                    status =1;
                }
                _soapGeneralFunction004();
            }else{
                //验证码发送失败
                $('#chargeFail').show()
            }
        },error:function(err){
            alert($($err.toString()).text());
            //显示活动失败页
        }
    })
}

function share(pack,openid){
    wx.onMenuShareAppMessage({
        title : descContent, // 分享标题
        desc : shareTitle, // 分享描述
        link : lineLink+'?packID='+pack+'&openid='+openid, // 分享链接,
        type : "link",
        imgUrl : imgUrl, // 分享图标
        success: function () {

        },
        cancel: function () {

        }
    })
}
