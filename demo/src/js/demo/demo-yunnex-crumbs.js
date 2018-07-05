var Vue = require('libs/vue'),
    crumbs = require('../../page-vues/demo/demo-yunnex-crumbs'),
    frame = require('common/components/frame-work/index');

new Vue({
    el: '#app',
    components: {
        app: crumbs,
        'frameWork': frame
    }
})