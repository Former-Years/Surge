const params = getParams($argument);
const provinceName = params.provname || "广东";
const apiUrls = [
    `https://apis.tianapi.com/oilprice/index?key=0502a67aa1632678f596891c4af219a8&prov=${encodeURIComponent(provinceName)}`,
    `https://apis.tianapi.com/oilprice/index?key=231de491563c35731436829ac52aad43&prov=${encodeURIComponent(provinceName)}`,
    `https://apis.tianapi.com/oilprice/index?key=a2bc7a0e01be908881ff752677cf94b7&prov=${encodeURIComponent(provinceName)}`,
    `https://apis.tianapi.com/oilprice/index?key=1bcc67c0114bc39a8818c8be12c2c9ac&prov=${encodeURIComponent(provinceName)}`,
    `https://apis.tianapi.com/oilprice/index?key=3c5ee42145c852de4147264f25b858dc&prov=${encodeURIComponent(provinceName)}`,
    `https://apis.tianapi.com/oilprice/index?key=d718b0f7c2b6d71cb3a9814e90bf847f&prov=${encodeURIComponent(provinceName)}`
];
let currentIndex = 0;

function testNextUrl() {
    if (currentIndex >= apiUrls.length) {
        console.log("所有URL都失败了");
        $done();
        return;
    }

    const apiUrl = apiUrls[currentIndex];

    $httpClient.get(apiUrl, (error, response, data) => {
        if (error) {
            console.log(`URL ${currentIndex + 1} 出错: ${error}`);
            currentIndex++;
            testNextUrl();
        } else {
            handleResponse(data);
        }
    });
}

function handleResponse(data) {
    const oilPriceData = JSON.parse(data);
    console.log(oilPriceData);

    if (oilPriceData.code === 200) {
        const oilPriceInfo = oilPriceData.result;

        const message = `0#柴油:${oilPriceInfo.p0}元 | 92汽油:${oilPriceInfo.p92}元\n95汽油:${oilPriceInfo.p95}元 | 98汽油:${oilPriceInfo.p98}元`;

        // 获取HTML内容以提取`tishiContent`
        $httpClient.get('http://m.qiyoujiage.com/', (error, response, data) => {
            if (error) {
                console.log(`获取HTML内容出错: ${error}`);
            } else {
                // 从HTML中提取`tishiContent`
                const tishiMatch = data.match(/var\s+tishiContent\s*=\s*"(.*?)"/);
                if (tishiMatch) {
                    let tishiContent = tishiMatch[1];
                    tishiContent = processTishiContent(tishiContent);

                    // 从`tishiContent`中提取动态的价格调整范围
                    const priceAdjustmentMatch = tishiContent.match(/(下调|上调)：(\d+\.\d+-\d+\.\d+)元\/升/);
                    let adjustmentType = priceAdjustmentMatch[1]; // "下调" 或 "上调"
                    const priceAdjustment = priceAdjustmentMatch[2] ? priceAdjustmentMatch[2] : "0.00-0.00";

                    // 替换下调为"降"，上调为"升"
                    adjustmentType = adjustmentType === "下调" ? "降" : "升";

                    // 提取并更新日期，修改为“9-21”这种格式
                    const dateMatch = tishiContent.match(/(\d{1,2})月(\d{1,2})日/);
                    const formattedDate = dateMatch ? `${dateMatch[1]}-${dateMatch[2]}` : "未知日期";

                    // 在标题中加入从`tishiContent`提取的动态日期和调整信息
                    const body = {
                        title: `今日油价 | ${formattedDate} ${adjustmentType}${priceAdjustment}元`,
                        content: `${message}`,
                        provname: params.provname,
                        icon: params.icon,
                        "icon-color": params.color
                    };
                    $done(body);
                } else {
                    console.log("提取`tishiContent`失败");
                }
            }
        });
    } else {
        console.log(`请求失败，错误信息：${oilPriceData.msg}`);
        currentIndex++;
        testNextUrl();
    }
}

function getParams(param) {
    return Object.fromEntries(
        param
            .split("&")
            .map((item) => item.split("="))
            .map(([k, v]) => [k, decodeURIComponent(v)])
    );
}

function processTishiContent(tishiContent) {
    // 提取并更新日期
    const dateMatch = tishiContent.match(/(\d{1,2}月\d{1,2}日\d{2}时)/);
    if (dateMatch) {
        const originalDate = dateMatch[1];
        const [month, day] = originalDate.match(/(\d{1,2})月(\d{1,2})日/).slice(1, 3);
        const currentDate = new Date();
        currentDate.setDate(parseInt(day) + 1);
        const newDay = currentDate.getDate();
        const newDate = `${month}月${newDay}日`;
        tishiContent = tishiContent.replace(originalDate, newDate);
    }

    // 删除多余的显示
    tishiContent = tishiContent
        .replace(/^油价/, '') // 删除开头的“油价”
        .replace(/调整<br\/>目前预计/, '') // 删除“调整<br/>目前预计”
        .replace(/\)，大家相互转告油价大跌了。$/, '') // 删除结尾的“)，大家相互转告油价大跌了。"
        .replace(/元\/升/, '', 1) // 删除第一个“元/升”
        .replace(/(\d+元\/吨\()/, '：'); // 将“380元/吨(”替换为“：”

    return tishiContent.trim();
}

testNextUrl();
