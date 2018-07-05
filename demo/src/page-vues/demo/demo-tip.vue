<template>
    <div class="page-demo-tip page-padding">
        <div class="title-page">浮窗组件</div>
        <yunnex-tip :content="content" @on-mouseenter="mouseenter" position="bottom">
            <div class="yunnex-tip-defalut">21212121</div>
        </yunnex-tip>

        <yunnex-tip :content="content1" @on-mouseenter="mouseenter" position="top">
            <div class="yunnex-tip-defalut">21212121</div>
        </yunnex-tip>
        <yunnex-tip :content="content2" @on-mouseenter="mouseenter" position="right">
            <div class="yunnex-tip-defalut">2121212121212121</div>
        </yunnex-tip>
        <yunnex-tip :content="content3" @on-mouseenter="mouseenter" position="left">
            <div class="yunnex-tip-defalut">2121212121212121</div>
        </yunnex-tip>

        <yunnex-tip content="我是浮出的数据" @on-mouseenter="mouseenter" position="right">
            <div class="yunnex-tip-question"></div>
        </yunnex-tip>

        <yunnex-tip content="我是浮出的数据" @on-mouseenter="mouseenter" position="right" maxWidth="220">
            <div class="yunnex-tip-question"></div>
        </yunnex-tip>

    </div>
</template>

<script>
    /*
        可以自己定义最大宽度，没有传默认为320
    */
	var tip = require('common/components/yunnex-tip/index'),
        commCss = require('common/styles/common');

    module.exports = {
        data() {
            return {
                content: '',
                content1: '',
                content2: '',
                content3: '',
                num: 0
            }
        },
        methods: {
            mouseenter( event ) {

                var self = this;

                setTimeout(function(){
                    self.content = '我就是异步数据'
                    self.content1 = '据我是异步数据我 ';
                    self.content2 = '据我是异步数据我是异步异我是异步数我是异步数 ';
                    self.content3 = '据我是异步数据我是异步数据我是异我是异步数我是异步数 ';
                },200)

               
                
            }
        },
        components: {
            'yunnex-tip': tip
        }
    }
</script>

<style lang="scss">
    .page-demo-tip {
        .yunnex-tip-component {
            margin: 100px;
        }
    }
</style>