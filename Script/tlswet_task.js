/*

公众号iosrule by红鲤鱼与绿鲤鱼与驴
2020.6.29
修改获取养牛信息接口
特仑苏
2020.07.11
修改不自动答题，打印答案。答题入口在小程序底部的限时闯关

loon定时格式参考
cron "0 21,31,50 0-22 * * ?" script-path=tlswet_task.js, tag=特仑苏
*/


//以上是配置说明
const $iosrule = iosrule();//声明必须



//====================================

const telunsu="特仑苏微信";


//++++++++++++++++++++++++++++++++-


const tls_signckname="tls_signckname";
const tls_signck=$iosrule.read(tls_signckname)
;
var tls_num=0;var tls_result="";



//++++++++++++++++++++++++++++++++













//++++++++++++++++++++++++++++++++

//3.需要执行的函数都写这里
function main()
{


tls_main();

  

}

function tls_main()
{

tls_GetUserValues();
tls_sign();
tls_AddFeedSuSu();
 tls_coinall();
tls_Getanswer();
}



main()


//++++++++++++++++++++++++++++++++++++
//4.基础模板

function tls_sign()
  {
   var result1="【签到】";var result2="";
var tt=telunsu;
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=ClickSign",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {
      console.log(data)
    var obj=JSON.parse(data);
   if(obj.errcode==0)
result2="成功";
else  if(obj.errcode==1)
result2=obj.errmsg;
   tls_msg(result1+"\n"+result2+"\n");
   })
 }
function tls_GetUserValues()
  {
   var result1="【用户信息】";var result2="";
var tt=telunsu;
tls_addshare();
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=GetUserInfo",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {
      console.log(data)
    var obj=JSON.parse(data);
   if(obj.errcode==0)
result2="ID:"+obj.result.id+" 昵称"+obj.result.nickname+" 签到"+obj.result.signcount+"天"+" 苜蓿"+obj.result.falfa+" 牛奶"+obj.result.milk+" 体力"+obj.result.susuvalue;
else  if(obj.errcode==1)
result2=obj.errmsg;
   tls_msg(result1+"\n"+result2+"\n");
   })
 }

function tls_AddFeedSuSu()
  {
   var result1="【喂牛】";var result2="";
var tt=telunsu;
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=AddFeedSuSu",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {
      console.log(data)
    var obj=JSON.parse(data);
   if(obj.errcode==0)
result2="成功";
else  if(obj.errcode==1)
result2=obj.errmsg;
   tls_msg(result1+"\n"+result2+"\n");
   })
 }





function tls_AddInteraction(r,bd)
  {
   var result1=r;var result2="";
var tt=telunsu;
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=AddInteraction",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},body:bd,timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {
      console.log(data)
    var obj=JSON.parse(data);
   if(obj.errcode==0)
result2="成功";
else  if(obj.errcode==1)
result2=obj.errmsg;
   tls_msg(result1+"\n"+result2+"\n");
   })
 }

function tls_addshare()
  {
   var result1="";var result2="";
var tt=telunsu;
    var llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=AddShare",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},body:"userid=5765397",timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {})
     llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=AddShare",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram"},body:"userid=5761325",timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {})
 }

function tls_Getanswer()
  {
   var result1="【答题】";var result2="";
var tt=telunsu;
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=Getanswer",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram","Content-Type":"application/x-www-form-urlencoded"},timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {

    var obj=JSON.parse(data);
console.log("【限时闯关答案】");
for(var i=0;i<obj.result.answerlist.length;i++)
{
console.log(obj.result.answerlist[i].answer_right);
}
//   if(obj.errcode==0)


//var answer_body={answerList:[{"question_id":71,"question_answer":"C","time_interval":""},{"question_id":72,"question_answer":"未选择","time_interval":""},{"question_id":73,"question_answer":"C","time_interval":""},{"question_id":74,"question_answer":"未选择","time_interval":""},{"question_id":75,"question_answer":"A","time_interval":""},{"question_id":76,"question_answer":"D","time_interval":""},{"question_id":77,"question_answer":"D","time_interval":""},{"question_id":78,"question_answer":"B","time_interval":""},{"question_id":79,"question_answer":"C","time_interval":""},{"question_id":80,"question_answer":"C","time_interval":""}]}


//for(var i=0;i<obj.result.answerlist.length;i++)
//{
  //answer_body.answerList[i].question_id=obj.result.answerlist[i].id;
  //answer_body.answerList.question_answer=obj.result.answerlist[i].answer_right;
  
  
//}
//answer_body=JSON.stringify(answer_body.answerList);
//answer_body="answerList="+encodeURIComponent(answer_body)+"&alltime=55";
//tls_AddanswerOrder(answer_body);

   })
   
 }


function tls_AddanswerOrder(bd)
  {
   var result1="【答题】";var result2="";
var tt=telunsu;
    const llUrl = {url:"https://xwsh.javamall.cn/Api/TelunsuHandler2.ashx?method=AddanswerOrder",headers:{Cookie:tls_signck,"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/7.0.12(0x17000c32) NetType/4G Language/zh_CN miniProgram","Content-Type":"application/x-www-form-urlencoded"},body:bd,timeout:60};
 $iosrule.post(llUrl, function(error, response, data) {
console.log(data)
    var obj=JSON.parse(data);
   if(obj.errcode==0)
   result2="提交答题成功,增加积分"+obj.result.getalfalfa;
   else  if(obj.errcode==1)
result2=obj.errmsg;
   tls_msg(result1+"\n"+result2+"\n");

})}

function tls_msg(r)
{var tt=telunsu;
 tls_num++;tls_result+=r;
  
  console.log(tls_num)
  console.log(r)
  if(tls_num==8)
  papa(tt,"[🦌🦌🦌]",tls_result);
}

function tls_coinall()

 {

  var graze="【放牧】";
 var music="【音乐】";
var shower="【洗澡】";
var massage="【按摩】";
 var graze_bd="InterName=susuGraze";
 var music_bd="InterName=susuMusic";
 var shower_bd="InterName=susuShower";
 var massage_bd="InterName=susuMassage";
tls_AddInteraction(graze,graze_bd);
tls_AddInteraction(music,music_bd);
tls_AddInteraction(shower,shower_bd);
tls_AddInteraction(massage,massage_bd);

}



  





function
formatSeconds(value) {
    let result = parseInt(value)
    let h = Math.floor(result / 3600) < 10 ? '0' + Math.floor(result / 3600) : Math.floor(result / 3600);
    let m = Math.floor((result / 60 % 60)) < 10 ? '0' + Math.floor((result / 60 % 60)) : Math.floor((result / 60 % 60));
    let s = Math.floor((result % 60)) < 10 ? '0' + Math.floor((result % 60)) : Math.floor((result % 60));
 
    let res = '';
    if(h !== '00') res += `${h}小时`;
    if(m !== '00') res += `${m}分`;
    res += `${s}秒`;
    return res;
  }


function papa(x,y,z){

 $iosrule.notify(x,y,z);}




function iosrule() {
    const isRequest = typeof $request != "undefined"
    const isSurge = typeof $httpClient != "undefined"
    const isQuanX = typeof $task != "undefined"
    const notify = (title, subtitle, message) => {
        if (isQuanX) $notify(title, subtitle, message)
        if (isSurge) $notification.post(title, subtitle, message)
    }
    const write = (value, key) => {
        if (isQuanX) return $prefs.setValueForKey(value, key)
        if (isSurge) return $persistentStore.write(value, key)
    }
    const read = (key) => {
        if (isQuanX) return $prefs.valueForKey(key)
        if (isSurge) return $persistentStore.read(key)
    }
    const get = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "GET"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.get(options, callback)
    }
    const post = (options, callback) => {
        if (isQuanX) {
            if (typeof options == "string") options = { url: options }
            options["method"] = "POST"
            $task.fetch(options).then(response => {
                response["status"] = response.statusCode
                callback(null, response, response.body)
            }, reason => callback(reason.error, null, null))
        }
        if (isSurge) $httpClient.post(options, callback)
    }
    const end = () => {
        if (isQuanX) isRequest ? $done({}) : ""
        if (isSurge) isRequest ? $done({}) : $done()
    }
    return { isRequest, isQuanX, isSurge, notify, write, read, get, post, end }
};





