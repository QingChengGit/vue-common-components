<script>
    let singleton = (function() {
        let Vue = require('libs/vue'),
            _toast = null;
        
        const ToastConstructor = Vue.extend(require('./yunnex-toast'));

        function getToast () {
            if (_toast === null) {
                _toast = new ToastConstructor().$mount(document.createElement('div'));
                document.body.appendChild(_toast.$el);
            }
     
            return _toast;
        }
        function showToast (options = {}) {
            let _toast = getToast();

            Vue.nextTick(() => {
                _toast.show(options);
            })
        }

        return {
            showToast: showToast
        }
    })();

    module.exports = singleton.showToast;
</script>