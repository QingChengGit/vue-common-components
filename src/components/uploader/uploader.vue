<template>
    <!--<div class="yunnex-uploader-component">
        &lt;!&ndash;<input type="file" class="upload-input"/>&ndash;&gt;
        <span class="upload-btn-text">{{uploadConfig.btnText || '上传图片'}}</span>
    </div>-->
    <div class="yunnex-uploader-component">
        <file-uploader :post-action="uploadConfig.backendUrl" :accept="accept" :extensions="fileExtensions"
        :size="fileMaxSize" :timeout="timeout" @input-file="inputFile" @input="input" ref="upload"
        :data="uploadConfig.data" v-model="curFiles">
            <span class="upload-btn-text">{{uploadConfig.btnText || '上传图片'}}</span>
        </file-uploader>
    </div>
</template>

<style lang="less">
    .yunnex-uploader-component {
        position: relative;
        display: inline-block;
        width: 100px;
        height: 32px;
        line-height: 32px;
        border: 1px solid #e1e1e1;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        color: #848484;
        text-align: center;
        vertical-align: middle;
        .file-uploads {
            width: 100%;
            height: 100%;
            font-size: 12px;
            cursor: pointer;
        }
    }
</style>

<script>
    var FileUploader = require('./vue-upload-component.min'),
        upload;

    module.exports = {
        data: function() {
            return {
                curFiles: null
            };
        },
        props: {
            uploadConfig: {
                type: Object,
                required: true
            }
        },
        computed: {
            auto: function() {
                if(typeof this.uploadConfig.auto !== 'undefined') {
                    return this.uploadConfig.auto;
                }
                return true;
            },
            fileExtensions: function() {
                var extensions = 'jpg,jpeg,bmp,png';

                if(this.uploadConfig.fileExtensions) {
                    extensions = this.fileExtensions;
                }

                return extensions;
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
            }
        },
        watch: {
            'uploadConfig.isStartUpload': function(val, oldVal) {
                if(val && this.curFiles[0] && !this.curFiles[0].error && !this.auto) {
                    this.$refs.upload.update(this.curFiles[0], {active: true});
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
                if(newFile && oldFile && !newFile.active) {
                    if(typeof oldFile.response === 'string'){
                        res = JSON.parse(oldFile.response);
                    }else {
                        res = oldFile.response;
                    }
                    this.$emit('upload-complete', res, oldFile);
                    this.auto && (this.uploadConfig.isStartUpload = false);
                }
            }
        },
        components: {
            FileUploader: FileUploader
        }
    };
</script>