/**
 * Created by liuxinxin on 2018/1/3.
 */
require('es6-promise').polyfill();
var axios = require('./axios.min');

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.method === 'get') {
        !config.params && (config.params = {});
        config.params._cache_flag = (new Date()).getTime();
        if(!!config.params.disabledCache) {
            //禁止get请求加去缓存
            delete config.params._cache_flag;
        }
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

module.exports = axios;