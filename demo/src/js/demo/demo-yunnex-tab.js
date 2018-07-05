var Vue = require('libs/vue'),
    tab = require('../../page-vues/demo/demo-yunnex-tab'),
    frame = require('common/components/frame-work/index');

new Vue({
    el: '#app',
    components: {
        app: tab,
        'frameWork': frame
    }
})