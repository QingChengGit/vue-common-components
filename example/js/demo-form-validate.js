/**
 * Created by liuxinxin on 2017/8/7.
 */
var Vue = require('vue'),
    VueResource = require('vue-resource'),
    frame = require('common/components/frame-work/index');

Vue.use(VueResource);
var t = new Vue({
    el: '#app',
    components: {
        app: page
    }
});