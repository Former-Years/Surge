/*
bilibili fan drama open 1080P+

QX:
https:\/\/ap(p|i)\.bilibili\.com\/((pgc\/player\/api\/playurl)|(x\/v2\/account\/myinfo\?)|(x\/v2\/account/mine\?)) url script-response-body BiliHD.js

QX MITM = api.bilibili.com
*/

var body = $response.body;
var url = $request.url;

const path1 = '/pgc/player/api/playurl';
const path2 = "/x/v2/account/myinfo?";
const path3 = "/x/v2/account/mine\?";
// 增加Mac大会员画质
const path4 = "/x/vip/price/panel/v10\?";
if (url.indexOf(path1) != -1) {
    let obj = JSON.parse(body);
    obj["has_paid"] = true;
    obj["quality"] = obj["accept_quality"][0];
    obj.vip_type = 2;
    obj.vip_status = 1;
    body = JSON.stringify(obj);
};
if (url.indexOf(path2) != -1) {
    let obj = JSON.parse(body);
    obj["data"]["vip"]["type"] = 2;
    obj["data"]["vip"]["status"] = 1;
    obj["data"]["vip"]["vip_pay_type"] = 1;
    obj["data"]["vip"]["due_date"] = 1796054400000;
    body = JSON.stringify(obj);
};
if (url.indexOf(path3) != -1) {
    let obj = JSON.parse(body);
    obj["data"]["vip"]["type"] = 2;
    obj["data"]["vip"]["status"] = 1;
    obj["data"]["vip"]["vip_pay_type"] = 1;
    obj["data"]["vip"]["due_date"] = 1796054400000;
    body = JSON.stringify(obj);
};
if (url.indexOf(path4) != -1) {
    let obj = JSON.parse(body);
    obj["data"]["vip_type"] = 2;
    obj["data"]["vip"]["type"] = 2;
    obj["data"]["vip"]["status"] = 1;
    obj["data"]["vip"]["vip_pay_type"] = 1;
    obj["data"]["vip"]["due_date"] = 1796054400000;
    body = JSON.stringify(obj);
};

$done({ body });

