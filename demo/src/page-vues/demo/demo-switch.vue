<template>
    <div class="page-demo-switch page-padding">
        <div class="title-page">开关组件</div>
        <yunnex-switch v-model="flag" @callback="changeStatus"></yunnex-switch>
        <p class="placeholder-text">小尺寸的开关</p>
        <yunnex-switch v-model="flag" size="small"></yunnex-switch>
    </div>
</template>

<script>

    var Switch = require('common/components/yunnex-switch/index'),
        commCss = require('common/styles/common');

    /*

     v-model: 开关状态
     size:small 较小开关样式 不设置size则默认50*26大小的开关
     callback 点击开关的回调

     */

    module.exports = {
        data() {
            return {
                flag: true
            }
        },
        components: {
            'yunnex-switch': Switch
        },
        methods: {

            changeStatus(status){

                if (status) {

                    console.log('open');

                } else {

                    console.log('close');

                }

            }

        }
    }
</script>

<style lang="scss">
    .page-demo-switch {
        .title-page {
            margin-bottom: 20px;
        }
    }
</style>