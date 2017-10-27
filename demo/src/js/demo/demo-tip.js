/**
 * Created by xw on 2017/8/10.
 */
var Vue = require('libs/vue'),
    tip = require('../../page-vues/demo/demo-tip'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: tip,
        'frameWork': frame
    }
});