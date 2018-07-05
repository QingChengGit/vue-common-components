<template>
    <div class="yunnex-dialog-container">
        <div class="yunnex-dialog-mask" v-if="dialogConfig.isShow">
        </div>
        <div class="yunnex-dialog" :class="dialogConfig.dialogClass">
            <div :class="titleClass">
                {{title}}
                <i v-if="dialogConfig.closeClass" class="dialog-close" :class="dialogConfig.closeClass" @click="closeDialog"></i>
            </div>
            <!-- 对话框的内容区内容,当内容模板中的标签含有ok-btn、cancel-btn则分别表示此两标签代表确定、取消按钮的功能 -->
            <div class="yunnex-dialog-content">
                <slot name="dialog-content"></slot>
            </div>
        </div>
    </div>
</template>

<style lang="less">
    .yunnex-dialog-container {
        .yunnex-dialog-mask {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
            width: 100%;
            height: 100%;
            background-color: #666;
            opacity: 0.5;
        }
        .yunnex-dialog {
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 10000;
            border: 1px solid #c2c2c2;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            .yunnex-dialog-title {
                position: relative;
                height: 40px;
                line-height: 40px;
                padding-left: 14px;
                font-size: 12px;
                color: #333;
                background-color: #c2c2c2;
            }
            .dialog-close {
                position: absolute;
                right: 0;
                top: 50%;
                -webkit-transform: translate(-50%, -50%);
                -moz-transform: translate(-50%, -50%);
                -ms-transform: translate(-50%, -50%);
                -o-transform: translate(-50%, -50%);
                transform: translate(-50%, -50%);
                cursor: pointer;
            }
            .yunnex-dialog-content {
                min-width: 400px;
                min-height: 250px;
                background-color: #fff;
                text-align: center;
                &:after {
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 100%;
                    font-size: 0;
                    vertical-align: middle;
                }
            }
        }
    }
</style>

<script>
    module.exports = {
        props: {
            /*
                @desc dialogConfig 对话框配置对象，可配置参数如下：
                {
                    //对换框标题文本,默认为"提示" [optional]
                    title: '提示',
                    //对话框整体样式class [optional]
                    dialogClass: 'myDialogClass',
                    //对换框title区域的样式类 [optional]
                    titleClass: '',
                    //关闭按钮的class，如果不设置该属性此无关闭按钮 [optional]
                    closeClass: 'myCloseClass',
                    //是否显示对话框
                    isShow: true
                }
             */
            dialogConfig: {
                type: Object,
                required: true
            }
        },
        computed: {
            titleClass: function() {
                return this.dialogConfig.titleClass || 'yunnex-base-dialog-title';
            },
            title: function() {
                return this.dialogConfig.title || '提示';
            }
        },
        methods: {
            closeDialog: function(e) {
                this.close();
            },
            close: function(flag) {
                this.$emit('base-dialog-closing', flag);
            }
        },
        mounted: function() {
            var dialog = document.querySelector('.yunnex-base-dialog'),
                okBtn = dialog.querySelector('[ok-btn]'),
                cancelBtn = dialog.querySelector('[cancel-btn]'),
                self = this;

            if(okBtn){
                okBtn.addEventListener('click', function(e) {
                    self.close(true);
                }, false);
            }
            if(cancelBtn){
                cancelBtn.addEventListener('click', function(e) {
                    self.close(false);
                }, false);
            }
        }
    };
</script>