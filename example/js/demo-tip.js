/**
 * Created by xw on 2017/8/10.
 */
var Vue = require('vue'),
    tip = require('../page-vues/demo-tip'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: tip,
        'frameWork': frame
    }
});