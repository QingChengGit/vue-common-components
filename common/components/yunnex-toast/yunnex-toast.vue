<template>
<transition name='yunnex-toast-fade'>
    <div class="yunnex-toast-component" v-show='isShow'>
        <div class="toast-wrap">
            <i class="icon-toast-status" :class="'icon-toast-status-' + status"></i>
            <div class="toast-text">{{message}}</div>
        </div>
    </div>
</transition>
</template>

<style lang="scss">
.yunnex-toast-component {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10010;

    .toast-wrap {
        position: absolute;
        top: 50%;
        top: 35%\9;
        left: 50%;
        width: 280px;
        min-height: 180px;
        margin-left: -140px;
        padding: 0 35px;
        background-color: rgba(0, 0, 0, .5);
        border-radius: 12px;
        overflow: hidden;
        -webkit-transform: translate(0,-50%);
        -moz-transform: translate(0,-50%);
        -o-transform: translate(0,-50%);
        transform: translate(0,-50%);
        
        .icon-toast-status {
            display: block;
            width: 58px;
            height: 58px;
            margin: 38px auto 20px;
        }
        .toast-text {
            font-size: 20px;
            /* line-height: 20px; 实际行高为26px*/
            color: #fff;
            text-align: center;
            margin-bottom: 38px;
        }
    }
    
}
.yunnex-toast-fade-enter-active, .yunnex-toast-fade-leave-active {
    transition: transform .5s
}
.yunnex-toast-fade-enter, .yunnex-toast-fade-leave-active {
    // transform: translate(-50%,-50%) scale(0);    其他动画效果
    transform: scale(0);
}
</style>

<script>
    require('common/styles/yunnex-toast-sprite.css');
    module.exports = {
        data: function() {
            return {
                isShow: false, // 显示开关
                status: '',    // 提示图标
                message: ''    // 提示信息
            };
        },
        methods: {
            show: function (options = {}) {
                var self = this;
                
                // 显示时长
                let duration = options.duration || 2000,
                    closeHandler = options.closeHandler;

                self.status = options.status || 'warn';
                self.message = typeof options === 'string' ? options : (options.message ? options.message : '');
                self.isShow = true;

                setTimeout(function () {
                    self.close();
                    closeHandler && closeHandler();
                }, duration);
            },
            close: function () {
                this.isShow = false;
            }
        }
    };
</script>