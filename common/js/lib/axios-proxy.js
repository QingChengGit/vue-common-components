/**
 * Created by liuxinxin on 2017/10/20.
 */
var axios = require('axios');

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.method === 'get') {
        !config.params && (config.params = {});
        //加此参数以便后端区分新旧get请求，方便做兼容性处理
        config.params.globalFlag = 'globalFlag';
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

axios.interceptors.response.use(function (response) {
    var d = response.data;

    // Do something with response data
    if(!d.success) {
        if(d.code == '2010') {
            //未登录状态
            location.href = '/shpt-frontend/login/html/index/login.html';
        }
        if(d.code == '2012') {
            //用户没有权限
            location.href = '/shpt-frontend/error/html/index/403.html';
        }
        if(d.code == '4000') {
            console.log("======500错误提示信息如下：");
            console.log("======url=====",response.config.url);
            console.log("======message=====", d.message);
            //服务器内部错误
            location.href = '/shpt-frontend/error/html/index/500.html';
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

module.exports = axios;