/**
 * Created by liuxinxin on 2017/8/7.
 */
var Vue = require('libs/vue'),
    page = require('../../page-vues/demo/demo-select'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});