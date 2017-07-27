<template>
    <div class="page-demo-dialog">
        <span>我的名字:{{userName}}</span>
        <div class="yunnex-btn green-btn" @click="modifyUserName">修改</div>
        <pop :dialog-config="config">
            <div slot="pop-content">
                <p>我是弹出框内容</p>
                <span>姓名：</span><input type="text" class="yunnex-input" v-model="inputName"/>
                <div class="operate-btn-area">
                    <div class="yunnex-btn green-btn" @click="saveUserName">确定</div>
                    <div class="yunnex-btn" @click="cancelModify">取消</div>
                </div>
            </div>
        </pop>
    </div>
</template>

<style lang="less">
    .page-demo-dialog {
        padding-left: 20px;
        margin-top: 20px;
        .yunnex-btn {
            display: inline-block;
        }
    }
</style>

<script>
    var yunnexPop = require('common/components/pop/index');

    module.exports = {
        data: function() {
            return {
                userName: 'tom',
                inputName: '',
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
                this.userName = this.inputName;
            },
            cancelModify: function() {
                this.config.isShow = false;
            }
        }
    };
</script>