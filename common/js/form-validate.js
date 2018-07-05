/**
 * Created by liuxinxin on 2017/8/11.
 */
var validateStrategy = {
    required: function(val) {
        return !isEmpty(val);
    },
    len: function(val, l) {
        if(isEmpty(val) || val.toString().trim().length != l) {
            return false;
        }
        return true;
    },
    minLen: function(val, l) {
        return !isEmpty(val) && val.toString().length >= l;
    },
    maxLen: function(val, l) {
        if(!isEmpty(val) && val.toString().length > l){
            return false;
        }
        return true;
    }
};
function isEmpty(val) {
    if(val === null || typeof val == 'undefined' || !val.toString().trim()) {
        return true;
    }
    return false;
}
function FormValidate(ctx) {
    this.context = ctx || null;
    this.validateRuleArr = [];
    this.errorInfo = Object.create(null);
}

FormValidate.prototype.init = function init(el) {
    var element = (typeof el === 'string' ? document.querySelectorAll(el) : el),
        validateRule,
        rules = [],
        customRules,
        customArr = [],
        self = this;

    if(!element) {
        return;
    }
    if("length" in element) {
        element = Array.prototype.slice.call(element);
        element.forEach(function(item, idx) {
            validateRule = element[idx].querySelectorAll('[validate-rule]');
            if(validateRule) {
                rules = rules.concat(Array.prototype.slice.call(validateRule));
            }
        });
    }else {
        validateRule = element.querySelectorAll('[validate-rule]');
        rules && (rules = Array.prototype.slice.call(validateRule));
    }
    rules.forEach(function(item, index) {
        customArr = [];
        rules = item.getAttribute('validate-rule');
        rules = rules ? rules.split(';') : [];
        customRules = item.getAttribute('custom-rule');
        customRules = customRules ? customRules.split(';') : [];
        customRules.forEach(function(t) {
            if(!self.context[t]) {
                throw new Error('can not find ' + item.getAttribute('custom-rule') + ' definition at give context');
            }else {
                customArr.push(self.context[t]);
            }
        });
        self.validateRuleArr.push({
            name: item.getAttribute('name'),
            rules: rules.concat(customArr),
            getValue: (function(element) {
                return function() {
                    var t,
                        v;

                    if("value" in element) {
                        return element.value;
                    }
                    t = element.getAttribute('data-value-path');
                    if(t) {
                        //路径之间用.分隔
                        t = t.split('.');
                        v = self.context;
                        t.forEach(function(_t) {
                            v = v[_t];
                        });
                        return v;
                    }
                    return null;
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