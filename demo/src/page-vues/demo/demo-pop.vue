<template>
    <div class="page-demo-pop page-padding">
        <div class="title-page">内容自定义的弹框</div>
        <div class="yunnex-btn green-btn" @click="modifyUserName">点我看看弹框</div>
        <pop :dialog-config="config">
            <div slot="pop-content">
                <div class="yunnex-input-data-item">
                    <!-- 这是左侧文字 -->
                    <span class="input-left-text">上架数量<span class="symbol-required"></span></span>
                    <div class="input-right">
                        <!-- 这是右侧内容区，内容区的东西根据页面实际要求自己定义，公共样式不定义此区域的样式 -->
                        <input type="text" class="yunnex-large-input" />
                    </div>
                </div>
                <div class="yunnex-input-data-item">
                    <!-- 如果此项是必填的，只需在文字后面加上<span class="symbol-required"></span>即可显示红色* -->
                    <span class="input-left-text">说明<span class="symbol-required"></span></span>
                    <div class="input-right">
                        <textarea class="yunnex-textarea"></textarea>
                    </div>
                </div>
                <div class="pop-operate-btns vertical-center">
                    <div class="yunnex-btn green-btn" @click="saveUserName">确定</div>
                    <div class="yunnex-btn" @click="cancelModify">取消</div>
                </div>
            </div>
        </pop>
    </div>
</template>

<style lang="less">
    .page-demo-pop {
        .title-page {
            margin-bottom: 20px;
        }
        .yunnex-btn {
            display: inline-block;
        }
    }
</style>

<script>
    var yunnexPop = require('common/components/pop/index'),
        commCss = require('common/styles/common'),
        inputDataItem = require('common/styles/yunnex-input-data-item.scss');

    module.exports = {
        data: function() {
            return {
                inputName: '',
                /*
                    设置pop弹框的配置选项对象
                    {
                        //弹出框标题，默认为“提示”
                        title: string, 可选
                        //通过控制isShow的值来控制弹出框的关闭、打开。dialog也一样
                        isShow: boolean, 必填
                        //弹出框关闭按钮图标样式class
                        closeClass: string, 可选
                    }
                 */
                config: {
                    title: '修改用户姓名',
                    isShow: false
                }
            };
        },
        components: {
            'pop': yunnexPop
        },
        methods: {
            modifyUserName: function() {
                this.config.isShow = true;
            },
            saveUserName: function() {
                this.config.isShow = false;
            },
            cancelModify: function() {
                this.config.isShow = false;
            }
        }
    };
</script>