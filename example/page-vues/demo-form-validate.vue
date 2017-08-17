<template>
    <div class="page-form-validate">
        <input class="yunnex-input" type="text" name="username" v-model="username"
               validate-rule="required;len:5" message="请输入用户名,最多5位!" />
        <yunnex-select name="langType" :source-data="typeList" :select-title="selectTitle" v-model="selectType"
                       validate-rule="required" message="请选择类型!" :data-value="selectType">
        </yunnex-select>
        <input class="yunnex-input" type="text" name="pwd" v-model="password" custom-rule="checkPassword"
               validate-rule="required" message="请输入密码!;密码必须包含数字、字符" />
        <div v-show="!errorInfo.isValid">{{errorInfo.info && errorInfo.info.pwd}}</div>
        <div class="yunnex-btn" @click="submit">提交</div>
    </div>
</template>

<style lang="less">
    .page-form-validate {
        padding: 20px 20px;
        .yunnex-btn {
            display: inline-block;
        }
    }
</style>

<script>
    var FormValidate = require('common/js/form-validate'),
        yunnexSelect = require('common/components/yunnex-select/index'),
        validateInstance;

    module.exports = {
        data: function() {
            return {
                username: '',
                selectType: '',
                password: '',
                selectTitle: {
                    name: 'id',
                    text: 'text'
                },
                typeList: [
                    {id: '01', text: 'vue'},
                    {id: '02', text: 'react', selected: true},
                    {id: '03', text: 'angular'},
                    {id: '04', text: 'java'},
                    {id: '05', text: 'nodejs'},
                    {id: '06', text: 'koa'}
                ],
                errorInfo: {}
            };
        },
        methods: {
            submit: function() {
                this.errorInfo = Object.assign({}, this.errorInfo, validateInstance.validate());
            },
            checkPassword: function() {
                if(!/(\d+[a-zA-Z]+)|([a-zA-Z]+\d+)/.test(this.password)) {
                    return false;
                }
                return true;
            }
        },
        components: {
            'yunnex-select': yunnexSelect
        },
        mounted: function() {
            validateInstance = new FormValidate(this);
            validateInstance.init('.page-form-validate');
        }
    };
</script>