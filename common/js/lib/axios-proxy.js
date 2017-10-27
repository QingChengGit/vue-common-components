/**
 * Created by liuxinxin on 2017/10/20.
 */
var axios = require('axios');

axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    if(config.method === 'get') {
        //兼容新旧页面的get接口处理
        config.params.globalFlag = 'globalFlag';
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
            location.href = '/login/html/index/login.html';
        }
        if(d.code == '2012') {
            //用户没有权限
            location.href = '/error/html/index/403.html';
        }
        if(d.code == '4000') {
            //服务器内部错误
            location.href = '/error/html/index/500.html';
        }
    }
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

module.exports = axios;