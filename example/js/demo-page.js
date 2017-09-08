// import Vue from 'vue';


var Vue = require('vue'),
    VueResource = require('vue-resource'),
    page = require('../page-vues/demo-page'),
    frame = require('common/components/frame-work/index');

Vue.use(VueResource);
Vue.http.options.jsonp = 'jsonpcallback';

new Vue({
    el: '#app',
    components: {
        app: page,
        'frameWork': frame
    }
})