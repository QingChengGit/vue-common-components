<template>
    <div class="page-demo-form-validate page-padding">
        <div class="title-page">表单校验插件</div>
        <input class="yunnex-input" type="text" name="username" v-model="username"
               validate-rule="required;len:5" validate-message="请输入用户名,长度为5位!" />
        <!-- 如果校验项不是form类型的表单，也即不能通过value属性来获取该标签的值的情况下,需要设置data-value-path属性为
            该标签待校验的值路径，如：data-value-path="a.b"则会将context.a.b的值作为该校验项的value值 -->
        <yunnex-select name="langType" :source-data="typeList" :select-title="selectTitle" v-model="selectType"
                       validate-rule="required" validate-message="请选择类型!" data-value-path="selectType">
        </yunnex-select>
        <!-- 通过设置custom-rule属性设置自定义校验函数名 -->
        <input class="yunnex-input" type="text" name="pwd" v-model="password" custom-rule="checkPassword"
               validate-rule="required" validate-message="请输入密码!;密码必须包含数字、字符" />
        <!-- 显示错误信息-->
        <div v-show="!errorInfo.isValid">
            {{errorInfo.info && errorInfo.info.langType}}
            {{errorInfo.info && errorInfo.info.pwd}}
        </div>
        <div class="yunnex-btn" @click="submit">提交</div>
    </div>
</template>

<style lang="less">
    .page-demo-form-validate {
        .title-page {
            margin-bottom: 20px;
        }
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
                /*
                    当校验失败时validate方法返回的对象的isValid为false(记此对象为errorInfo),errorInfo.info对象
                    为错误消息对象,根据校验项的name属性的值可以获取对应的校验项的错误消息。比如某个校验项的
                    name="userName"，当校验失败的时候可以通过errorInfo.info.userName获取错误消息
                 */
                this.errorInfo = validateInstance.validate();
            },
            checkPassword: function(val) {
                //val为此校验项的value值
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
            //FormValidate构造函数接收一个context参数，该参数用来指定自定义校验规则函数所属的上下文环境
            validateInstance = new FormValidate(this);
            //设置校验起作用的范围，程序会扫描此范围内需要校验的项。参数可以为选择器字符串或者dom元素
            validateInstance.init('.page-form-validate');
        }
    };
</script>