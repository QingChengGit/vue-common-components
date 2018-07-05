<template>
    <div class="page-yunnex-loading" v-show="isShow">
        <div class="yunnex-dialog-mask"></div>
        <div class="loading-icon"></div>
    </div>
</template>

<script>
    module.exports =  {
       data() {
            return {
                isShow: false
            }
       },
       methods: {
            show() {
                this.isShow = true;
            },
            hide() {
                this.isShow = false;
            }
       }
    }
</script>

<style scoped lang="scss">
    .page-yunnex-loading {
        .yunnex-dialog-mask {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9999;
            width: 100%;
            height: 100%;
            background-color: #000;
            opacity: .5;
            -webkit-box-shadow: 0 4px 2px 4px #fcfcfc;
            -moz-box-shadow: 0 4px 2px 4px #fcfcfc;
            box-shadow: 0 4px 2px 4px #fcfcfc;
        }
        .loading-icon {
            position: fixed;
            width: 128px;
            height: 128px;
            left: 50%;
            top: 50%;
            z-index: 10000;
            margin: -64px 0 0 -64px;
            background: url('../../images/icons/yunnex-loading/layer_loading.png') center no-repeat;
            background-size: cover;
            animation: spin 1500ms infinite linear;
        }
        @keyframes spin {
            0%   { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    }
</style>
