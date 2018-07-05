<template>
    <base-dialog :dialog-config="config" @dialog-closing="dialogCloseHand">
        <!-- 对话框内容区 -->
        <div class="dialog-content-wrap" slot="dialog-content">
            <i :class="dialogIcon" class="dialog-icon" v-if="dialogIcon"></i>
            <p class="dialog-message">{{dialogMessage}}</p>
            <div class="dialog-btn-area" v-if="dialogType!=='autoClose'">
                <div class="btn" :class="ensureBtnClass" ok-btn>{{okText}}</div>
                <div class="btn" cancel-btn v-if="/.*Confirm/.test(dialogType)">{{cancelText}}</div>
            </div>
        </div>
    </base-dialog>
</template>

<style lang="less">
.dialog-content-wrap {
    display: inline-block;
    width: 300px;
    margin: 20px 20px;
    text-align: center;
    .dialog-icon {
        display: inline-block;
        margin-bottom: 12px;
    }
    .dialog-message {
        line-height: 1.2;
        font-size: 14px;
        color: #666;
        text-align: center;
    }
    .dialog-btn-area {
        margin-top: 24px;
    }
    .btn {
        display: inline-block;
        width: 80px;
        height: 36px;
        line-height: 36px;
        border: 1px solid #e5e6e7;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        color: #666;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
    }
    .alert-btn, .confirm-btn {
        border: none;
        color: #fff;
    }
    .alert-btn {
        background-color: #F5A64A;
    }
    .confirm-btn {
        background-color: red;
    }
}
</style>

<script>
    var dialog = require('./dialog');

    module.exports = {
        data: function() {
            return {};
        },
        props: {
            /*
                type: 'tipAlert', 'tipConfirm', 'warnAlert', 'warnConfirm', 'autoClose'
             */
            dialogType: {
                type: String,
                required: true
            },
            dialogMessage: {
                type: String,
                required: true
            },
            dialogIcon: {
                type: String
            },
            okBtnText: {
                type: String
            },
            cancelBtnText: {
                type: String
            },
            isShow: {
                type: Boolean,
                default: false
            },
            closeHand: {
                type: Function
            }
        },
        computed: {
            config: function() {
                var obj = {
                    closeClass: self.dialogIcon || 'icon-gray-close',
                    isShow: this.isShow
                };
                return obj;
            },
            okText: function() {
                return this.okBtnText || '确定';
            },
            cancelText: function() {
                return this.cancelBtnText || '取消';
            },
            ensureBtnClass: function() {
                return {
                    'alert-btn': /^tip.*/.test(this.dialogType),
                    'confirm-btn': /^warn.*/.test(this.dialogType)
                };
            }
        },
        methods: {
            dialogCloseHand: function(flag) {
                this.$emit('close', flag);
            }
        },
        components: {
            'baseDialog': dialog
        }
    };
</script>