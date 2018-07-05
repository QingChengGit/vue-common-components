<template>
    <!--<div class="yunnex-uploader-component">
        &lt;!&ndash;<input type="file" class="upload-input"/>&ndash;&gt;
        <span class="upload-btn-text">{{uploadConfig.btnText || '上传图片'}}</span>
    </div>-->
    <div class="yunnex-uploader-component">
        <file-uploader :post-action="uploadConfig.backendUrl" :accept="accept" :extensions="fileExtensions"
        :size="fileMaxSize" :timeout="timeout" @input-file="inputFile" @input="input" ref="upload"
        :data="uploadConfig.data" v-model="curFiles" :class="{'green': text}">
            <span class="upload-btn-text">{{text || btnText}}</span>
        </file-uploader>
    </div>
</template>

<style lang="less">
    .yunnex-uploader-component {
        position: relative;
        display: inline-block;
        width: 110px;
        height: 34px;
        line-height: 32px;
        border: 1px solid #d7d7d7;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #333;
        text-align: center;
        vertical-align: middle;
        .file-uploads {
            width: 100%;
            height: 100%;
            font-size: 13px;
            cursor: pointer;
        }
        .green {
            color: #fff;
            background-color: #1ab394;
            .upload-btn-text {
                color: #fff;
            }
        }
        .upload-btn-text {
            font-size: 13px;
            font-weight: normal;
            color: #333;
        }
    }
</style>

<script>
    var FileUploader = require('./vue-upload-component.min'),
        upload,
        btnText;

    module.exports = {
        data: function() {
            return {
                curFiles: null,
                text: ''
            };
        },
        props: {
            uploadConfig: {
                type: Object,
                required: true
            },
            value: String
        },
        computed: {
            auto: function() {
                if(typeof this.uploadConfig.auto !== 'undefined') {
                    return !!this.uploadConfig.auto;
                }
                return true;
            },
            fileExtensions: function() {
                var extensions = 'jpg,jpeg,bmp,png';

                return this.uploadConfig.fileExtensions ? this.uploadConfig.fileExtensions.toString() : extensions;
            },
            accept: function() {
                var accepts = 'image/gif,image/jpg,image/jpeg,image/bmp,image/png';

                if(this.uploadConfig.accepts) {
                    accepts = this.uploadConfig.accepts;
                }

                return accepts;
            },
            fileMaxSize: function() {
                return this.uploadConfig.maxSize > 0 ? this.uploadConfig.maxSize : 1024 * 1024 * 10;
            },
            timeout: function() {
                return this.uploadConfig.timeout > 0 ? this.uploadConfig.timeout : 1000 * 60;
            },
            btnText: function() {
                return this.uploadConfig.btnText || '上传图片';
            }
        },
        watch: {
            'uploadConfig.isStartUpload': function(val, oldVal) {
                if(val && this.curFiles[0] && !this.curFiles[0].error && !this.auto) {
                    this.$refs.upload.update(this.curFiles[0], {active: true});
                }
            },
            'value': function(val, oldVal) {
                if(val) {
                    this.text = '修改图片';
                }
            }
        },
        methods: {
            input: function(files) {
                if(!files[0].active && (!files[0].success || files[0].error)) {
                    this.$emit('file-input', files[0]);
                    if(files[0].error) {
                        //阻止上传
                        this.$refs.upload.active = false;
                    }
                }
            },
            inputFile: function(newFile, oldFile) {
                var res;

                if (this.auto && !this.$refs.upload.uploaded && !this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
                if(newFile && oldFile && !newFile.active && newFile.success) {
                    if(typeof oldFile.response === 'string'){
                        res = JSON.parse(oldFile.response);
                    }else {
                        res = oldFile.response;
                    }
                    this.$emit('upload-complete', res, oldFile);
                    res._fileName = oldFile.name;
                    this.$emit('_change', res);
                    !this.auto && (this.uploadConfig.isStartUpload = false);
                    this.text = '修改图片';
                }
            },
            clear: function() {
                /*  供父组件调用，清空上传的文件.  */
                //更新组件的v-model的值
                this.$emit('_change', null);
                !this.auto && (this.uploadConfig.isStartUpload = false);
                this.text = '';
            }
        },
        model: {
            prop: 'value',
            event: '_change'
        },
        components: {
            FileUploader: FileUploader
        }
    };
</script>