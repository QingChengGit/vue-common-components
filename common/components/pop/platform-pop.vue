<template>
    <pop :dialog-config="dialogConfig">
        <div slot="dialog-content" class="pop-content-wrap">
            <slot name="pop-content">
            </slot>
        </div>
    </pop>
</template>

<style lang="less">
    .yunnex-dialog-container {
        .pop-content-wrap {
            margin: 0 20px;
        }
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
            //this.dialogConfig.titleClass = 'pop-title';
        },
        components: {
            pop: pop
        }
    };
</script>