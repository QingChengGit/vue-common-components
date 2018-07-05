
var Vue = require('libs/vue'),
    yunnexswitch = require('../../page-vues/demo/demo-switch'),
    index = require('common/components/frame-work/index');

    var vm = new Vue({
        el: '#app',
        components: {
            app: yunnexswitch,
            'frameWork': index
        }
});