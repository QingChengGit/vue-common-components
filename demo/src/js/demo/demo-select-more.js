var Vue = require('libs/vue'),
    page = require('../../page-vues/demo/demo-select-more'),
    frame = require('common/components/frame-work/index');

var t = new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});