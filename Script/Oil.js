/*
 * Surge 今日油价面板
 * 通过 argument=...&provname=广东 修改省份地区。
 * 预报属于预测，不代表发改委正式调价结果。
 */
(function () {
  'use strict';

  var SOURCE = 'https://www.itlaoli.com/zb_users/plugin/oilprice/page.php';
  var PROVINCES = '北京 上海 天津 重庆 青海 西藏 广西 新疆 宁夏 内蒙古 甘肃 陕西 云南 贵州 四川 海南 广东 湖南 湖北 河南 山东 江西 福建 安徽 浙江 江苏 黑龙江 吉林 辽宁 山西 河北'.split(' ');
  var CITY_ALIASES = {
    '广州':'广东','深圳':'广东','佛山':'广东','东莞':'广东','中山':'广东','珠海':'广东','惠州':'广东','江门':'广东','汕头':'广东','湛江':'广东','肇庆':'广东','番禺':'广东',
    '南宁':'广西','桂林':'广西','柳州':'广西',
    '杭州':'浙江','宁波':'浙江','温州':'浙江',
    '南京':'江苏','苏州':'江苏','无锡':'江苏',
    '成都':'四川','绵阳':'四川',
    '武汉':'湖北','长沙':'湖南','郑州':'河南','济南':'山东','青岛':'山东',
    '厦门':'福建','福州':'福建','泉州':'福建',
    '合肥':'安徽','南昌':'江西','海口':'海南','三亚':'海南',
    '昆明':'云南','贵阳':'贵州','兰州':'甘肃','西安':'陕西',
    '沈阳':'辽宁','大连':'辽宁','长春':'吉林','哈尔滨':'黑龙江',
    '呼和浩特':'内蒙古','乌鲁木齐':'新疆','银川':'宁夏','拉萨':'西藏','西宁':'青海','太原':'山西','石家庄':'河北'
  };
  var sent = false;

  function argsParse(str) {
    var a = {};
    String(str || '').split('&').forEach(function (pair) {
      var pos = pair.indexOf('=');
      if (pos < 0) return;
      var key = pair.slice(0, pos), value = pair.slice(pos + 1);
      try { key = decodeURIComponent(key.replace(/\+/g, ' ')); } catch (_) {}
      try { value = decodeURIComponent(value.replace(/\+/g, ' ')); } catch (_) {}
      a[key] = value;
    });
    return a;
  }
  var opt = argsParse(typeof $argument === 'undefined' ? '' : $argument);
  var prefix = opt.title || '今日油价';
  var icon = opt.icon || 'fuelpump.circle.fill';
  var color = opt.color || '#3b5fb0';

  function normalizeProvince(value) {
    var v = String(value || '广东').trim().replace(/\s+/g, '');
    if (v === '全国' || v === '全国均价') return '全国均价';
    if (v === '内蒙古自治区') v = '内蒙古';
    else if (v === '广西壮族自治区') v = '广西';
    else if (v === '宁夏回族自治区') v = '宁夏';
    else if (v === '新疆维吾尔自治区') v = '新疆';
    else if (v === '西藏自治区') v = '西藏';
    else v = v.replace(/(特别行政区|自治区|省|市|区)$/, '');
    if (CITY_ALIASES[v]) v = CITY_ALIASES[v];
    return PROVINCES.indexOf(v) >= 0 ? v : null;
  }
  var province = normalizeProvince(opt.provname || '广东');

  function finish(title, lines) {
    if (sent) return;
    sent = true;
    $done({
      title: title,
      content: lines.join('\n'),
      icon: icon,
      'icon-color': color
    });
  }
  function fail(reason) {
    finish(prefix + ' | 数据获取失败', [reason, '数据来源：itlaoli（未使用旧接口）']);
  }
  function safeNumber(s) { return Number(String(s || '').replace(/,/g, '')); }
  function valid(n, lo, hi) { return isFinite(n) && n >= lo && n <= hi; }
  function fmt(n) { return Number(n).toFixed(2); }
  function pad(n) { return ('0' + Number(n)).slice(-2); }
  function dayStr(y, m, d) { return String(y) + '-' + pad(m) + '-' + pad(d); }
  function todayCN() { return new Date(Date.now() + 28800000).toISOString().slice(0, 10); }
  function dayDiff(date) {
    if (!/^20\d\d-\d\d-\d\d$/.test(date || '')) return NaN;
    return (Date.parse(todayCN() + 'T00:00:00Z') - Date.parse(date + 'T00:00:00Z')) / 86400000;
  }
  function shortDate(ymd) { return ymd ? ymd.slice(5) : '?'; }
  function htmText(html) {
    return String(html || '')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&nbsp;|&#160;|&#xA0;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/\s+/g, ' ').trim();
  }
  function escapeRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }

  // 优先按真实 HTML 表格的 TR/TD 取价格；不能把「每升涨跌」误判成价格列。
  function getPriceValues(text, html) {
    var rows = String(html || '').match(/<tr\b[^>]*>[\s\S]*?<\/tr\s*>/gi) || [];
    for (var i = 0; i < rows.length; i++) {
      var cells = rows[i].match(/<(?:td|th)\b[^>]*>[\s\S]*?<\/(?:td|th)\s*>/gi) || [];
      if (cells.length < 5 || htmText(cells[0]) !== province) continue;
      var prices = [];
      for (var k = 1; k < 5; k++) {
        // 单元格可能是 8.91<br>+0.28 或 8.91<span>⤴︎ +0.28</span>，只取第一个油价。
        var cellText = htmText(cells[k]);
        var m = cellText.match(/(?:^|[^\d])([0-9]{1,2}(?:\.[0-9]{1,3})?)(?!\d)/);
        if (!m) { prices = []; break; }
        prices.push(Number(m[1]));
      }
      if (prices.length === 4) return prices;
    }

    // 兼容价格表没有 tr/td 的网页：截取当前省份到下一省份之间的一行数据。
    var sectionStart = text.indexOf('各省今日油价');
    if (sectionStart < 0) return null;
    var sectionEnd = text.indexOf('挂牌价数据日期', sectionStart);
    var area = text.slice(sectionStart, sectionEnd > sectionStart ? sectionEnd : sectionStart + 15000);
    var regionRe = new RegExp('(?:^|\\s)' + escapeRe(province) + '(?=\\s)');
    var match = regionRe.exec(area);
    if (!match) return null;
    var line = area.slice(match.index + match[0].length);
    var allRegions = PROVINCES.concat(['全国均价']);
    var nextMatch = new RegExp('(?:^|\\s)(?:' + allRegions.map(escapeRe).join('|') + ')(?=\\s)').exec(line);
    if (nextMatch) line = line.slice(0, nextMatch.index);
    else line = line.slice(0, 200);
    // 同页涨跌通常是 +0.28、-0.20 等；过滤低于 3 元的变化额。
    var nums = line.match(/[+-]?\d{1,2}(?:\.\d+)?/g) || [];
    var prices2 = nums.map(safeNumber).filter(function (n) { return valid(n, 3, 30); });
    return prices2.length >= 4 ? prices2.slice(0, 4) : null;
  }

  function readNext(text, generatedDay) {
    var forecastSection = text.slice(Math.max(0, text.indexOf('下一轮油价调整预报')));
    var dateMatch = forecastSection.match(/下次调整时间[\s\S]{0,350}?(\d{1,2})\s*月\s*(\d{1,2})\s*日\s*24\s*时/);
    if (!dateMatch || !generatedDay) return null;
    var year = Number(generatedDay.slice(0, 4));
    if (!valid(Number(dateMatch[1]), 1, 12) || !valid(Number(dateMatch[2]), 1, 31)) return null;
    var nextBase = dayStr(year, dateMatch[1], dateMatch[2]);
    if (nextBase < generatedDay) nextBase = dayStr(year + 1, dateMatch[1], dateMatch[2]);
    var dayMillis = Date.parse(nextBase + 'T00:00:00Z');
    if (!isFinite(dayMillis)) return null;
    var windowDate = new Date(dayMillis + 86400000).toISOString().slice(0, 10);
    var daysFromPage = (Date.parse(nextBase + 'T00:00:00Z') - Date.parse(generatedDay + 'T00:00:00Z')) / 86400000;
    var timestamp = Date.parse(windowDate + 'T00:00:00+08:00');
    if (!valid(daysFromPage, 0, 45) || !isFinite(timestamp) || timestamp <= Date.now()) return null;
    return { day: windowDate, label: shortDate(windowDate) + ' 00:00' };
  }

  function readForecast(text, next) {
    if (!next) return null;
    var start = text.indexOf('下一轮油价调整预报');
    if (start < 0) return null;
    var section = text.slice(start).split('加油费用计算器')[0];
    var updated = section.match(/预报数据更新于\s*(20\d\d-\d\d-\d\d)(?:T(\d\d:\d\d))?/);
    var change = section.match(/预计\s*(上调|下调|上涨|下降)\s*(?:油价\s*)?(\d{1,4}(?:\.\d+)?)\s*元\s*[\/／]\s*吨/);
    if (!updated || !change || !valid(dayDiff(updated[1]), 0, 2)) return null;
    var ton = safeNumber(change[2]);
    if (!valid(ton, 1, 3000)) return null;
    var direction = /上/.test(change[1]) ? '上涨' : '下跌';
    var perLitre = section.match(/(?:上涨|下降|下跌|上调|下调)\s*(\d+(?:\.\d+)?)\s*[~～－—–-]\s*(\d+(?:\.\d+)?)\s*元\s*[\/／]\s*升/);
    var progress = section.match(/已进行\s*(\d+)\s*个工作日/);
    var rate = section.match(/原油变化率\s*(?:为|：|:)\s*([+-]?\d+(?:\.\d+)?)\s*%/);
    var output = { direction:direction, ton:ton, updated:updated[1], clock:updated[2] || '', step: progress ? Number(progress[1]) : null };
    if (perLitre && valid(Number(perLitre[1]), 0, 4) && valid(Number(perLitre[2]), 0, 4)) {
      output.low = Number(perLitre[1]); output.high = Number(perLitre[2]);
    }
    if (rate && valid(Number(rate[1]), -100, 100)) output.rate = Number(rate[1]);
    return output;
  }

  function render(html) {
    var t = htmText(html);
    var generated = t.match(/页面生成\s*[：:]\s*(20\d\d-\d\d-\d\d)(?:\s+\d\d:\d\d)?/);
    if (!generated) return fail('油价网页缺少更新时间，稍后刷新');
    var age = dayDiff(generated[1]);
    if (!valid(age, 0, 7)) return fail('油价网页未及时更新，拒绝显示旧数据');

    var published = t.match(/挂牌价数据日期\s*[：:]\s*(20\d\d-\d\d-\d\d)/);
    var dateAge = published ? dayDiff(published[1]) : age;
    var values = getPriceValues(t, html);
    // 挂牌价不要求每天换日期：每轮成品油调价生效后才更新价格。
    var pricesOK = values && valid(dateAge, 0, 30) &&
      valid(values[0], 4, 25) && valid(values[1], values[0], 30) &&
      valid(values[2], values[1], 35) && valid(values[3], 3, 25);
    var next = readNext(t, generated[1]);
    var prediction = readForecast(t, next);

    // 用旧版图2的单行标题和两行价格，避免预测说明挤占面板。
    var title = prefix + ' | ' + (next ? shortDate(next.day) : '下轮待公布');
    if (prediction) {
      var arrow = prediction.direction === '上涨' ? '⤴︎ ' : '⤵︎ ';
      title += ' ' + arrow + (typeof prediction.low === 'number'
        ? fmt(prediction.low) + '-' + fmt(prediction.high) + '元'
        : prediction.ton + '元/吨');
    }
    if (!pricesOK) return finish(title, [province + '油价获取失败，请稍后刷新']);
    finish(title, [
      '0#柴油: ' + fmt(values[3]) + '元 | 92汽油: ' + fmt(values[0]) + '元',
      '95汽油: ' + fmt(values[1]) + '元 | 98汽油: ' + fmt(values[2]) + '元'
    ]);
  }

  if (!province) return fail('地区无效：请将 provname 设为省份名称');
  try {
    $httpClient.get({
      url: SOURCE,
      timeout: 20,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Cache-Control': 'no-cache'
      }
    }, function (err, res, body) {
      var status = res && (res.status || res.statusCode);
      if (err || !body || (status && (status < 200 || status >= 300))) return fail('itlaoli 请求失败，请检查网络后刷新');
      try { render(String(body)); }
      catch (e) {
        console.log('Oil.js 解析错误: ' + String(e));
        fail('油价网页格式变化，解析失败');
      }
    });
  } catch (e) { fail('Surge 无法发起油价网络请求'); }
})();
