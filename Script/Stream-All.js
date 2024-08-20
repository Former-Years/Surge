const REQUEST_HEADERS = {
    'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
    'Accept-Language': 'en',
}

// 即将登陆
const STATUS_COMING = 2
// 支持解锁
const STATUS_AVAILABLE = 1
// 不支持解锁
const STATUS_NOT_AVAILABLE = 0
// 检测超时
const STATUS_TIMEOUT = -1
// 检测异常
const STATUS_ERROR = -2

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36'

    ; (async () => {
        let now = new Date();
        let hour = now.getHours();
        let minutes = now.getMinutes();
        hour = hour > 9 ? hour : "0" + hour;
        minutes = minutes > 9 ? minutes : "0" + minutes;

        let panel_result = {
            title: `解锁检测 | ${hour}:${minutes}`,
            content: '',
            icon: "play.circle",
            "icon-color": "#007aff",
        }

        let [{ region, status }] = await Promise.all([testDisneyPlus()])
        await Promise.all([check_chatgpt(), check_youtube_premium(), check_netflix()])
            .then((result) => {
                let disney_result = ''
                if (status == STATUS_COMING) {
                    disney_result = 'D: 即将登陆~' + region + ' |'
                } else if (status == STATUS_AVAILABLE) {
                    disney_result = 'D: \u2611' + region + ' |'
                } else if (status == STATUS_NOT_AVAILABLE) {
                    disney_result = 'D: \u2612 |'
                } else if (status == STATUS_TIMEOUT) {
                    disney_result = 'D: N/A |'
                }
                result.push(disney_result)
                let content = result.join('\n')

                panel_result['content'] = content
            })
            .finally(() => {
                $done(panel_result)
            })
    })()

async function check_chatgpt() {
    let inner_check = () => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'http://chat.openai.com/cdn-cgi/trace',
                headers: REQUEST_HEADERS,
            }
            $httpClient.get(option, function (error, response, data) {
                if (error != null || response.status !== 200) {
                    reject('Error')
                    return
                }

                if (data.indexOf('ChatGPT is not available in your country') !== -1) {
                    resolve('Not Available')
                    return
                }

                let country = data.split('\n').reduce((acc, line) => {
                    let [key, value] = line.split('=')
                    acc[key] = value
                    return acc
                }, {})

                let result = country.loc || 'US'
                resolve(result.toUpperCase())
            })
        })
    }

    let check_result = 'G: '

    await inner_check()
        .then((region) => {
            if (region === 'Not Available') {
                check_result += '\u2612 |'
            } else {
                check_result += '\u2611' + region + ' |'
            }
        })
        .catch((error) => {
            check_result += 'N/A |'
        })

    return check_result
}

async function check_youtube_premium() {
    let inner_check = () => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'https://www.youtube.com/premium',
                headers: REQUEST_HEADERS,
            }
            $httpClient.get(option, function (error, response, data) {
                if (error != null || response.status !== 200) {
                    reject('Error')
                    return
                }

                if (data.indexOf('Premium is not available in your country') !== -1) {
                    resolve('Not Available')
                    return
                }

                let region = ''
                let re = new RegExp('"countryCode":"(.*?)"', 'gm')
                let result = re.exec(data)
                if (result != null && result.length === 2) {
                    region = result[1].toUpperCase()
                } else if (data.indexOf('www.google.cn') !== -1) {
                    region = 'CN'
                } else {
                    region = 'US'
                }
                resolve(region)
            })
        })
    }

    let youtube_check_result = 'Y: '

    await inner_check()
        .then((region) => {
            if (region === 'Not Available') {
                youtube_check_result += '\u2612 |'
            } else {
                youtube_check_result += '\u2611' + region + ' |'
            }
        })
        .catch((error) => {
            youtube_check_result += 'N/A |'
        })

    return youtube_check_result
}

async function check_netflix() {
    let inner_check = (filmId) => {
        return new Promise((resolve, reject) => {
            let option = {
                url: 'https://www.netflix.com/title/' + filmId,
                headers: REQUEST_HEADERS,
            }
            $httpClient.get(option, function (error, response, data) {
                if (error != null) {
                    reject('Error')
                    return
                }

                if (response.status === 403) {
                    reject('Not Available')
                    return
                }

                if (response.status === 404) {
                    resolve('Not Found')
                    return
                }

                if (response.status === 200) {
                    let url = response.headers['x-originating-url']
                    let region = url.split('/')[3].split('-')[0].toUpperCase()
                    resolve(region)
                    return
                }

                reject('Error')
            })
        })
    }

    let netflix_check_result = 'N: '

    await inner_check(81280792)
        .then((region) => {
            if (region === 'Not Found') {
                return inner_check(80018499)
            }
            // 完整解锁
            netflix_check_result += '\u2611' + region + ' |'
            return Promise.reject('BreakSignal')
        })
        .then((region) => {
            if (region === 'Not Found') {
                return Promise.reject('Not Available')
            }
            // 仅解锁自制剧
            netflix_check_result += '⚠' + region + ' |'
            return Promise.reject('BreakSignal')
        })
        .catch((error) => {
            if (error === 'BreakSignal') {
                return
            }
            if (error === 'Not Available') {
                netflix_check_result += '\u2612 |'
                return
            }
            netflix_check_result += 'N/A |'
        })

    return netflix_check_result
}

async function testDisneyPlus() {
    try {
        let { region, cnbl } = await Promise.race([testHomePage(), timeout(7000)])

        let { countryCode, inSupportedLocation } = await Promise.race([getLocationInfo(), timeout(7000)])

        region = countryCode ?? region

        if (region != null) {
            region = region.toUpperCase()
        }

        // 即将登陆
        if (inSupportedLocation === false || inSupportedLocation === 'false') {
            return { region, status: STATUS_COMING }
        } else {
            return { region, status: STATUS_AVAILABLE }
        }

    } catch (error) {
        if (error === 'Not Available') {
            return { status: STATUS_NOT_AVAILABLE }
        }

        if (error === 'Timeout') {
            return { status: STATUS_TIMEOUT }
        }

        return { status: STATUS_ERROR }
    }

}

function getLocationInfo() {
    return new Promise((resolve, reject) => {
        let opts = {
            url: 'https://disney.api.edge.bamgrid.com/graph/v1/device/graphql',
            headers: {
                'Accept-Language': 'en',
                Authorization: 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',
                'Content-Type': 'application/json',
                'User-Agent': UA,
            },
            body: JSON.stringify({
                query: 'mutation registerDevice($input: RegisterDeviceInput!) { registerDevice(registerDevice: $input) { grant { grantType assertion } } }',
                variables: {
                    input: {
                        applicationRuntime: 'chrome',
                        attributes: {
                            browserName: 'chrome',
                            browserVersion: '94.0.4606',
                            manufacturer: 'apple',
                            model: null,
                            operatingSystem: 'macintosh',
                            operatingSystemVersion: '10.15.7',
                            osDeviceIds: [],
                        },
                        deviceFamily: 'browser',
                        deviceLanguage: 'en',
                        deviceProfile: 'macosx',
                    },
                },
            }),
        }

        $httpClient.post(opts, function (error, response, data) {
            if (error) {
                reject('Error')
                return
            }

            if (response.status !== 200) {
                reject('Not Available')
                return
            }

            data = JSON.parse(data)
            if (data?.errors) {
                reject('Not Available')
                return
            }

            let { location } = data?.extensions?.sdk?.session || {}
            let { inSupportedLocation, countryCode } = location || {}

            resolve({ inSupportedLocation, countryCode })
        })
    })
}

function testHomePage() {
    return new Promise((resolve, reject) => {
        let opts = {
            url: 'https://www.disneyplus.com/',
            headers: {
                'Accept-Language': 'en',
                'User-Agent': UA,
            },
        }

        $httpClient.get(opts, function (error, response, data) {
            if (error != null) {
                reject('Error')
                return
            }

            if (response.status !== 200 || data.indexOf('unavailable') !== -1) {
                reject('Not Available')
                return
            }

            let match = data.match(/Region: ([A-Za-z]{2})[\s\S]*?CNBL: ([12])/)
            if (!match) {
                resolve({ region: '', cnbl: '' })
                return
            }

            let region = match[1]
            let cnbl = match[2]
            resolve({ region, cnbl })
        })
    })
}

function timeout(delay = 5000) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject('Timeout')
        }, delay)
    })
}
