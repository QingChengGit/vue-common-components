/**
 * Created by liuxinxin on 2017/8/1.
 */
var Vue = require('vue'),
    VueResource = require('vue-resource'),
    page = require('../page-vues/demo-date-picker'),
    frame = require('common/components/frame-work/index');

Vue.use(VueResource);
var t = new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});