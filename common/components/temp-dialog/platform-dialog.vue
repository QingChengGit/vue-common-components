<template>
    <dialog :dialog-config="innerConf" @base-dialog-closing="dialogCloseHand">
        <!-- 对话框内容区 -->
        <div class="dialog-content-wrap" slot="dialog-content">
            <i :class="innerConf.dialogIcon" class="dialog-icon" v-show="innerConf.dialogIcon"></i>
            <p class="dialog-message">{{innerConf.dialogMessage}}</p>
            <div class="dialog-btn-area" v-show="innerConf.dialogType!=='autoClose' && innerConf.dialogType !== 'msgBox'">
                <div class="dialog-btn" :class="ensureBtnClass" ok-btn>{{innerConf.okBtnText}}</div>
                <div class="dialog-btn" cancel-btn v-show="/.*Confirm$/.test(innerConf.dialogType)">{{innerConf.cancelBtnText}}</div>
            </div>
        </div>
    </dialog>
</template>

<style lang="less">
.dialog-content-wrap {
    display: inline-block;
    width: 300px;
    margin: 40px 20px;
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
    .dialog-btn {
        display: inline-block;
        padding: 10px 16px;
        border: 1px solid #e5e6e7;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        font-size: 14px;
        color: #666;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
        &:last-child {
            margin-left: 16px;
        }
    }
    .alert-btn, .error-btn {
        border: none;
        color: #fff;
    }
    .alert-btn {
        background-color: #F5A64A;
    }
    .error-btn {
        background-color: red;
    }
}
</style>

<script>
    var dialog = require('../base-dialog/index'),
        util = require('common/js/util'),
        spriteCss = require('common/styles/platform-dialog-sprite.css');

    module.exports = {
        data: function() {
            return {
                //组件内部控制对话框关闭的标志
                hideFlag: 0
            };
        },
        props: {
            /*
             dialogConf: {
                dialogType: string [.*Alert|.*Confirm|autoClose|msgBox]任意一种,
                dialogMessage: string, 可选
                //对话框上显示的图标class。比如显示一个成功、失败、错误的图标
                dialogIcon: string, 可选
                //对话框窗右上角关闭按钮的class，如果不设置该选型则对话框右上角无关闭按钮
                closeClass: string, 可选
                okBtnText: string  默认为：确定,
                cancelBtnText: string  默认为：取消,
                //控制对话框的显示、关闭
                isShow: boolean,
                //delayTime,对话框自动关闭的延时时间，如果对话框类型为autoClose才有效
                delayTime: number, 默认为2000毫秒
             }
            */
            dialogConf: {
                type: Object,
                required: true
            }
        },
        computed: {
            innerConf: function() {
                var rs;

                rs = util.clone(this.dialogConf);
                rs.okBtnText = rs.okBtnText || '确定';
                rs.cancelBtnText = rs.cancelBtnText || '取消';
                rs.dialogType === 'msgBox' && (rs.closeClass = '');
                if(!!this.hideFlag) {
                    rs.isShow = false;
                    this.hideFlag = 0;
                }

                return rs;
            },
            ensureBtnClass: function() {
                return {
                    'alert-btn': /^tip|warn/.test(this.dialogConf.dialogType),
                    'error-btn': /^error/.test(this.dialogConf.dialogType)
                };
            }
        },
        methods: {
            dialogCloseHand: function(flag) {
                //对话框关闭的时候触发的回调，如果点击了对话框的确定按钮则flag值为true
                if(this.innerConf.dialogCloseCb) {
                    this.innerConf.dialogCloseCb(flag);
                }
                this.hideFlag = (this.hideFlag + 1) % 2;
                this.$emit('close', flag);
            }
        },
        watch: {
            dialogConf: function(val, oldVal) {
                var self = this,
                    delayTime = val.delayTime || 2000;

                if(val.dialogType === 'autoClose' && val.isShow) {
                    setTimeout(function() {
                        self.hideFlag = (self.hideFlag + 1) % 2;
                        if(self.innerConf.dialogCloseCb) {
                            self.innerConf.dialogCloseCb();
                        }
                        self.$emit('close');
                    }, delayTime);
                }
            }
        },
        components: {
            'dialog': dialog
        }
    };
</script>