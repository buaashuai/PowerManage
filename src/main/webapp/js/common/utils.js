var ua = navigator.userAgent.toLowerCase() || '',
    appVersion = navigator.appVersion.toLowerCase() || '',
    vendor = (navigator && navigator.vendor || '').toLowerCase();

function utils() {
}

var parseUrlParams = utils.parseUrlParams = function (str) {
    str || (str = '')
    var vars = str.split("&");
    var json = {};
    _.each(vars, function (pair) {
        pair = pair.split('=');
        json[pair[0]] = decodeURIComponent(pair[1] || '');
    })
    return json
}

var getUrlParams = utils.getUrlParams = function (key) {
        var query = window.location.search.substring(1);
        var json = parseUrlParams(query);

        utils.getUrlParams = function (k) {
            return k ? json[k] : json;
        };

        return key ? json[key] : json;
    }

// 处理模拟手机的参数，chrome iPhone6
// getUrlParams 函数提前是为了解决这个问题
;(function () {
    var isVMobile = utils.isVMobile = !_.isUndefined(getUrlParams('simulatemobile'))
    if (isVMobile) {
        appVersion = '5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'.toLowerCase()
        ua = ('Mozilla/' + appVersion).toLowerCase()
        vendor = 'Google Inc.'.toLowerCase()
    }
})();

var dmatcher = ua.match(/uxue\/(\d+(?:\.\d+)*)\s*(?:\(([^\)]*)\))?/i);
var isUX = utils.isUX = !!dmatcher;
var ni = utils.ni = {version: '0', features: {}}; // ni = native info
if (isUX) {
    // ["uxue/4.3 ", "4.3", undefined]
    // ["uxue/4.3 ()", "4.3", ""]
    // ["uxue/4.3 (jsbridge/0.1; other)", "4.3", "jsbridge/0.1; other"]
    ni.version = dmatcher[1] - 0;
    dmatcher[2] && _.each(dmatcher[2].split(/\s*;\s*/), function (f, i) {
        f = f.split('\/');
        ni.features[f[0]] = f[1] || true;
    });
}
var isSupportNativeJsBridge = utils.isSupportNativeJsBridge = !!ni.features.jsbridge;

var isWX = utils.isWX = /micromessenger/i.test(ua)
var isQQ = utils.isQQ = /\sqq\/\d/i.test(ua)
var isIphone = utils.isIphone = /iphone/i.test(ua);
var isIpad = utils.isIpad = /ipad/i.test(ua);
var isIpod = utils.isIpod = /ipod/i.test(ua);
var isIos = utils.isIos = isIphone || isIpad || isIpod;
var isAndroid = utils.isAndroid = /android/i.test(ua);
var isAndroidPhone = utils.isAndroidPhone = isAndroid && /mobile/i.test(ua);
var isAndroidTablet = utils.isAndroidTablet = isAndroid && !/mobile/i.test(ua);
var isBlackberry = utils.isBlackberry = /blackberry/i.test(ua);
var isCoolpad = utils.isCoolpad = /coolpad/i.test(ua);
var isMac = utils.isMac = /mac/i.test(appVersion);
var isWindows = utils.isWindows = /win/i.test(appVersion);
var isWindowsPhone = utils.isWindowsPhone = isWindows && /phone/i.test(ua);
var isWindowsTablet = utils.isWindowsTablet = isWindows && !isWindowsPhone
    && /touch/i.test(ua);
var isMobile = utils.isMobile = isIphone || isIpod || isAndroidPhone
    || isBlackberry || isWindowsPhone || isCoolpad;
var isTablet = utils.isTablet = isIpad || isAndroidTablet || isWindowsTablet;
var isDesktop = utils.isDesktop = !isMobile && !isTablet;
var isTouchDevice = utils.isTouchDevice = 'ontouchstart' in window
    || 'DocumentTouch' in window && document instanceof DocumentTouch;

var isSupportUXH5VOD = utils.isSupportUXH5VOD = function () {
    if (!isUX) return false;
    // if (isAndroid && ni.version == 10076) return true;
    // android 下不采用 H5 播放器
    if (isAndroid) return false;
    if (isIos && ni.version >= 10009) return true;
    return false
}();

// 这个版本下 udk 的 API 有较大改变
utils.is769 = function () {
    if (!isUX) return false;
    if (isAndroid && ni.version >= 10076) return true;
    if (isIos && ni.version >= 10009) return true;
    return false
}();

var getVersion = utils.getVersion = function () {
    return ni.version - 0;
};

// 当前 jsbridge 版本
var isJSB = utils.isJSB = function () {
    var jbv = 0
    if (ni && ni.features && ni.features.jsbridge) {
        jbv = ni.features.jsbridge - 0
    }
    return function (v) {
        return jbv >= v
    };
}();

// jsbridge 是否大于 2
var isJsBridgeV2 = utils.isJsBridgeV2 = function () {
    return isJSB(2)
}();

// build a 'comparator' object for various comparison checks
var comparator = {
    '<': function (a, b) {
        return a < b;
    },
    '<=': function (a, b) {
        return a <= b;
    },
    '>': function (a, b) {
        return a > b;
    },
    '>=': function (a, b) {
        return a >= b;
    }
}

// helper function which compares a version to a range
function compareVersion(version, range) {
    var string = (range + '');
    var n = +(string.match(/\d+/) || NaN);
    var op = string.match(/^[<>]=?|/)[0];
    return comparator[op] ? comparator[op](version, n) : (version == n || n !== n);
}

var isIe = utils.isIe = function (range) {
    var match = ua.match(/(?:msie |trident.+?; rv:)(\d+)/);
    return match !== null && compareVersion(match[1], range);
}
var isOpera = utils.isOpera = function (range) {
    var match = ua.match(/(?:^opera.+?version|opr)\/(\d+)/);
    return match !== null && compareVersion(match[1], range);
};
var isChrome = utils.isChrome = function (range) {
    var match = /google inc/.test(vendor) ? ua.match(/(?:chrome|crios)\/(\d+)/) : null;
    return match !== null && !isOpera() && compareVersion(match[1], range);
};

// ios 版本正在审核中
var inIosChecking = utils.inIosChecking = isUX && isIos && ni.version >= 10017

// var inIosChecking = false

function _connector(url) {
    return url.indexOf('?') === -1 ? '?' : '&';
}

var url = utils.url = function (url, params) {
    var u = url || '',
        // 提取 url 中包含的 {\w+}
        match = u.match(/\{(\w+?)\}/gi)
    // console.log(match)
    if (match && params) { // 填充 params 中的参数
        var s = []
        _.each(match, function (ks) {
            var k = ks.replace(/^\{(.*)\}$/, '$1')
            if (typeof params[k] === 'undefined') return;
            u = u.replace(ks, params[k])
            s.push(k)
        })
        params = _.omit(params, s)
    }

    if (!_.isEmpty(params)) {
        u += _connector(u) + $.param(params)
    }

    return u
}

var _hostname = location.hostname, _pathname = location.pathname
var isPcdebug = utils.isPcdebug = !_.isUndefined(getUrlParams('pcdebug'))
var isDebug = utils.isDebug = !_.isUndefined(getUrlParams('debug'))
var isOnline = utils.isOnline = /uxuejiaoyu.com$/.test(_hostname) && !/^\d{4}$/.test(location.port)
var isMainSite = utils.isMainSite = /^(?:www|m|wechat|pigai)\./.test(_hostname)
var isExamSite = utils.isExamSite = /^\/page\/use/.test(_pathname)
var isPigai = utils.isPigai = /^m?pigai\./.test(_hostname)
var isTools = utils.isTools = /^\/page\/tools/.test(_pathname)

utils.isFromEtic = /^https?\:\/\/\w+\.claonline\.cn/.test(document.referrer || '')

// 支付平台
var getPayPlatform = utils.getPayPlatform = function (platfrom) {
    var result = ''
    switch (platfrom) {
        case 'm':
            result = 'wap'
            break;
        case 'www':
            result = 'pc'
            break;
        case 'wechat':
            result = 'wechat'
            break;
        case 'android':
        case 'ios':
        case 'app':
            result = 'app'
            break;
    }
    return result
}
// 支付平台中文对照名称
utils.getPayPlatformZHName = function (platfrom) {
    var result = ''
    switch (platfrom) {
        case 'wap':
            result = '手机浏览器'
            break;
        case 'pc':
            result = '电脑'
            break;
        case 'wechat':
            result = '微信'
            break;
        case 'app':
            result = 'U学教育APP'
            break;
    }
    return result
}

var productName = utils.productName = 'U学教育';
var setTitle = utils.setTitle = function (txt) {
    // document.title = txt + ' - ' + productName
    if (isUX && isSupportUXH5VOD) {
        udk.setWebViewTitle({title: txt})
    } else {
        document.title = txt
    }

    // 设置分享
    window.udk && udk.share({
        silence: true,
        title: txt + ' - ' + productName,
        desc: 'U学教育，更懂你的学习平台，一切努力，只为你过！',
        imgUrl: 'http://s.uxuejiaoyu.cc/img/ic_launcher.png',
        link: location.href
    })
}

// 获取所在平台名称
var getPlatform = utils.getPlatform = function () {
    var pf = 'www'
    if (isWX && !isPigai) {
        pf = 'wechat'
    } else if (isMobile || isTablet) {
        pf = 'm'
    }
    return pf
}

var getTongjiPlatform = utils.getTongjiPlatform = function () {
    var pf = 'other'
    if (isUX) {
        pf = 'app_' + (isAndroid ? 'android' : 'ios')
    } else if (isWX) {
        pf = 'wechat_' + (isAndroid ? 'android' : 'ios')
    } else if (isMobile || isTablet) {
        pf = 'm_' + (isAndroid ? 'android' : 'ios')
    } else if (isDesktop) {
        pf = 'www'
    }
    return pf
}

utils.errorTip = function (error) {
    $.tips ? $.tips({content: error, stayTime: 3000, type: 'warn'}) : alert(error)
}

utils.wrapNumber = function (txt) {
    txt || (txt = '')
    return txt.replace(/(\d+)/gm, '<span class="number">$1</span>')
}

utils.voidUrl = 'javascript:void(0);'

utils.stopEvent = function (evt) {
    evt.stopPropagation()
    evt.preventDefault()
}

utils.alert = function (msg, fn, txt) {
    var dia = $.dialog({
        title: '提示：',
        content: msg,
        button: [txt || '确定']
    })
    fn && dia.on("dialog:hide", function (e) {
        fn()
    });
}
utils.formatFloat = function (f, digit) {
    var m = Math.pow(10, digit);
    return parseInt(f * m, 10) / m;
}
// 主要针对 APP 环境下，一些本地资源打开的页面，需要完整的 url 地址
utils.getAbsoluteUrl = function (url) {
    if (!isUX || /^https?\:\/\//.test(url) || !/^\//.test(url)) return url;
    return 'http://m.uxuejiaoyu.com' + url
}

// 格式化价格
utils.priceHtml = function (val) {
    return [
        '<span class="price">',
        '<span class="unit">￥</span>',
        '<span class="value">' + val + '</span>',
        '</span>'
    ].join('')
}

utils.getWapIndexUrl = function (urlString, cateId, subcateId) {
    // if (!isLogin) {
    //   cateId = subcateId = '0'
    // }
    return urlString.replace('{cate}', cateId || '0')
        .replace('{subcate}', subcateId || '0');
}

// 滚动到指定位置
utils.animateScrollTo = function (cval, tval, callback) {
    var f = 30, dval = tval - cval

    function __run() {
        dval = dval / 2
        if (Math.abs(dval) > 1) {
            cval += dval
            callback(Math.round(cval))
            window.setTimeout(__run, f)
        } else {
            callback(tval)
        }
    }

    __run()
}

// 百度事件统计
// _hmt.push(['_trackEvent', category, action, opt_label, opt_value]);
utils.trackEvent = function (arr) {
    var aa = ['_trackEvent'].concat(arr || [])
    window._hmt && _hmt.push(aa);
}

// 客服 QQ 群
utils.getQQServiceUrl = function () {
    var url = ''
    switch (UxueBoot.platform) {
        case 'android':
            url = 'mqqopensdkapi://bizAgent/qm/qr?url=http%3A%2F%2Fqm.qq.com%2Fcgi-bin%2Fqm%2Fqr%3Ffrom%3Dapp%26p%3Dandroid%26k%3DexQgzO4IJ71J1EDXWxrLx1zRyNv5J3OX'
            break
        case 'ios':
            url = 'mqqapi://card/show_pslcard?src_type=internal&version=1&uin=601257399&key=615beee64f97b9fe91b6275d3be4226d8b5e37261b6eb6e6e1fa9f54d728afb9&card_type=group&source=external'
            break
        case 'www':
            url = 'http://wpa.qq.com/msgrd?v=3&uin=601257399&site=qq&menu=yes'
            break
        case 'wechat':
            url = 'http://shang.qq.com/wpa/qunwpa?idkey=615beee64f97b9fe91b6275d3be4226d8b5e37261b6eb6e6e1fa9f54d728afb9'
            break
        case 'm':
            url = 'mqqwpa://im/chat?chat_type=wpa&uin=601257399&version=1&src_type=web&web_src=oicqzone.com'
            break
        default:
            url = 'javascript:void(0);'
            break
    }
    return url
}

utils.iOSAuditVer = 10017
utils.isIOSNewVersion = function () {
    if (utils.isIos && utils.ni.version >= utils.iOSAuditVer) {
        return true;
    } else {
        return false;
    }

}
if (!window.PM) {
    window.PM = {};
}
window.PM.utils = utils;