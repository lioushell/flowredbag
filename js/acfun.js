/**
 * 根据手机号发送验证码
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表
 *
 * params.cellphone 手机号码
 *
 */
var NAMESPACE_URL = "http://webservices.wechat.xfreedata.com";
var BASE_URL = "http://123.56.79.171/xfreedata_wechat_WebServices/services/";
//var BASE_URL = "http://localhost:8080/WebServices/services/";

// 服务访问地址
var FINANCE_URL = BASE_URL + "Finance/";
var AUTHENTICATION_URL = BASE_URL + "Authentication/";
var CONFIGURATION_URL = BASE_URL + "Configuration/";
var OTHERS_URL = BASE_URL + "Others/";
var BUSINESS_URL = BASE_URL + "Business/";
var RED_URL = BASE_URL + "Red/";

function soapAuthenticationFunction001(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function001",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        data: {
            cellphone: params.cellphone
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());

            if (json.error.no != 0) {
                _onFail(json.error);
            }else{
                _onSuccess(json.result);

            }

        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 用户登录
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表
 *
 * params.cellphone 手机号码
 * params.password 密码
 */
function soapAuthenticationFunction002(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function002",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        data: {
            cellphone: params.cellphone,
            password: params.password
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            if (json.error.no != 0) {
                _onFail(json.error);
            }
            else {
                _onSuccess(json.result);
            }
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 请求登陆状态
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表，无参数
 *
 */
function soapAuthenticationFunction003(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function003",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        data: {

        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            if (json.error.no != 0) {
                _onFail(json.error);
            } else {
                _onSuccess(json.result);
            }
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 根据手机号重置密码
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表
 *
 * params.cellphone 用户名
 * params.newPassword 新密码
 */
function soapAuthenticationFunction004(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function004",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        data: {
            cellphone: params.username,
            newPassword: params.newPassword
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            _onSuccess(json.result);
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 验证验证码是否相同
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表
 *
 * params.cellphone 手机号
 * params.authCode 验证码
 */
function soapAuthenticationFunction005(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function005",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        data: {
            cellphone: params.cellphone,
            authCode: params.authCode
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            if (json.error.no != 0) {
                _onFail(json.error);
            } else {
                _onSuccess(json.result);
            }
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 获取用户授权code
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表，
 *
 * params.redirect 回调地址
 */
function soapAuthenticationFunction007(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function007",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        async: false,
        data: {
            redirect: params.redirect
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            if (json.error.no != 0) {
                _onFail(json.error);
            } else {
                _onSuccess(json.result);
                top.location = json.result.code_url;
            }
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}

/**
 * 请求用户openid
 *
 * @param _onFail 失败回调（提示对话框）
 * @param _onSuccess 回调函数
 * @param params 参数列表，
 *
 * params.code 用户授权code
 */
function soapAuthenticationFunction008(_onFail, _onSuccess, params) {
    $.soap({
        url: AUTHENTICATION_URL,
        method: "function008",
        namespaceURL: NAMESPACE_URL,
        noPrefix: true,
        async: false,
        data: {
            code: params.code
        },
        success: function (soapResponse) {
            var json = JSON.parse($(soapResponse.toString()).find("ns\\:return").text());
            if (json.error.no != 0) {
                _onFail(json.error);
            } else {
                _onSuccess(json.result);
            }
        },
        error: function (soapResponse) {
            _onFail($(soapResponse.toString()).text());
        }
    });
}