/**
 * Created by liuxinxin on 2017/5/22.
 */
var Vue = require('vue'),
    VueResource = require('vue-resource'),
    page = require('../page-vues/demo-table');

Vue.use(VueResource);
Vue.http.options.jsonp = 'jsonpcallback';
var t = new Vue({
    el: '#app',
    components: {
        app: page
    }
});