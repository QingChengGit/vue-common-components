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
            rs[arrPara[1]] = arrPara[2];
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
    rs.pathname = a.pathname;
    rs.hash = a.hash.substr(1);
    rs.origin = a.origin;
    rs.queryObject = this.parseQueryString(url);
    a = null;

    return rs;
};

module.exports = util;