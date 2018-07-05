<template>
    <div class="yunnex-dialog-container half-hour-dialog" v-show="isShow">
        <div class="yunnex-dialog-mask">
        </div>
        <div class="yunnex-dialog">
            <!-- 对话框的内容区内容,当内容模板中的标签含有ok-btn、cancel-btn则分别表示此两标签代表确定、取消按钮的功能 -->
            <div class="yunnex-dialog-content">
                <div class="dialog-content-wrap">
                    <i class="dialog-icon icon-confirm"></i>
                    <div class="right-area-wrap">
                        <p class="dialog-title-area">掌贝指南课程提醒</p>
                        <p class="dialog-message">发现你还有掌柜课程未掌握，学习掌柜课程可以帮助你更快速的了解系统，现在去学习？</p>
                    </div>
                    <div class="dialog-btn-area">
                        <div class="dialog-btn never-notify" style="margin-right: 20px;" @click="close('0')">不再提醒</div>
                        <div class="dialog-btn" cancel-btn @click="close('1')">稍后学习</div>
                        <div class="dialog-btn alert-btn" ok-btn @click="close('2')">现在学习</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            showDialog() {
                this.isShow = true;
            },
            close(index) {
                this.$emit('close',index);
                this.isShow = false;
            }
        }
    }
</script>

<style lang="less">
    .half-hour-dialog {
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
                .dialog-content-wrap {
                    max-width: 488px;
                    margin: 34px 40px 0;
                    font-size: 0;
                    text-align: left;
                    .dialog-icon {
                        display: inline-block;
                        margin-right: 30px;
                    }
                    .icon-confirm {
                        width: 58px;
                        height: 58px;
                        background-image: url(../../images/common/platform-dialog-sprite.png);
                        background-position: 0px -64px;
                        display: inline-block;
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
                    .never-notify {
                        border: none;
                    }
                }    
            }
        }
    }
</style>