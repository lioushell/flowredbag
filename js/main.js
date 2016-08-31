/******************三大运营商号段判断******************/

//移动号的大号段
var mobile = ['134','135','136','137','138',
    '139','147','150','151','152','157','158','159',
    '178','182','183','184','187','188'];
//电信号的大号段
var Telecom = ['133','149','153','177','180','181','189'];
//联通号的大号段
var union = ['130','131','132','155','156','185','186','145','176'];
//判断是否是移动
function Section(num){
    var OrSection=false;
    for(var i=0;i<mobile.length;i++){
        if ( mobile[i] == num.substring(0,3)){
            //代表是移动手机号
            OrSection=true;
            break
        }
    }
    return OrSection;
}

//判断是否是电信
function Section1 (num){
    var OrSection=false;
    for ( var j=0;j<Telecom.length;j++ ){
        if ( Telecom[j] == num.substring(0,3)){
            //代表是电信手机号
            OrSection=true;
            break
        }
    }
    return OrSection;
}

//判断是否是联通
function Section2 (num){
    var OrSection=false;
    for ( var k=0;k<union.length;k++ ){
        if ( union[k] == num.substring(0,3)){
            //代表是联通手机号
            OrSection=true;
            break
        }
    }
    return OrSection;
}

/******************发送手机短信验证码******************/
function showtime(t){
    document.myform.verify.disabled=true;
    for(i=1;i<=t;i++) {
        window.setTimeout("update_p(" + i + ","+t+")", i * 1000);
    }
}
function update_p(num,t) {
    if (num == t) {
        document.myform.verify.value = "发送验证码";
        document.myform.verify.disabled = false;
    }
    else {
        printnr = t - num;
        document.myform.verify.value = " (" + printnr +")秒后重新发送";
    }
}

/******************圆环进度条*******************/
function showMe (phone,num ) {

    if(phone==1){
        if(num<=500){
            num = num/7*10;
            pro = num/800*100;
        }else{
            pro = num/1024*100;
        }
    }else{
        if( num> 500 ){
            pro = num/1024*100;
        }else{
            pro = num/800*100;
        }
    }

    circleProgress({
        id: 'circle-progress-custom',
        progress: pro, // default: 100
        duration: 2000, // default: 1000
        color: '#d70000', // default: 'rgb(52, 145, 204)'
        bgColor: 'transparent', // default: 'rgb(230, 230, 230)'
        textColor: 'blue', // default: 'black'
        progressWidth: 0.1, // default: 0.25 (r)
        fontScale: 0.5, // default: 0.4 (r)
        toFixed: 1  // default: 0
        //startAngle : 180,
    });
}
showMe(2,500);

/******************加载页*******************/
/*var progress_id = "loading";
function SetProgress(progress) {
    if (progress) {
        var barWidth=$(".progress-bar").width();
        var pcent=parseInt($("#progressBar  .jindutiao").width()/barWidth*100)+"%";
        $("#progressBar .jindutiao").css("width", String(progress) + "%"); //控制#loading div宽度
        $("#progressBar .progressText").html("页面加载中.."+pcent); //显示百分比
        console.log(pcent);
    }
}
var isloading=false;
var i = 0;
function doProgress() {
    if (i > 100) {
        /!*$("#message").html("加载完毕！").fadeIn("slow");*!///加载完毕提示
        $("#loading").hide();
        $("#container").show();

        //执行进度条

        return showMe(500);

    }
    if (i <= 100) {
        setTimeout("doProgress()", 20);
        SetProgress(i);
        i +=1;
    }
}
$(function () {
    doProgress();
})*/


/******************首页*******************/
/*点击我的流量红包 按钮*/
$('.btn-flowbag').on('touchstart',function(){
    $("#redbagRecord").show();
});
/*点击问号 按钮*/
$('.btn-question').on('touchstart',function(){

});
/*红包个数文本框 焦点状态*/
$("#inputCount").focus(function(){
    /*$("#inputcountTip").html("每人可领1个，未领取的红包将于24小时后退回至您的流量账户");*/
    $("#inputcountTip").hide();
});

/*点击去支付 按钮*/
$('.btn-gopay').on('touchstart',function(){
    if($(".input-count").val()==""){
        $("#inputcountTip").html("请输入红包个数");
        $("#inputcountTip").show();
    }else if(isNaN($(".input-count").val())||parseInt($(".input-count").val())==0){
        $("#inputcountTip").html("请输入正确的红包个数");
        $("#inputcountTip").show();
    }else{
        /*祝福语*/
        $(".zhufuyu").html($(".text-facai").attr("value"));

        /*显示支付窗口*/
        $("#payFuchuang").show();
        /*根据金额显示是否可以支付*/
        $("#payMoney").val(parseInt($(".input-count").val())*5);
        var money= $("#payMoney").val();
        $("#payXbi").html(money*10);
        $("#payMoney").html(money);
        judgeBalance();
    }
});
//红包个数文本框 获取焦点
$(".input-count").focus(function(){

});
//红包文本框的改变事件
$(".input-count").on('input',function(){
    if($(".input-count").val()!=""&&!isNaN($(".input-count").val())){
        $("#totalMoney").html(parseInt($(".input-count").val())*5+".00");
    }else{
        $("#totalMoney").html("0.00");
    }
})

/******************红包记录页*******************/
/*点击发出的红包*/
$('.btn-send').on('touchstart',function(){
    /*发红包信息*/
    $(".jilu1").show();
    $(".sendBag").show();
    /*收红包信息*/
    $(".jilu2").hide();
    $(".receiveBag").hide();
});
/*点击收到的红包*/
$('.btn-receive').on('touchstart',function(){
    /*发红包信息*/
    $(".jilu1").hide();
    $(".sendBag").hide();
    /*收红包信息*/
    $(".jilu2").show();
    $(".receiveBag").show();
});

/******************支付浮窗页*******************/
/*根据金额多少进行判断*/
var isUse=false;    //根据这个布尔变量判断是否可以跳转至支付成功页
function judgeBalance() {
    //X币判断
    if($("#payMoney").val()*10>500){
        $("#xbiCount").removeClass("colord0021b");
        $("#methodX").removeClass("lineh70");
        $("#yueshao1").show();
        isUse=false
    }else{
        $("#xbiCount").addClass("colord0021b");
        $("#methodX").addClass("lineh70");
        $("#yueshao1").hide();
        isUse=true;
    }
    //微信支付判断
    if($("#payMoney").val()>50){
        $("#moneyCount").removeClass("colord0021b");
        $("#methodWechat").removeClass("lineh70");
        $("#yueshao2").show();
        isUse=false
    }else{
        $("#moneyCount").addClass("colord0021b");
        $("#methodWechat").addClass("lineh70");
        $("#yueshao2").hide();
        isUse=true;
    }
}
judgeBalance();
/*跳转至支付成功页*/
//X币判断
$('#payMethod1').on('touchstart',function(){
    if(isUse==true){
        $("#paySuccess").show();
        $("#payFuchuang").hide();
        $("#paySuccess").css("z-index","1000");
    }
})
//微信判断
$('#payMethod2').on('touchstart',function(){
    if(isUse==true){
        $("#paySuccess").show();
        $("#payFuchuang").hide();
        $("#paySuccess").css("z-index","1000");
    }
})
/*关闭按钮*/
$('#btnClose').on('touchstart',function(){
    $("#payFuchuang").hide();
})

/******************个人红包详情页*******************/
/*我也要发红包 按钮*/
$('#btnSendRedbag').on('touchstart',function(){
    $("#redbagIndex").show();
    $("#personBagDetatil").hide();
})
/*流量充值 按钮*/
$('#btnFlowCharge').on('touchstart',function(){
    $("#chargeDetail").show();
    $("#personBagDetatil").hide();
})
/*马上抢 按钮*/
$('#btnAtOnce').on('click',function(){
    $("#register").show();
    $("#register").css("z-index","1000");
    $("#personBagDetatil").hide();
})

/******************充值详情页*******************/
/*立即充值-当月有效 按钮*/
var chongzhi=true;
$('#btnChongzhi').on('touchstart',function(){
    if(chongzhi==true){
        $("#chargeSuccess").show();
    }else{
        $("#chargeFail").show();
    }
    $("#chargeDetail").hide();
})
/*兑换成X币-可随时充值 按钮*/
$('#btnDuihuan').on('touchstart',function(){
    $("#exchangeRule").show();
    $("#chargeDetail").hide();
})

/******************充值成功页*******************/
/*返回流量红包记录页 按钮*/
$('#btnQueryflowbag').on('touchstart',function(){
    $("#redbagRecord").show();
    $("#redbagRecord").css("z-index","1000");
    //发红包
    $(".jilu1").hide();
    $(".sendBag").hide();
    //收红包
    $(".jilu2").show();
    $(".receiveBag").show();
    $("#chargeSuccess").hide();
})

/******************充值失败页*******************/
/*返回充值首页 按钮*/
$('#btnReturncharge').on('touchstart',function(){
    $("#chargeDetail").show();
    $("#chargeDetail").css("z-index","1000");
    $("#chargeFail").hide();
})

/******************确认兑换页*******************/
/*确认兑换成X币 按钮*/
$('#btnChargecoinX').on('touchstart',function(){
    $("#exchangeSuccess").show();
    $("#exchangeRule").hide();
    /*将兑换数量传到兑换成功页*/
    $("#duihuanCount").val($("#xCount").html());
    $("#duihuanCount").html($("#xCount").html());
})

/******************兑换成功页*******************/
/*返回流量红包首页*/
$('.btn-returnIndex').on('touchstart',function(){
    $("#personBagDetatil").show();
    $("#exchangeSuccess").hide();
})


/******************红包详情页 着陆浮窗*******************/
/*拆红包图片 按钮*/
$('#openRedbag').on('touchstart',function(){
    $("#register").show();
    $("#chaiRedbag").hide();
})

/*关闭按钮*/
$('#chaiClose').on('touchstart',function(){
    $("#personBagDetatil").show();
    $("#chaiRedbag").hide();
})

/*看看大家手气 按钮*/
$('#btnLookluck').on('click',function(){
    $("#personBagDetatil").show();
    $("#getBagCount").hide();
    $("#btnAtOnce").show();
    $("#chaiRedbag").hide();
})

/******************注册页*******************/
//手机号码焦点状态
$("#telephone").focus(function(){ //用户名
    $("#phoneTip").hide();
});
//验证码焦点状态
$("#verification").focus(function(){ //用户名
    $("#verifyTip").hide();
});

/*获取验证码 按钮*/
$('#btnSendVerify').on('click',function(){
    var isMoble = Section($("#telephone").val());
    var isTelecom = Section1($("#telephone").val());
    var isUnion = Section2($("#telephone").val());
    if($("#telephone").val()==""){
        $("#phoneTip").show();
    }else if($("#telephone").val().length<11){
        $("#phoneTip").show();
    }else if(!isMoble&&!isTelecom&&!isUnion){
        $("#phoneTip").show();
        $("#phoneTip").html("本活动暂不支持虚拟运营商手机号码");
    }else{
        showtime(30);
        $('#btnSendVerify').attr("disabled","disabled");
    }
})

/*勾选同意条款 复选框*/
var isConfirm=true; //根据这个变量判断确定按钮是否可用
$('#clause').on('touchstart',function(){
    if($('#clause').attr("checked")){
        //未选中
        $('#clause').removeClass("ico-checked");
        $('#clause').removeAttr("checked");
        isConfirm=false;
        //确定按钮不可用
        $('#btnAffirm').attr("disabled",'disabled');
        $('#btnAffirm').removeClass("buttons");
        $('#btnAffirm').addClass("buttons1");
    }else{
        //选中
        $('#clause').addClass("ico-checked");
        $('#clause').attr("checked","checked");
        isConfirm=true;
        //确定按钮可用
        $('#btnAffirm').removeAttr("disabled");
        $('#btnAffirm').addClass("buttons");
        $('#btnAffirm').removeClass("buttons1");
    }
})

/*确认按钮*/
$('#btnAffirm').on('click',function(){
    $("#chaiRedbag").hide();
    $("#register").show();
    $("#register").css("z-index","1000");
    //判断电话号码是否为空或者长度为11位
    if($("#telephone").val()==""||$("#telephone").val().length<11){
        $("#phoneTip").show();
    }
    //判断验证码是否为空或者长度为6位
    if($("#verification").val()==""||$("#verification").val().length<6){
        $("#verifyTip").show();
    }
    //判断完成后提交--跳转红包详情领取页
    if($("#telephone").val()!=""&&$("#verification").val()!=""){
        $("#register").hide();
        //根据流量包个数判断显示已注册 或者 已领完
        hasFlowNum(4)
    }
})

/******************红包详情 已领取-已注册*******************/
//判断红包是否领完
function hasFlowNum(flownum){
    if(flownum<=5){
        //已注册页面显示
        $("#yizhuce").show();
        $("#yizhuce").css("z-index","1001");
        $("#zhuceInfo").show();
        $("#robFlowOver").hide();
    }else{
        //已领完页面显示
        $("#yilingwan").show();
        $("#yilingwan").css("z-index","1001");
        $("#robFlowOver").show();
        $("#zhuceInfo").hide();
    }
}
$('.detailClose').on('touchstart',function(){
    $("#personBagDetatil").show();
    $("#personBagDetatil").css("z-index","1000");
    $(".bagdetails").hide();
})


/******************常见问题页*******************/
$('.ico-question').on('touchstart',function(){
    $("#question").show();
    $("#question").css("z-index","1000");
})
//问号
$('.btn-question').on('click',function(e){
    e.preventDefault();
    $("#question").show();
    $("#question").css("z-index","1000");
})
