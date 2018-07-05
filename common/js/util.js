/**
 * Created by liuxinxin on 2017/7/3.
 */
var util = createEmptyObject(),
    toString = Object.prototype.toString;
(function() {
    var types = ['String', 'Number', 'Object', 'Function', 'Array'],
        i = 0,
        l = types.length;

    for(i;i < l;i++){
        util['is' + types[i]] = (function(_type) {
            return function(val) {
                return toString.call(val) === '[object ' + _type + ']';
            };
        })(types[i]);
    }
})();
function createEmptyObject() {
    return Object.create ? Object.create(null) : {};
}
util.clone = function clone(source, isDeep) {
    var rs,
        p,
        l;

    if(util.isArray(source)){
        l = source.length;
        rs = new Array(l);
        while(l--){
            rs[l] = clone(source[l], isDeep);
        }
    }else if(util.isObject(source)){
        if(isDeep){
            rs = JSON.parse(JSON.stringify(source));
        }else{
            rs = createEmptyObject();
            for(p in source){
                rs[p] = source[p];
            }
        }
    }else{
        rs = source;
    }

    return rs;
};
/*
    target、source  [Object]
    将source对象的属性复制到target中，如果属性名一样source将会覆盖target同名属性的值
 */
util.extend = function extend(target, source) {
    var p;

    if(util.isObject(target) && util.isObject(source)) {
        for(p in source) {
            if(source.hasOwnProperty(p)) {
                target[p] = source[p];
            }
        }
    }
};
util.parseQueryString = function parseQueryString(str) {
    var regUrl = /^[^\?]+\?([\w\W]+)$/,
        regPara = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arrUrl = regUrl.exec(str),
        arrPara,
        strPara,
        rs = {};

    if (arrUrl && arrUrl[1]) {
        strPara = arrUrl[1];
        while ((arrPara = regPara.exec(strPara)) != null) {
            rs[arrPara[1]] = escape(arrPara[2]);
        }
    }
    return rs;
};
util.getUrlInfo = function getUrlInfo(url) {
    var a = document.createElement('a'),
        rs = createEmptyObject(),
        protocolMap = {
            'http': 80,
            'https': 443
        };

    a.href = url;
    rs.host = a.host;
    rs.protocol = a.protocol;
    rs.port = a.port || protocolMap[rs.protocol.replace(':', '')];
    rs.searchStr = a.search;
    rs.pathname = a.pathname.substr(0, 1) === '/' ? a.pathname : '/' + a.pathname;
    rs.hash = decodeURIComponent(a.hash.substr(1));
    rs.origin = a.origin;
    rs.queryObject = this.parseQueryString(url);
    a = null;

    return rs;
};
/*
    格式化日期函数。
    date：需要格式化的日期对象
    splitStr: 年月日之间的分隔字符串
    如果有传入第三四个参数(boolean类型)则将第三个代表是否需要返回时分，第四个参数代表是否需要返回秒。默认不返回时分秒
 */
util.formatDate = function formatDate(date, splitStr) {
    var year,
        month,
        day,
        hour,
        minutes,
        sec,
        rs = '';

    if(!date || !(date instanceof Date)) {
        return;
    }
    year = date.getFullYear();
    month = date.getMonth();
    month = (month >= 9 ? '' : '0') + (month + 1);
    day = date.getDate();
    day = (day >= 10 ? '' : '0') + day;
    hour = date.getHours();
    hour = (hour >= 10 ? '' : '0') + hour;
    minutes = date.getMinutes();
    minutes = (minutes >= 10 ? '' : '0') + minutes;
    sec = date.getSeconds();
    sec = (sec >= 10 ? '' : '0') + sec;

    rs = year + splitStr + month + splitStr + day + ' ';
    !!arguments[2] && (rs += hour + ':' + minutes);
    !!arguments[3] && (rs += ':' + sec);

    return rs.trim();
};
/*
 新的格式化日期函数。
 date：需要格式化的日期对象
 mode: 输出的日期的模式，mode可取值为:Year, Month, Day, Hour, Minute, Second其中之一。默认为Day
 dateSplitStr: 年月日之间的分隔字符串,默认为'-'
 timeSplitStr: 时分秒之间的分隔字符串,默认为':'
 */
util.formatDateNew = function formatDateNew(date, mode, dateSplitStr, timeSplitStr) {
	var year,
		month,
		day,
		hour,
		minutes,
		sec,
		rs = '',
        modeMap = {
	        'Year': 'YYYY',
            'Month': 'YYYY-MM',
            'Day': 'YYYY-MM-DD',
            'Hour': 'YYYY-MM-DD hh',
            'Minute': 'YYYY-MM-DD hh:mm',
            'Second': 'YYYY-MM-DD hh:mm:ss'
        };

	if(!date || !(date instanceof Date)) {
		return;
	}
	mode = mode || 'Day';
	if(!modeMap[mode]) {
		console.warn('日期格式化默认不合法!模式只能是Year, Month, Day, Hour, Minute, Second其中之一');
	}
	dateSplitStr = dateSplitStr || '-';
	timeSplitStr = timeSplitStr || ':';
	year = date.getFullYear();
	month = date.getMonth();
	month = (month >= 9 ? '' : '0') + (month + 1);
	day = date.getDate();
	day = (day >= 10 ? '' : '0') + day;
	hour = date.getHours();
	hour = (hour >= 10 ? '' : '0') + hour;
	minutes = date.getMinutes();
	minutes = (minutes >= 10 ? '' : '0') + minutes;
	sec = date.getSeconds();
	sec = (sec >= 10 ? '' : '0') + sec;

	rs = year + '-' + month + '-' + day + ' ';
	rs += hour + ':' + minutes;
	rs += ':' + sec;

	rs = rs.substr(0, modeMap[mode].length);
	rs = rs.replace(/-/g, dateSplitStr).replace(/:/, timeSplitStr);
	return rs;
};
util.downLoadByLink = function downLoadByLink(url) {
	var link,
		evt;
	
	link = document.createElement('a');
	link.href = url;
	if(document.fireEvent) {
		window.open(link.href);
	}else {
		evt = document.createEvent('MouseEvents');
		evt.initEvent('click', true, true);
		link.dispatchEvent(evt);
	}
};
/*
    鉴于js的浮点型数字计算会出现精度问题，加以下方法。
    accAdd函数：加法的精准计算。example: ulit.accAdd(arg1,arg2); arg1: 被加数 ， arg2: 加数
    accSub函数: 减法的精准计算。example：ulit.accSub(arg1,arg2); arg1: 被减数 ， arg2: 减数
    accMul函数：乘法的精准计算。example: ulit.accMul(arg1,arg2); arg1: 被乘数 ， arg2: 乘数
    accDiv函数: 除法的精准计算。example：ulit.accDiv(arg1,arg2); arg1: 被除数 ， arg2: 除数
 */

util.accAdd = function accAdd(arg1,arg2) {
    var r1,
        r2,
        m; 
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e){ r1 = 0 } 

    try {
        r2=arg2.toString().split(".")[1].length
    } catch(e){ r2 = 0 } 

    m = Math.pow(10,Math.max(r1,r2)) 

    return (arg1*m+arg2*m)/m 
}

util.accSub = function accSub(arg1,arg2) {
    var r1,
        r2,
        m,
        n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch(e){ r1 = 0 }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch(e){r2=0}

    m=Math.pow(10,Math.max(r1,r2));

    n = (r1>=r2)?r1:r2;

    return +((arg1*m-arg2*m)/m).toFixed(n);
}

util.accMul = function accMul(arg1,arg2){
    var m = 0, 
    s1 = arg1.toString(), 
    s2 = arg2.toString();

    try { 
      m += s1.split(".")[1].length 
    } catch (e) { }

    try { 
     m += s2.split(".")[1].length 
    } catch (e) { }

    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

util.accDiv = function accDiv(arg1,arg2){
    var t1 = 0,
        t2 = 0,
        r1,
        r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length;
    } catch (e) {}
    
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
        
    return (r1 / r2) * Math.pow(10, t2 - t1);
}

module.exports = util;