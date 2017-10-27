<template>
<div class="start-end-picker-component">
    <date-picker :placeholder="'开始日期'" @date-change="handleStartPicker"></date-picker>
    <span class="split-txt">至</span>
    <date-picker :config="endPickerConfig" :placeholder="'结束日期'" @date-change="handleEndPicker"></date-picker>
</div>
</template>

<style lang="less">
.start-end-picker-component {
    font-size: 0;
    .split-txt {
        display: inline-block;
        width: 24px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        background: #DCDCDC;
        text-align: center;
    }
}
</style>

<script>
    var pick = require('common/components/date-picker/index');

    module.exports = {
        data: function() {
            var self = this;

            return {
                startDate: null,
                endDate: null,
                startPickerConfig: {

                },
                endPickerConfig: {
                    filterDate: function() {
                        return true;
                    }
                }
            };
        },
        methods: {
            handleStartPicker: function(curDate, oldDate) {
                var self = this;

                self.startDate = curDate;
                self.$emit('date-change', self.startDate, self.endDate);
                if(curDate) {
                    if(!oldDate || curDate.getTime() !== oldDate.getTime()) {
                        self.endPickerConfig.filterDate = function(date) {
                            if(!self.startDate || date.getTime() > self.startDate.getTime()) {
                                return true;
                            }
                            return false;
                        }
                    }
                }else {
                    self.endPickerConfig.filterDate = function(date) {
                        return true;
                    }
                }
            },
            handleEndPicker: function(curDate, oldDate) {
                this.endDate = curDate;
                this.$emit('date-change', this.startDate, this.endDate);
            }
        },
        components: {
            'date-picker': pick
        }
    };
</script>