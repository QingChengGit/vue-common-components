<template>
    <yunnex-dialog :dialog-config="innerConf" @base-dialog-closing="dialogCloseHand">
        <!-- 对话框内容区 -->
        <div class="dialog-content-wrap" slot="dialog-content">
            <i :class="innerConf.dialogIcon" class="dialog-icon" v-show="innerConf.dialogIcon"></i>
            <div class="right-area-wrap">
                <p class="dialog-title-area">{{innerConf.title || '提示'}}</p>
                <p class="dialog-message" v-html="innerConf.dialogMessage"></p>
            </div>
            <div class="dialog-btn-area" v-show="innerConf.dialogType!=='autoClose' && innerConf.dialogType !== 'msgBox'">
                <div class="dialog-btn" cancel-btn v-show="/.*Confirm$/.test(innerConf.dialogType)">{{innerConf.cancelBtnText}}</div>
                <div class="dialog-btn" :class="ensureBtnClass" ok-btn>{{innerConf.okBtnText}}</div>
            </div>
        </div>
    </yunnex-dialog>
</template>

<style lang="less">
    .yunnex-dialog-container {
        .dialog-content-wrap {
            max-width: 488px;
            margin: 34px 40px 0;
            font-size: 0;
            text-align: left;
            .dialog-icon {
                display: inline-block;
                margin-right: 30px;
            }
            .right-area-wrap {
                display: inline-block;
                max-width: 320px;
                margin-bottom: 28px;
                vertical-align: top;
            }
            .dialog-title-area {
                line-height: 28px;
                font-size: 20px;
                color: #333;
                text-align: left;
            }
            .dialog-message {
                line-height: 24px;
                font-size: 14px;
                color: #999;
            }
            .dialog-btn-area {
                height: 60px;
                margin: 0 -40px;
                padding-right: 20px;
                border-top: 1px solid #d7d7d7;
                text-align: right;
                &:after {
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 100%;
                    font-size: 0;
                    vertical-align: middle;
                    visibility: hidden;
                }
            }
            .dialog-btn {
                display: inline-block;
                height: 34px;
                line-height: 34px;
                padding: 0 27px;
                border: 1px solid #d7d7d7;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                font-size: 13px;
                color: #666;
                background-color: #fff;
                vertical-align: middle;
                text-align: center;
                cursor: pointer;
                &:last-child {
                    margin-left: 20px;
                }
            }
            .alert-btn, .error-btn {
                border: none;
                color: #fff;
            }
            .alert-btn {
                background-color: #1ab394;
            }
            .error-btn {
                background-color: #1ab394;
            }
        }
    }
</style>

<script>
    var yunnexDialog = require('../base-dialog/index'),
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
                title: string,  对话框标题
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
                delayTime: number, 默认为2000毫秒,
                //弹框关闭时触发的回调， 可选
                dialogCloseCb: fn
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
                rs.isNeedTitleArea = false;
                if(!!this.hideFlag) {
                    rs.isShow = false;
                    this.hideFlag = 0;
                }

                return rs;
            },
            ensureBtnClass: function() {
                return {
                    'alert-btn': /^.*(?:Alert|Confirm)/.test(this.dialogConf.dialogType),
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
            'yunnex-dialog': yunnexDialog
        }
    };
</script>