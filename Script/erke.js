/*
脚本名称：鸿星尔克签到
活动入口：鸿星尔克小程序
环境变量：erke_data（Node环境，多账号以@隔开）
使用说明：添加重写规则并打开鸿星尔克小程序即可获取Cookie
更新时间：2024-11-25

================ Surge 配置 ================
[MITM]
hostname = %APPEND% hope.demogic.com

[Script]
鸿星尔克Cookie = type=http-request,pattern=^https:\/\/hope\.demogic\.com\/gic-wx-app\/get-member-asset\.json,script-path=https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js

鸿星尔克 = type=cron, cronexp=15 9 * * *, script-path=https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js

============ Quantumult X 配置 =============
[MITM]
hostname = hope.demogic.com

[rewrite_local]
^https:\/\/hope\.demogic\.com\/gic-wx-app\/get-member-asset\.json url script-request-header https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js

[task_local]
15 9 * * * https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js, tag=鸿星尔克, enabled=true

================ Loon 配置 ================
[MITM]
hostname = hope.demogic.com

cron "15 9 * * *" script-path=https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js, tag=鸿星尔克

http-request ^https:\/\/hope\.demogic\.com\/gic-wx-app\/get-member-asset\.json script-path=https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/erke.js, tag=鸿星尔克Cookie

================ Boxjs订阅 ================
订阅地址：https://raw.githubusercontent.com/Former-Years/Surge/refs/heads/main/Script/xinian.boxjs.json

*/

const $ = new Env('鸿星尔克');
const API_HOST = 'https://hope.demogic.com';

let Message = '';
const KEY_erke_data = 'erke_data';

// 判断运行环境
if (typeof $request !== 'undefined') {
    captureRequestURL(); // 抓取 URL 数据
    $.done();
} else {
    !(async () => {
        const requestData = loadRequestData();
        if (!requestData) {
            $.msg($.name, '【提示】未找到有效的请求数据', '请先完成抓取或配置环境变量。');
            return;
        }

        await executeForMultipleAccounts(requestData);

        // 统一发送一次通知
        if (Message) {
            $.msg($.name, '', Message);
        }
    })()
    .catch((e) => console.error(`❌ ${$.name}, 执行失败: ${e}`))
    .finally(() => $.done());
}

// 抓取并存储 URL 数据
function captureRequestURL() {
    const savedData = $.getdata(KEY_erke_data) || '';
    const currentURL = $request.url;

    // 检查 URL 是否已存在
    if (savedData.includes(currentURL)) {
        $.msg($.name, '', '🎉 URL 账号重复');
    } else {
        const newData = savedData ? `${savedData}@${currentURL}` : currentURL;
        $.setdata(newData, KEY_erke_data);
        const accountCount = newData.split('@').length;
        $.msg($.name, '', `账号 ${accountCount} 🎉 URL 已抓取并保存`);
    }
}

// 加载存储的 URL 数据
function loadRequestData() {
    const data = $.getdata(KEY_erke_data) || ($.isNode() ? process.env.erke_data : '');
    if (data) {
        console.log('🎉 加载到请求数据');
        return data;
    } else {
        console.error('❌ 未找到有效的 URL 数据');
        return null;
    }
}

// 执行多账号签到任务
async function executeForMultipleAccounts(data) {
    const accounts = data.split('@');  // 按 @ 分隔多个账号
    for (let i = 0; i < accounts.length; i++) {
        const accountURL = accounts[i].trim();
        if (accountURL) {
            console.log(`\n============= 执行账号 ${i + 1} =============`);
            await executeForAccount(i + 1, accountURL);
        }
    }
}

// 执行单个账号的签到任务
async function executeForAccount(accountNumber, url) {
    const accountMessage = [];
    try {
        const params = extractURLParams(url);  // 提取 URL 参数
        const requestBody = buildSignInRequestBody(params);
        const signInResult = await signInRequest(requestBody);

        if (signInResult.code === '0') {
            const todayData = signInResult.result.find(entry => entry.currentDayFlag === 1);
            if (todayData) {
                const earnedPoints = todayData.memberSignAwards.reduce((acc, award) => 
                    award.type === 'integral' ? acc + award.count : acc, 0
                );
                accountMessage.push(`🎉 签到成功: 积分 +${earnedPoints}`);
            } else {
                accountMessage.push(`❌ 未找到今日签到数据`);
            }
        } else {
            accountMessage.push(`❌ 签到失败: ${signInResult.message}`);
        }

        const totalPointsResult = await getTotalPoints(url);
        accountMessage.push(`🎉 当前积分: ${totalPointsResult.result.D007 || 0}`);
        console.log(`账号 ${accountNumber}:\n${accountMessage.join('\n')}`);
    } catch (error) {
        accountMessage.push(`❌ 执行失败: ${error.message}`);
    } finally {
        Message += `账号 ${accountNumber}\n${accountMessage.join('\n')}\n\n`;
    }
}

// 提取 URL 参数
function extractURLParams(url) {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const params = {};
    for (const [key, value] of urlParams.entries()) {
        params[key] = value;
    }
    return params;
}

// 构建签到请求体
function buildSignInRequestBody(params) {
    return {
        random: params.random,
        wxOpenid: params.wxOpenid,
        enterpriseId: params.enterpriseId,
        appid: params.appid,
        gicWxaVersion: params.gicWxaVersion,
        timestamp: params.timestamp,
        cliqueMemberId: params.cliqueMemberId,
        unionid: params.unionid,
        source: 'wxapp',
        cliqueId: params.cliqueId,
        openid: params.openid,
        memberId: params.memberId,
        transId: params.transId,
        useClique: params.useClique,
        launchOptions: JSON.stringify({ path: 'pages/pointsmall-index/pointsmall-index', query: {}, scene: 1089, referrerInfo: {}, mode: 'default', apiCategory: 'default' }),
        sign: params.sign
    };
}

// 发起签到请求
function signInRequest(requestBody) {
    const signInOptions = {
        url: `${API_HOST}/gic-wx-app/sign/member_sign.json`,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
    };

    return new Promise((resolve, reject) => {
        $.post(signInOptions, (err, resp, data) => {
            if (err) {
                console.error(`❌ 签到请求失败: ${err}`);
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    console.warn('❌ 签到响应解析失败:', error);
                    reject(new Error(`签到请求解析失败: ${data}`));
                }
            }
        });
    });
}

// 查询积分请求
function getTotalPoints(url) {
    const options = {
        url: url,
        headers: { 'Content-Type': 'application/json' }
    };

    return new Promise((resolve, reject) => {
        $.get(options, (err, resp, data) => {
            if (err) {
                console.error(`❌ 查询积分请求失败: ${err}`);
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    console.warn('❌ 查询积分响应解析失败:', error);
                    reject(new Error(`查询积分请求解析失败: ${data}`));
                }
            }
        });
    });
}


function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; "POST" === e && (s = this.post); const i = new Promise(((e, i) => { s.call(this, t, ((t, s, o) => { t ? i(t) : e(s) })) })); return t.timeout ? ((t, e = 1e3) => Promise.race([t, new Promise(((t, s) => { setTimeout((() => { s(new Error("请求超时")) }), e) }))]))(i, t.timeout) : i } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.logLevels = { debug: 0, info: 1, warn: 2, error: 3 }, this.logLevelPrefixs = { debug: "[DEBUG] ", info: "[INFO] ", warn: "[WARN] ", error: "[ERROR] " }, this.logLevel = "info", this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.encoding = "utf-8", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } getEnv() { return "undefined" != typeof $environment && $environment["surge-version"] ? "Surge" : "undefined" != typeof $environment && $environment["stash-version"] ? "Stash" : "undefined" != typeof module && module.exports ? "Node.js" : "undefined" != typeof $task ? "Quantumult X" : "undefined" != typeof $loon ? "Loon" : "undefined" != typeof $rocket ? "Shadowrocket" : void 0 } isNode() { return "Node.js" === this.getEnv() } isQuanX() { return "Quantumult X" === this.getEnv() } isSurge() { return "Surge" === this.getEnv() } isLoon() { return "Loon" === this.getEnv() } isShadowrocket() { return "Shadowrocket" === this.getEnv() } isStash() { return "Stash" === this.getEnv() } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null, ...s) { try { return JSON.stringify(t, ...s) } catch { return e } } getjson(t, e) { let s = e; if (this.getdata(t)) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise((e => { this.get({ url: t }, ((t, s, i) => e(i))) })) } runScript(t, e) { return new Promise((s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let o = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); o = o ? 1 * o : 20, o = e && e.timeout ? e.timeout : o; const [r, a] = i.split("@"), n = { url: `http://${a}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: o }, headers: { "X-Key": r, Accept: "*/*" }, policy: "DIRECT", timeout: o }; this.post(n, ((t, e, i) => s(i))) })).catch((t => this.logErr(t))) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), o = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, o) : i ? this.fs.writeFileSync(e, o) : this.fs.writeFileSync(t, o) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let o = t; for (const t of i) if (o = Object(o)[t], void 0 === o) return s; return o } lodash_set(t, e, s) { return Object(t) !== t || (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce(((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}), t)[e[e.length - 1]] = s), t } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), o = s ? this.getval(s) : ""; if (o) try { const t = JSON.parse(o); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, o] = /^@(.*?)\.(.*?)$/.exec(e), r = this.getval(i), a = i ? "null" === r ? null : r || "{}" : "{}"; try { const e = JSON.parse(a); this.lodash_set(e, o, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const r = {}; this.lodash_set(r, o, t), s = this.setval(JSON.stringify(r), i) } } else s = this.setval(t, e); return s } getval(t) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.read(t); case "Quantumult X": return $prefs.valueForKey(t); case "Node.js": return this.data = this.loaddata(), this.data[t]; default: return this.data && this.data[t] || null } } setval(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": return $persistentStore.write(t, e); case "Quantumult X": return $prefs.setValueForKey(t, e); case "Node.js": return this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0; default: return this.data && this.data[e] || null } } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.cookie && void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))) } get(t, e = (() => { })) { switch (t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"], delete t.headers["content-type"], delete t.headers["content-length"]), t.params && (t.url += "?" + this.queryStr(t.params)), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, ((t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) })); break; case "Quantumult X": this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then((t => { const { statusCode: s, statusCode: i, headers: o, body: r, bodyBytes: a } = t; e(null, { status: s, statusCode: i, headers: o, body: r, bodyBytes: a }, r, a) }), (t => e(t && t.error || "UndefinedError"))); break; case "Node.js": let s = require("iconv-lite"); this.initGotEnv(t), this.got(t).on("redirect", ((t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } })).then((t => { const { statusCode: i, statusCode: o, headers: r, rawBody: a } = t, n = s.decode(a, this.encoding); e(null, { status: i, statusCode: o, headers: r, rawBody: a, body: n }, n) }), (t => { const { message: i, response: o } = t; e(i, o, o && s.decode(o.rawBody, this.encoding)) })); break } } post(t, e = (() => { })) { const s = t.method ? t.method.toLocaleLowerCase() : "post"; switch (t.body && t.headers && !t.headers["Content-Type"] && !t.headers["content-type"] && (t.headers["content-type"] = "application/x-www-form-urlencoded"), t.headers && (delete t.headers["Content-Length"], delete t.headers["content-length"]), void 0 === t.followRedirect || t.followRedirect || ((this.isSurge() || this.isLoon()) && (t["auto-redirect"] = !1), this.isQuanX() && (t.opts ? t.opts.redirection = !1 : t.opts = { redirection: !1 })), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient[s](t, ((t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status ? s.status : s.statusCode, s.status = s.statusCode), e(t, s, i) })); break; case "Quantumult X": t.method = s, this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then((t => { const { statusCode: s, statusCode: i, headers: o, body: r, bodyBytes: a } = t; e(null, { status: s, statusCode: i, headers: o, body: r, bodyBytes: a }, r, a) }), (t => e(t && t.error || "UndefinedError"))); break; case "Node.js": let i = require("iconv-lite"); this.initGotEnv(t); const { url: o, ...r } = t; this.got[s](o, r).then((t => { const { statusCode: s, statusCode: o, headers: r, rawBody: a } = t, n = i.decode(a, this.encoding); e(null, { status: s, statusCode: o, headers: r, rawBody: a, body: n }, n) }), (t => { const { message: s, response: o } = t; e(s, o, o && i.decode(o.rawBody, this.encoding)) })); break } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } queryStr(t) { let e = ""; for (const s in t) { let i = t[s]; null != i && "" !== i && ("object" == typeof i && (i = JSON.stringify(i)), e += `${s}=${i}&`) } return e = e.substring(0, e.length - 1), e } msg(e = t, s = "", i = "", o = {}) { const r = t => { const { $open: e, $copy: s, $media: i, $mediaMime: o } = t; switch (typeof t) { case void 0: return t; case "string": switch (this.getEnv()) { case "Surge": case "Stash": default: return { url: t }; case "Loon": case "Shadowrocket": return t; case "Quantumult X": return { "open-url": t }; case "Node.js": return }case "object": switch (this.getEnv()) { case "Surge": case "Stash": case "Shadowrocket": default: { const r = {}; let a = t.openUrl || t.url || t["open-url"] || e; a && Object.assign(r, { action: "open-url", url: a }); let n = t["update-pasteboard"] || t.updatePasteboard || s; if (n && Object.assign(r, { action: "clipboard", text: n }), i) { let t, e, s; if (i.startsWith("http")) t = i; else if (i.startsWith("data:")) { const [t] = i.split(";"), [, o] = i.split(","); e = o, s = t.replace("data:", "") } else { e = i, s = (t => { const e = { JVBERi0: "application/pdf", R0lGODdh: "image/gif", R0lGODlh: "image/gif", iVBORw0KGgo: "image/png", "/9j/": "image/jpg" }; for (var s in e) if (0 === t.indexOf(s)) return e[s]; return null })(i) } Object.assign(r, { "media-url": t, "media-base64": e, "media-base64-mime": o ?? s }) } return Object.assign(r, { "auto-dismiss": t["auto-dismiss"], sound: t.sound }), r } case "Loon": { const s = {}; let o = t.openUrl || t.url || t["open-url"] || e; o && Object.assign(s, { openUrl: o }); let r = t.mediaUrl || t["media-url"]; return i?.startsWith("http") && (r = i), r && Object.assign(s, { mediaUrl: r }), console.log(JSON.stringify(s)), s } case "Quantumult X": { const o = {}; let r = t["open-url"] || t.url || t.openUrl || e; r && Object.assign(o, { "open-url": r }); let a = t["media-url"] || t.mediaUrl; i?.startsWith("http") && (a = i), a && Object.assign(o, { "media-url": a }); let n = t["update-pasteboard"] || t.updatePasteboard || s; return n && Object.assign(o, { "update-pasteboard": n }), console.log(JSON.stringify(o)), o } case "Node.js": return }default: return } }; if (!this.isMute) switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": default: $notification.post(e, s, i, r(o)); break; case "Quantumult X": $notify(e, s, i, r(o)); break; case "Node.js": break }if (!this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } debug(...t) { this.logLevels[this.logLevel] <= this.logLevels.debug && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.debug}${t.map((t => t ?? String(t))).join(this.logSeparator)}`)) } info(...t) { this.logLevels[this.logLevel] <= this.logLevels.info && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.info}${t.map((t => t ?? String(t))).join(this.logSeparator)}`)) } warn(...t) { this.logLevels[this.logLevel] <= this.logLevels.warn && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.warn}${t.map((t => t ?? String(t))).join(this.logSeparator)}`)) } error(...t) { this.logLevels[this.logLevel] <= this.logLevels.error && (t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(`${this.logLevelPrefixs.error}${t.map((t => t ?? String(t))).join(this.logSeparator)}`)) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.map((t => t ?? String(t))).join(this.logSeparator)) } logErr(t, e) { switch (this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: this.log("", `❗️${this.name}, 错误!`, e, t); break; case "Node.js": this.log("", `❗️${this.name}, 错误!`, e, void 0 !== t.message ? t.message : t, t.stack); break } } wait(t) { return new Promise((e => setTimeout(e, t))) } done(t = {}) { const e = ((new Date).getTime() - this.startTime) / 1e3; switch (this.log("", `🔔${this.name}, 结束! 🕛 ${e} 秒`), this.log(), this.getEnv()) { case "Surge": case "Loon": case "Stash": case "Shadowrocket": case "Quantumult X": default: $done(t); break; case "Node.js": process.exit(1) } } }(t, e) }
