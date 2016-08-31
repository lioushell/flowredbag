var express      = require('express');
    app          = express(),
    router       = express.Router(),
    url          = require("url"),
    querystring  = require("querystring"),
    https        = require("https"),
    http         = require('http'),
    fs           = require('fs'),
    request      = require("request");
    play         = require('../database/databaes.js').nodew_game_play_info;

router.get('/', function (req, res) {
    console.log('1')
    /************************************************/
    var myurl='\'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1eb27d16166c02fc&redirect_uri=http://tmp.wboll.com/simei/index&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect\'';

    if(!req.query.code){
        console.log('进入没有openid逻辑');

        res.end("<script>window.location.href="+myurl+"</script>");
        return
    }

    var promise=new Promise(function(resolve,reject){
        console.log("进入有code要获取信息");
        https.get('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx1eb27d16166c02fc&secret=b98e73dd7d7a8ce050a5c5fa93219495&code=' + req.query.code + '&grant_type=authorization_code',function(res){
            res.setEncoding('utf8');
            res.on('data', function(chunk) {
               // console.log(chunk);
                resolve(JSON.parse(chunk).openid)
            });
        })
    });

    promise.then(function(openid) {
        if (!openid) {
            res.end("<script>window.location.href=" + myurl + "</script>");
            throw new Error("该用户没有成功获取用户信息");
        }

        return new Promise(function (resolve, reject) {
            var data = JSON.stringify({
                "appid": "wx1eb27d16166c02fc",
                "appsecret": "b98e73dd7d7a8ce050a5c5fa93219495",
                "mpid": "gh_a871ac8b22c8"
            });

            request.post({url:'http://192.168.50.108:10000/gameapi/base/getaccesstoken', timeout: 9000, form: data}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                  //  console.log("获取TOKEN");
                    var data={token:JSON.parse(body).access_token,openid:openid};
                    resolve(data);
                } else {
                 //   console.log(error)
                }
            })

        })
    }).then(function(data){
      //  console.log(data);

        return new Promise(function(resolve,reject){

            https.get('https://api.weixin.qq.com/cgi-bin/user/info?access_token='
                +data.token+'&openid='+data.openid+'&lang=zh_CN', function (res) {

                 res.on('data', function(chunk) {
                    //console.log(chunk);
                    resolve(JSON.parse(chunk));
                 });
             })

        })

    }).then(function(user) {
      //  console.log(user);
        if( user.subscribe == 0 ){
            fs.readFile('./views/index.html', function (err, data) {
                 user.nickname = encodeURI(user.nickname);
                 res.writeHead(200, {
                    'Content-Type': 'text/html;charset=UTF-8',
                     'Set-Cookie': ['openid=' + user.openid,
                         "nickname=" + user.nickname,
                         "headimgurl=" + user.headimgurl,
                         "subscribe = 0"
                     ]
                 });
                 res.write(data);
                 res.end();
             })
        } else {

            fs.readFile('./views/index.html', function (err, data) {
              //  console.log("关注过");
                user.nickname = encodeURI(user.nickname);
                res.writeHead(200, {
                    'Content-Type': 'text/html;charset=UTF-8',
                    'Set-Cookie': ['openid=' + user.openid,
                        "nickname=" + user.nickname,
                        "headimgurl=" + user.headimgurl,
                        "subscribe = 1"
                    ]
                });
                res.write(data);
                res.end();
            })
        }
    })
});


module.exports = router;
