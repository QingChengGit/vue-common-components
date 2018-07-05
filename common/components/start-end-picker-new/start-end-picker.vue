<template>
    <div class="start-end-picker-component">
        <date-picker :config="startPickerConfig" :placeholder="'开始日期'" @date-change="handleStartPicker"
                     :date-picker-mode="dateMode" ref="startDate">
        </date-picker>
        <span class="split-txt">至</span>
        <date-picker :config="endPickerConfig" :placeholder="'结束日期'" @date-change="handleEndPicker"
                     :date-picker-mode="dateMode" ref="endDate">
        </date-picker>
    </div>
</template>

<style lang="less">
    .start-end-picker-component {
        font-size: 0;
        .date-picker-component {
            vertical-align: top;
        }
        .split-txt {
            display: inline-block;
            width: 34px;
            height: 34px;
            line-height: 32px;
            border: 1px solid #d7d7d7;
            border-left: none;
            border-right: none;
            font-size: 13px;
            color: #333;
            background: #fbfbfb;
            text-align: center;
            vertical-align: top;
        }
    }
</style>

<script>
    var pick = require('common/components/date-picker-new/index'),
        util = require('common/js/util');

    module.exports = {
        props: {
            /*
             config object可以有如下属性:
             {
             //禁用开始日期
             startDisabled: [Boolean],
             endDisabled: [Boolean],
             curStartDate: [Date],
             curEndDate: [Date],
             //开始时间、结束日期是否可以相等，默认结束时间必须大于开始日期
             canEqual: [Boolean],
             ==========================
             startFilterDate、endFilterDate函数接受一个待过滤的日期参数，如果filter函数返回值为true则对应的日期
             可以选择，否则不能选择。都为可选参数
             ==========================
             startFilterDate: [function],
             endFilterDate: [function],
             },
             //datePickerMode的取值为：'Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'其中的一个
             datePickerMode: [String]
             */
            config: {
                type: Object
            },
			datePickerMode: {
            	type: String,
                required: true
            }
        },
        data: function() {
            var self = this;

            self.config = self.config || {};
            return {
                startDate: null,
                endDate: null,
                startPickerConfig: {
                    disabled: self.config.startDisabled,
                    curDate: self.config.curStartDate,
                    filterDate: self.config.startFilterDate,
                    defaultDisplayDate: self.config.startDefaultDisplayDate
                },
                endPickerConfig: {
                    disabled: self.config.endDisabled,
                    curDate: self.config.curEndDate,
                    filterDate: self.config.endFilterDate,
                    defaultDisplayDate: self.config.endDefaultDisplayDate
                },
            };
        },
        methods: {
            handleStartPicker: function(curDate, oldDate, isInner) {
                //isInner参数代表此函数是否是组件内部触发的
                var self = this;

                self.startDate = curDate;
                self.$emit('date-change', self.startDate, self.endDate, isInner);
                self.$emit('input', {start: self.startDate, end: self.endDate});
                if(curDate) {
                    if(!oldDate || curDate.getTime() !== oldDate.getTime()) {
                        if(self.startDate && self.endDate) {
                            if(self.endDate.getTime() < self.startDate.getTime()) {
                                self.$refs.endDate.clearDate(false);
                            }
                        }
                        self.endPickerConfig.filterDate = function(date, dateMode) {
                            if(!self.startDate || date.getTime() > self.startDate.getTime() ||
                                (self.config.canEqual && date.toString() === self.startDate.toString())) {
                                if(self.config.endFilterDate) {
                                    return self.config.endFilterDate(date, dateMode);
                                }
                                return true;
                            }
                            return false;
                        }
                    }
                }else {
                    self.endPickerConfig.filterDate = self.config.endFilterDate;
                }
            },
            handleEndPicker: function(curDate, oldDate, isInner) {
                this.endDate = curDate;
                this.$emit('date-change', this.startDate, this.endDate, isInner);
                this.$emit('input', {start: this.startDate, end: this.endDate});
            }
        },
        watch: {
            'config': function(newVal, oldVal) {
                if(newVal) {
                    this.startPickerConfig.disabled = newVal.startDisabled;
	                this.startPickerConfig.filterDate = newVal.startFilterDate;
	                this.startPickerConfig.defaultDisplayDate = newVal.startDefaultDisplayDate;
                    this.endPickerConfig.disabled = newVal.endDisabled;
	                this.endPickerConfig.filterDate = newVal.endFilterDate;
	                this.endPickerConfig.defaultDisplayDate = newVal.endDefaultDisplayDate;
                }else {
                    this.startPickerConfig = {};
                    this.endPickerConfig = {};
                }
            },
            'config.curStartDate': function(newVal, oldVal) {
                this.startDate = this.startPickerConfig.curDate = newVal;
                this.handleStartPicker(newVal, oldVal, false);
            },
            'config.curEndDate': function(newVal, oldVal) {
                if(newVal && this.startDate) {
                    if(this.config.canEqual) {
                        if(newVal.getTime() < this.startDate.getTime()) {
                            return;
                        }
                    }else {
                        if(newVal.getTime() <= this.startDate.getTime()) {
                            return;
                        }
                    }
                }
                this.endDate = this.endPickerConfig.curDate = newVal;
	            this.handleEndPicker(newVal, oldVal, false);
            }
        },
        computed: {
	        dateMode: function() {
	        	return this.datePickerMode;
            }
        },
        created: function() {
            var self = this;

            self.startDate = this.startPickerConfig.curDate;
            self.endDate = this.endPickerConfig.curDate;
            if(this.startDate && this.endDate) {
                if(this.endDate.getTime() < this.startDate.getTime()) {
                    this.endPickerConfig.curDate = null;
                    this.endDate = null;
                }
                self.endPickerConfig.filterDate = function(date, dateMode) {
                    if(date.getTime() > self.startDate.getTime() ||
                        (self.config.canEqual && date.toString() === self.startDate.toString())) {
                    	//设置开始日期必须大于等于结束日期
                        if(self.config.endFilterDate) {
                            return self.config.endFilterDate(date, dateMode);
                        }
                        return true;
                    }
                    return false;
                }
            }
            this.$emit('input', {start: self.startDate, end: self.endDate});
        },
        components: {
            'date-picker': pick
        }
    };
</script>