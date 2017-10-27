/**
 * Created by liuxinxin on 2017/8/11.
 */
var validateStrategy = {
    required: function(val) {
        if(typeof val === 'undefined' || !val.trim().length) {
            return false;
        }
        return true;
    },
    len: function(val, l) {
        if(typeof val === 'undefined' || val.toString().trim().length != l) {
            return false;
        }
        return true;
    }
};
function FormValidate(ctx) {
    this.context = ctx || null;
    this.validateRuleArr = [];
    this.errorInfo = Object.create(null);
}

FormValidate.prototype.init = function init(el) {
    var element = (typeof el === 'string' ? document.querySelector(el) : el),
        rules,
        customRules,
        self = this;

    if(!element) {
        return;
    }
    rules = element.querySelectorAll('[validate-rule]');
    rules = Array.prototype.slice.call(rules);
    rules.forEach(function(item, index) {
        rules = item.getAttribute('validate-rule');
        customRules = item.getAttribute('custom-rule');
        customRules = customRules ? self.context[customRules] : [];
        if(!customRules) {
            throw new Error('can not find ' + item.getAttribute('custom-rule') + ' definition at give context');
        }
        self.validateRuleArr.push({
            name: item.getAttribute('name'),
            rules: rules.split(';').concat(customRules),
            getValue: (function(element) {
                return function() {
                    return "value" in element ? element.value : element.getAttribute('data-value');
                };
            })(item),
            message: item.getAttribute('validate-message').split(';')
        });
    });
};

FormValidate.prototype.validate = function validateData() {
    var ruleArr,
        rule,
        args,
        flag = true,
        self = this;

    //清空errorInfo
    self.errorInfo = Object.create(null);
    //校验规则与错误消息之间均以';'作为分隔符，校验规则的规则名称和参数之间':'作为分隔符，多个参数之间以','作为分隔符
    self.validateRuleArr.forEach(function(item) {
        item.rules.forEach(function(t, index) {
            if(typeof t === 'function') {
                if(!t.call(self.context, item.getValue())) {
                    flag = false;
                    //如果某一条校验规则找不到对应的错误消息则默认取第一条错误消息
                    self.errorInfo[item.name] = item.message[index] || item.message[0];
                }
                return true;
            }
            rule = t.split(':')[0];
            args = t.split(':')[1];
            if(args) {
                args = args.split(',');
                args.unshift(item.getValue());
            }else {
                args = [item.getValue()];
            }
            if(!validateStrategy[rule].apply(null, args)){
                flag = false;
                //如果某一条校验规则找不到对应的错误消息则默认取第一条错误消息
                self.errorInfo[item.name] = item.message[index] || item.message[0];
            }
        });
    });

    return {
        isValid: flag,
        info: self.errorInfo
    };
};

FormValidate.prototype.clean = function clean() {
    this.validateRuleArr = [];
    this.errorInfo = Object.create(null);
};

module.exports = FormValidate;