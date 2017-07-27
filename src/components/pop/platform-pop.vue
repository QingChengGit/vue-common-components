<template>
    <pop :dialog-config="dialogConfig">
        <div slot="dialog-content">
            <slot name="pop-content">
            </slot>
        </div>
    </pop>
</template>

<style lang="less">
    .pop-title {
        padding: 12px 0 12px 10px;
        font-size: 12px;
        color: #fff;
        background-color: #1ab394;
    }
</style>

<script>
    var pop = require('../base-dialog/index');

    module.exports = {
        props: {
            dialogConfig: {
                type: Object,
                required: true
            }
        },
        created: function() {
            this.dialogConfig.titleClass = 'pop-title';
            this.dialogConfig.closeClass = 'icon-popup-close-white';
        },
        components: {
            pop: pop
        }
    };
</script>