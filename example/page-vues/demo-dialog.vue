<template>
    <div class="page-demo-dialog">
        <div class="yunnex-btn green-btn" @click="showAlertDialog">Alert框</div>
        <div class="yunnex-btn green-btn" @click="showConfirmDialog">Confirm框</div>
        <div class="yunnex-btn green-btn" @click="showAutoCloseDialog">AutoClose框</div>
        <div class="yunnex-btn green-btn" @click="showMsgBoxDialog">MsgBox框</div>
        <yunnex-dialog :dialog-conf="conf" @close="closeDialogHandle"></yunnex-dialog>
    </div>
</template>

<style lang="less">
    .page-demo-dialog {
        padding-left: 20px;
        margin-top: 20px;
        .yunnex-btn {
            display: inline-block;
        }
    }
</style>

<script>
    var yunnexDialog = require('common/components/dialog/index'),
        util = require('common/js/util');

    function openDialog(context, config) {
        context.conf = util.clone(config);
        context.conf.isShow = true;
    }
    module.exports = {
        data: function() {
            return {
                /*
                     对话框配置对象选项
                     dialogConf: {
                     dialogType: string [.*Alert|.*Confirm|autoClose|msgBox]任意一种, 必填
                     dialogMessage: string, 可选
                     //对话框上显示的图标class。比如显示一个成功、失败、错误的图标
                     dialogIcon: string, 可选
                     //对话框窗右上角关闭按钮的class，如果不设置该选型则对话框右上角无关闭按钮
                     closeClass: string, 可选
                     okBtnText: string  默认为：确定,
                     cancelBtnText: string  默认为：取消,
                     //控制对话框的显示、关闭
                     isShow: boolean, 必填
                     //delayTime,对话框自动关闭的延时时间，如果对话框类型为autoClose才有效
                     delayTime: number, 默认为2000毫秒
                 }
                 */
                conf: {
                    dialogType: '',
                    dialogMessage: '',
                    dialogIcon: '',
                    okBtnText: '',
                    isShow: false
                }
            };
        },
        components: {
            'yunnex-dialog': yunnexDialog
        },
        methods: {
            showAlertDialog: function() {
                openDialog(this, {
                    dialogType: 'tipAlert',
                    dialogMessage: '我是一个Alert提示消息!',
                    dialogIcon: 'icon-warn',
                    okBtnText: '我是自定义按钮文字'
                });
            },
            showConfirmDialog: function() {
                openDialog(this, {
                    dialogType: 'tipConfirm',
                    dialogMessage: '我是一个Confirm提示消息!',
                    dialogIcon: 'icon-error'
                });
            },
            showAutoCloseDialog: function() {
                openDialog(this, {
                    dialogType: 'autoClose',
                    dialogMessage: '我是一个自动关闭对话框的提示消息!',
                    dialogIcon: 'icon-success'
                });
            },
            showMsgBoxDialog: function() {
                var self = this,
                    config = {
                    dialogType: 'msgBox',
                    dialogMessage: '我是一个不能手动、自动关闭只能通过程序来关闭的对话框!',
                    dialogIcon: 'icon-success'
                };

                openDialog(this, config);
                setTimeout(function() {
                    //关闭窗口
                    config.isShow = false;
                    self.conf = config;
                }, 2000);
            },
            closeDialogHandle: function(flag) {
                //对话框关闭的时候触发的回调，如果点击了对话框的确定按钮则flag值为true
                var o = {
                    dialogType: 'autoClose',
                    dialogMessage: '你点击了!',
                    dialogIcon: 'icon-success',
                    //默认2秒关闭
                    delayTime: 1000
                },
                self = this;

                if(flag) {
                    o.dialogMessage += '确定按钮!';
                }else {
                    o.dialogMessage += '取消或者关闭按钮!';
                }
                openDialog(this, o);
            }
        }
    };
</script>