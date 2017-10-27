/**
 * Created by liuxinxin on 2017/8/1.
 */
var Vue = require('libs/vue'),
    page = require('../../page-vues/demo/demo-date-picker'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});