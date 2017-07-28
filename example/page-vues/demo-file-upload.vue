<template>
    <div class="page-file-upload">
        <div class="baseinfo-config-item">
                <span class="config-item-left">
                    <span class="require-symbol">*</span>
                    <span class="config-text">商户LOGO：</span>
                </span>
            <div :class="!validateInfo.isSelectLogo ? 'invalid-btn' : 'uploader-btn-wrap'">
                <yunnex-uploader :upload-config="logoFileUploaderConfig" @upload-complete="handleLogoUploadResult"
                          @file-input="validateLogoFile"></yunnex-uploader>
                <span class="upload-file-name" v-show="uploadLogoName">{{'已上传：' + uploadLogoName}}</span>
                <div class="upload-btn" @click="uploadFile">上传</div>
            </div>
            <div class="tip-message">图片尺寸为大于500*500px的正方形，且小于1M，支持格式：jpg、jpeg、png、bmp</div>
        </div>
        <div class="baseinfo-config-item">
                <span class="config-item-left">
                    <span class="require-symbol">*</span>
                    <span class="config-text">封面图：</span>
                </span>
            <div :class="!validateInfo.isSelectCover ? 'invalid-btn' : 'uploader-btn-wrap'">
                <yunnex-uploader :upload-config="coverFileUploaderConfig" @upload-complete="handleCoverUploadResult"
                          @file-input="validateCoverFile"></yunnex-uploader>
                <span class="upload-file-name" v-show="uploadCoverName">{{'已上传：' + uploadCoverName}}</span>
            </div>
            <div class="tip-message">
                图片尺寸为大于1020*643px，不得有圆角，不得拉伸变形，且小于2M，支持格式：jpg、jpeg、png、bmp
            </div>
        </div>
        <yunnex-dialog :dialog-conf="conf"></yunnex-dialog>
    </div>
</template>

<style lang="less">
    .page-file-upload {
        padding: 20px 0;
        .baseinfo-config-item {
            margin-bottom: 42px;
            &:last-child {
                margin-bottom: 20px;
            }
        }
        .baseinfo-config-item {
            margin-left: 24px;
            font-size: 12px;
        }
        .config-item-left {
            display: inline-block;
            width: 96px;
            text-align: left;
            vertical-align: middle;
        }
        .yunnex-uploader-component {
            line-height: 30px;
        }
        .upload-file-name {
            margin-left: 8px;
            font-size: 12px;
            color: #adadad;
        }
        .uploader-btn-wrap {
            display: inline-block;
            font-size: 0;
        }
        .upload-btn {
            display: inline-block;
        }
        .invalid-btn {
            border: 1px solid red;
        }
        .tip-message {
            line-height: 1;
            margin: 16px 0 22px 0;
            font-size: 12px;
            color: #adadad;
        }
    }

</style>

<script>
    var yunnexUploader = require('common/components/uploader/index'),
        yunnexDialog = require('common/components/dialog/index'),
        util = require('common/js/util');

    function openDialog(context, config) {
        context.conf = util.clone(config);
        context.conf.isShow = true;
    }

    module.exports = {
        data: function() {
            var uploadBackendUrl = '/saofu-shop-card/customer/config/sendImageToAlipay';

            return {
                conf: {
                    dialogType: '',
                    dialogMessage: '',
                    dialogIcon: '',
                    okBtnText: '',
                    isShow: false
                },
                memberConfig: {
                    cardBgImagePath: '',
                    logoPath: ''
                },
                uploadLogoName: '',
                uploadCoverName: '',
                logoFileUploaderConfig: {
                    maxSize: 1024 * 1024,
                    backendUrl: uploadBackendUrl,
                    auto: true,
                    isStartUpload: false
                },
                coverFileUploaderConfig: {
                    maxSize: 2 * 1024 * 1024,
                    backendUrl: uploadBackendUrl
                },
                validateInfo: {
                    isSelectLogo: true,
                    isSelectCover: true
                }
            };
        },
        methods: {
            validateLogoFile: function(file) {
                var self = this;

                if(file.error === 'extension' || file.error === 'size') {
                    openDialog(self, {
                        dialogType: 'autoClose',
                        dialogIcon: 'icon-err',
                        dialogMessage: '请上传合适的图片格式，支持格式：jpg、jpeg、png、bmp，且小于1M'
                    });
                }else {
                    openDialog(self, {
                        dialogType: 'msgBox',
                        dialogIcon: 'icon-tip',
                        dialogMessage: '文件上传中，请耐心等待...'
                    });
                }
            },
            handleLogoUploadResult: function(res, file) {
                var self = this,
                    conf = {
                        dialogType: 'autoClose',
                        dialogIcon: 'icon-err',
                        dialogMessage: ''
                    };

                if(res.success) {
                    this.memberConfig.logoPath = res.attach.imageUrl;
                    this.validateInfo.isSelectLogo = true;
                    this.uploadLogoName = file.name;
                    conf.dialogMessage = '上传logo成功!';
                }else {
                    conf.dialogMessage = '上传logo失败:' + res.message;
                }
                openDialog(self, conf);
            },
            validateCoverFile: function() {
                var self = this;

                if(file.error) {
                    openDialog(self, {
                        dialogType: 'autoClose',
                        dialogIcon: 'icon-err',
                        dialogMessage: '请上传合适的图片格式，支持格式：jpg、jpeg、png、bmp，且小于2M'
                    });
                }else {
                    openDialog(self, {
                        dialogType: 'msgBox',
                        dialogIcon: 'icon-tip',
                        dialogMessage: '文件上传中，请耐心等待...'
                    });
                }
            },
            handleCoverUploadResult: function(res, file) {
                var self = this,
                    conf = {
                        dialogType: 'autoClose',
                        dialogIcon: 'icon-err',
                        dialogMessage: '',
                        delayTime: 600
                    };

                if(res.success) {
                    this.memberConfig.cardBgImagePath = res.attach.imageUrl;
                    this.validateInfo.isSelectCover = true;
                    this.uploadCoverName = file.name;
                    conf.dialogMessage = '上传封面图成功!';
                }else {
                    conf.dialogMessage = '上传封面图失败:' + res.message;
                }
                openDialog(self, conf);
            }
        },
        components: {
            'yunnex-uploader': yunnexUploader,
            'yunnex-dialog': yunnexDialog
        }
    };
</script>