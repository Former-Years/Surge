/*
东方头条签到
1.打开app,点击"我的"，获取第一个Cookie，通知获取cookie成功
~~~~~~~~~~~~~~~~~~~~~~~~~~
Surge 4.0+:
[Script]
#东方头条cookie
东方头条CK =script-path=dfttss.js,type=http-request,pattern=https:\/\/sign\.dftoutiao\.com\/sign\/news_take_s,requires-body=true,

东方头条签到 = type=cron,cronexp=0 * * * * *,script-path=dfttss.js
~~~~~~~~~~~~~~~~~~~~~~~~~~

Loon 2.1.0+
[Script]
# 本地脚本
cron "04 00 * * *" script-path=dfttss.js, enabled=true, tag=东方头条

http-request https:\/\/sign\.dftoutiao\.com\/sign\/news_take_s script-path=dfttss.js, requires-body=true

~~~~~~~~~~~~~~~~~~~~~~~~~~~~

QX 1.0.5+ :
[task_local]
0 * * * * dfttss.js

[rewrite_local]
https:\/\/yuedu4\.dftoutiao\.com\/index\/Yuedutimer\/read_news url script-request-body dfttss.js

https:\/\/yueduhongbao\.dftoutiao\.com\/hong_bao\/get_hongbao_status url script-request-body dfttss.js

https:\/\/keepwalking\.dftoutiao\.com\/award\/index url script-request-body dfttss.js

~~~~~~~~~~~~~~~~~~~~~~~~~~~
[MITM]
hostname = *.dftoutiao.com
~~~~~~~~~~~~~~~~~~~~~~~~~~~

*/
const notify = 0 //通知开关，1为全部通知，0为只开启时段通知
const CookieName = `东方头条`
const signurlKey = `hui_signurl_dfttss`
const KEY_luckybody = `hui_login_body_dfttss`
const KEY_body = `hui_body_dfttss`
const KEY_readpackbody = `hui_readbody_dfttss`
const hui = init()
const VAL_luckybody = hui.getdata(KEY_luckybody)
const VAL_body = hui.getdata(KEY_body)
const VAL_readpackbody = hui.getdata(KEY_readpackbody)

let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie()
 } else {
   all()
}
function GetCookie() {
if ($request && $request.method != 'OPTIONS'&& $request.url.match(/\/index\/Yuedutimer\//)){
   const VAL_body = $request.body
   hui.log(`VAL_body:${VAL_body}`)
   if (VAL_body) hui.setdata(VAL_body, KEY_body)
   hui.msg(CookieName, `获取阅读cookie: 成功`, ``)
   }
else  if ($request && $request.method != 'OPTIONS'&&
 $request.url.match(/\/award\/index/)){
 const VAL_luckybody = $request.body
   hui.log(`VAL_luckybody:${VAL_luckybody}`)
   if (VAL_luckybody) hui.setdata(VAL_luckybody, KEY_luckybody)
   hui.msg(CookieName, `获取幸运气泡cookie: 成功`, ``)
   }
else  if ($request && $request.method != 'OPTIONS'&&
 $request.url.match(/\/hong_bao\/get_hongbao/)){
   const VAL_readpackbody = $request.body
   hui.log(`VAL_readpackbody:${VAL_readpackbody}`)
   if (VAL_readpackbody) hui.setdata(VAL_readpackbody, KEY_readpackbody)
   hui.msg(CookieName, `获取阅读奖励请求: 成功`, ``)
   }
}

// 异步运行
async function all() 
{ 
  await getsign();
  await getRead();
  await Readaward();
  await getFirstPage();
  await answers();
  await answers2();
  await openbox();
  await zhuanpan();
  await getzpcoin();
  //await lucky();
  await getTotal();
  await getTimeSlot();
}
//签到
function getsign() {
  return new Promise((resolve, reject) =>{
   let signurl =  {
      url: `https://sign.dftoutiao.com/sign/news_take_s`, body:VAL_body,
    }
     hui.post(signurl, (error, response, data) => {
     hui.log(`${CookieName}, 每日签到: ${data}`)
     let result = JSON.parse(data)
     if (result.status == true){
      signres = `  签到成功🎉🎉🎉`
      detail = `【获取金币】${result.bonus} 💰 明天签到:${tomorrow_bonus}\n` 
         }  
     else if (result.status == false){
      signres = `  ${result.msg} 🔁`
      detail = `` 
          }
       resolve()
       })
    })
}

//时刻
function getTimeSlot() {
  return new Promise((resolve, reject) =>{
   let inyoururl =  {
      url: `https://timesaward.dftoutiao.com/timesaward/timesaward/get_award`,   
      body:VAL_body,
    }
     hui.post(inyoururl, (error, response, data) => {
     hui.log(`${CookieName}, 时段签到: ${data}`)
     let result = JSON.parse(data)
     if (result.data.status == 1){
      detail += `【时段金币】获得金币${result.data.coin} 💰\n`  
      hui.msg(CookieName+signres,subTitle,detail)
         }  
     else if (result.data.status == 2){
      detail += `【时段金币】本时段 ✅ \n`  
      if(notify){
   hui.msg(CookieName+signres,subTitle,detail)
       }
     }  
    resolve()
    })
  })
}

//阅读
function getRead() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://yuedu4.dftoutiao.com/index/Yuedutimer/read_news`, body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 阅读: ${data}`)
     let result = JSON.parse(data)
     if (result.status == true){
     detail += `【阅读金币】获得金币: ${result.bonus} 💰 已完成/总计: ${result.step}\n`
         }  
     else if (result.status == false){
     detail += `【阅读金币】请稍后访问 \n`
         }  
      resolve()
    })
  })
}
function Readaward() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://yueduhongbao.dftoutiao.com/hong_bao/get_hongbao_status/add_hongbao_gold`, 
      body:VAL_readpackbody,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 阅读奖励: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【阅读金币】获得金币: ${result.bonus} 💰\n`
         }  
     else if (result.code == 4){
     detail += `【阅读奖励】${result.message}\n`
         }  
      resolve()
    })
  })
}
function zhuanpan() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://zhuanpan.dftoutiao.com/zhuanpan_v3/get_zhuanpan_new`,      
      body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 转盘: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
        detail += `【转盘抽奖】第${result.data.chest_num}场 剩余/已开: ${result.data.cur_num}/${result.data.cur_tn}次转盘\n`
         }  
     else if (result.code == -301){
     //detail += `【转盘抽奖】${result.message}\n`
         }  
    else if (result.code == -202){
     detail += `【转盘抽奖】${result.message}\n`
         }  
      resolve()
    })
  })
}
function getzpcoin() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://zhuanpan.dftoutiao.com/zhuanpan_v3/get_gold`, body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 转盘金币: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【转盘金币】获得金币: ${result.data.gold} 💰 \n`
         }  
     else if (result.code == -301){
     detail += `【转盘金币】${result.message}\n`
         }  
      resolve()
    })
  })
}
function zpbox() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://zhuanpan.dftoutiao.com/zhuanpan_v3/get_chest`, 
        body:VAL_body,
    }
   hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 转盘宝箱: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【转盘宝箱】获得金币: ${result.data.gold} 💰 \n`
         }  
     else if (result.code == -301){
     detail += `【转盘宝箱】${result.message}\n`
         }  
      resolve()
    })
  })
}


function answers() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://answer-question.dftoutiao.com/cheese_superman/answer_question_new/add_user_bonus`,    
      body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 智勇冲关: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【智勇冲关】获得金币: ${result.bonus} 💰\n`
         }  
     else if (result.code == -100){
     //detail += `【智勇冲关】请稍后访问 \n`
         }   
      resolve()
    })
  })
}

function answers2() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://answer-question.dftoutiao.com/cheese_superman/answer_question_new/double_bouns`,    
      body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 智勇冲关2: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【智勇冲关】获得金币: ${result.bonus} 💰\n`
         }  
     else if (result.code == -100){
     //detail += `【智勇冲关】请稍后访问 \n`
         }  
      resolve()
    })
  })
}

function openbox() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://shoutu2.dftoutiao.com/invite/open_treasure_box`,    
      body:VAL_body,
    }
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 开启宝箱: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     detail += `【开启宝箱】获得金币: ${result.coin} 💰\n`
         }  
     else if (result.code == -3){
     detail += `【开启宝箱】请稍后访问 \n`
         }  
      resolve()
    })
  })
}

function lucky() {
  return new Promise((resolve, reject) =>{
   let loveurl =  {
      url: `https://keepwalking.dftoutiao.com/award/index`,    
      body:VAL_body,
    }
hui.log(VAL_luckybody)
     hui.post(loveurl, (error, response, data) => {
     hui.log(`${CookieName}, 幸运气泡: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
     //detail += `【幸运气泡】获得金币: ${result.bonus} 💰\n`
         }  
     else if (result.code == -100){
     //detail += `【幸运气泡】请稍后访问 \n`
         }  
      resolve()
    })
  })
}



//首页奖励
function getFirstPage() {
  return new Promise((resolve, reject) =>{
   let lyurl =  {
      url: `https://yueduhongbao.dftoutiao.com/lucky_money/get_lucky_money/get_red_packet`,                    
      body:VAL_body,
    }
     hui.post(lyurl, (error, response, data) => {
     hui.log(`${CookieName}, 首页奖励: ${data}`)
     let result = JSON.parse(data)
     if (result.code== 0){
     detail += `【首页金币】获得金币 ${result.data.bonus} 💰\n`
         }  
      if (result.code== -4){
     detail += `【首页金币】${result.message} \n`
         } 
    resolve()
    })
  })
}

//统计
function getTotal() {
  return new Promise((resolve, reject) =>{
   let moonurl =  {
      url: `https://wallet.dftoutiao.com/get_balance/index_timer`, 
      body:VAL_body,
    }
     hui.post(moonurl, (error, response, data) => {
     hui.log(`${CookieName}, data: ${data}`)
     let result = JSON.parse(data)
     if (result.code == 0){
      subTitle = `金币数量: ${result.data.bonus}💰  金额: ${result.data.money}元` 
         }
      resolve()
    })
  })
}

function init() {
    isSurge = () => {
      return undefined === this.$httpClient ? false : true
    }
    isQuanX = () => {
      return undefined === this.$task ? false : true
    }
    getdata = (key) => {
      if (isSurge()) return $persistentStore.read(key)
      if (isQuanX()) return $prefs.valueForKey(key)
    }
    setdata = (key, val) => {
      if (isSurge()) return $persistentStore.write(key, val)
      if (isQuanX()) return $prefs.setValueForKey(key, val)
    }
    msg = (title, subtitle, body) => {
      if (isSurge()) $notification.post(title, subtitle, body)
      if (isQuanX()) $notify(title, subtitle, body)
    }
    log = (message) => console.log(message)
    get = (url, cb) => {
      if (isSurge()) {
        $httpClient.get(url, cb)
      }
      if (isQuanX()) {
        url.method = 'GET'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    post = (url, cb) => {
      if (isSurge()) {
        $httpClient.post(url, cb)
      }
      if (isQuanX()) {
        url.method = 'POST'
        $task.fetch(url).then((resp) => cb(null, {}, resp.body))
      }
    }
    done = (value = {}) => {
      $done(value)
    }
    return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
  }
  
