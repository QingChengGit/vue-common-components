/**
 * Created by liuxinxin on 2017/8/9.
 */
var Vue = require('libs/vue'),
    page = require('../../page-vues/demo/demo-cr-box'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});