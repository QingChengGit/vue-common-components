var Vue = require('libs/vue'),
    page = require('../../page-vues/demo/demo-yunnex-hint'),
    frame = require('common/components/frame-work/index');

new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
});