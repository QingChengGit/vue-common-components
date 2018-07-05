<template>
    <div class="page-demo-file-upload page-padding">
        <div class="title-page">文件上传组件</div>
        <div class="baseinfo-config-item">
                <span class="config-item-left">
                    <span class="require-symbol">*</span>
                    <span class="config-text">商户LOGO：</span>
                </span>
            <div :class="!validateInfo.isSelectLogo ? 'invalid-btn' : 'uploader-btn-wrap'">
                <yunnex-uploader :upload-config="logoFileUploaderConfig" @upload-complete="handleLogoUploadResult"
                          @file-input="validateLogoFile" v-model="logoRes" ref="logoChild"></yunnex-uploader>
                <span class="upload-file-name" v-show="uploadLogoName">{{'已上传：' + uploadLogoName}}</span>
                <div class="yunnex-btn" @click="clearFile">清空</div>
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
                <div class="yunnex-btn upload-btn" @click="uploadFile">上传</div>
            </div>
            <div class="tip-message">
                图片尺寸为大于1020*643px，不得有圆角，不得拉伸变形，且小于2M，支持格式：jpg、jpeg、png、bmp
            </div>
        </div>
        <yunnex-dialog :dialog-conf="conf"></yunnex-dialog>
    </div>
</template>

<style lang="less">
    .page-demo-file-upload {
        .title-page {
            margin-bottom: 20px;
        }
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
    var commCss = require('common/styles/common'),
        yunnexUploader = require('common/components/uploader/index'),
        yunnexDialog = require('common/components/dialog/index'),
        util = require('common/js/util');

    function openDialog(context, config) {
        context.conf = util.clone(config);
        context.conf.isShow = true;
    }

    module.exports = {
        data: function() {
            var uploadBackendUrl = '/user-web-admin/upload';

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
                /*
                    文件上传组件可选项配置对象:
                    {
                        //设置在选择要上传文件后是否自动上传文件
                        auto: boolean， default: true,可选
                        //设置文件上传的后端接口地址
                        backendUrl: string, 必填
                        //多个扩展名之间以逗号隔开比如'png,jpg',默认为'jpg,jpeg,bmp,png'
                        fileExtensions: string, 可选
                        //可上传文件类型对应的mimeType，默认为：'image/gif,image/jpg,image/jpeg,image/bmp,image/png'
                        accepts: string, 可选
                        //上传文件的最大空间，默认10M
                        maxSize: number, 可选
                        //设置文件上传超时时间，默认60秒
                        timeout: number， 单位毫秒 可选
                        //这个配置主要用在手动开始上传情况下，在手动上传的情况下单设置此属性为true时则开始上传文件。
                        //配置对象设置了auto: true时，此设置无效
                        isStartUpload: boolean, 可选
                        //上传文件按钮的文本，默认为‘上传图片’
                        btnText: string, 可选,
                        //传递给后端接口的参数对象
                        data: object, 可选
                    }
                 */
                logoFileUploaderConfig: {
                    maxSize: 1024 * 1024,
                    backendUrl: uploadBackendUrl
                    //auto: true
                },
                coverFileUploaderConfig: {
                    maxSize: 2 * 1024 * 1024,
                    backendUrl: uploadBackendUrl,
                    auto: false,
                    isStartUpload: false
                },
                validateInfo: {
                    isSelectLogo: true,
                    isSelectCover: true
                },
                logoRes: null
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
            },
            uploadFile: function() {
                //设置是否开始上传文件
                this.coverFileUploaderConfig.isStartUpload = true;
                openDialog(this, {
                    dialogType: 'msgBox',
                    dialogIcon: 'icon-tip',
                    dialogMessage: '文件上传中，请耐心等待...'
                });
            },
            clearFile: function() {
                console.log(this.logoRes);
                this.$refs.logoChild.clear();
                console.log(this.logoRes);
            }
        },
        components: {
            'yunnex-uploader': yunnexUploader,
            'yunnex-dialog': yunnexDialog
        }
    };
</script>