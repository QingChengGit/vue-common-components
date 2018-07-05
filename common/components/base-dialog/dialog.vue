<template>
    <div class="yunnex-dialog-container" v-show="dialogConfig.isShow">
        <div class="yunnex-dialog-mask">
        </div>
        <div class="yunnex-dialog" :class="dialogConfig.dialogClass">
            <div :class="titleClass" v-if="isNeedTitleArea">
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
            background-color: #000;
            opacity: 0.5;
            -webkit-box-shadow: 0 4px 2px 4px #fcfcfc;
            -moz-box-shadow: 0 4px 2px 4px #fcfcfc;
            box-shadow: 0 4px 2px 4px #fcfcfc;
        }
        .yunnex-dialog {
            position: fixed;
            left: 50%;
            top: 50%;
            z-index: 10000;
            min-width: 320px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            -webkit-transform: translate(-50%, -50%);
            -moz-transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            -o-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
            background-color: #fff;
            .yunnex-dialog-title {
                position: relative;
                line-height: 1;
                padding: 30px 0 30px 20px;
                -webkit-border-radius: 4px;
                -moz-border-radius: 4px;
                border-radius: 4px;
                font-size: 20px;
                color: #333;
                background-color: #fff;
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
                min-height: 100px;
                max-height: 550px;
                text-align: center;
                overflow-y: auto;
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
                    // 是否需要顶部title区域，默认为true
                    isNeedTitleArea: true,
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
                return this.dialogConfig.titleClass || 'yunnex-dialog-title';
            },
            title: function() {
                return this.dialogConfig.title || '提示';
            },
            isNeedTitleArea: function() {
                return typeof this.dialogConfig.isNeedTitleArea !== 'undefined' ? this.dialogConfig.isNeedTitleArea
                    : true;
            }
        },
        methods: {
            closeDialog: function(e) {
                this.close();
            },
            close: function(flag) {
                this.dialogConfig.isShow = false;
                this.$emit('base-dialog-closing', flag);
            }
        },
        mounted: function() {
            var self = this,
                okBtn = self.$el.querySelector('[ok-btn]'),
                cancelBtn = self.$el.querySelector('[cancel-btn]');

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