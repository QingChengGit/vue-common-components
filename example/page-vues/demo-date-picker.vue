<template>
    <div class="page-date-picker">
        <date-picker :config="dateConfig" @date-change="handleDateChange" :placeholder="'请选择日期'"></date-picker>
        <p>开始到结束日期的日期组件：</p>
        <start-end-picker @date-change="handleSelectedDate"></start-end-picker>
    </div>
</template>

<style lang="less">
    .page-file-upload {
        padding: 20px 20px;
    }
</style>

<script>
    var css = require('common/styles/date-picker-sprite.css'),
        datePicker = require('common/components/date-picker/index'),
        startEndPicker = require('common/components/start-end-picker/index');

    module.exports = {
        data: function() {
            return {
                dateConfig: {
                    //可选
                    //curDate: new Date('2017-09-04'),
                    filterDate: function(date) {
                        //设置只能选择今天及以后的日期
                        if(date.getTime() >= (new Date()).getTime()) {
                            return true;
                        }
                        return false;
                    }
                }
            };
        },
        methods: {
            handleDateChange: function(curDate, oldDate) {
                console.log('curDate:' + curDate + ',oldDate:' + oldDate);
            },
            handleSelectedDate: function(start, end) {
                alert('你选择的开始日期是：' + (start ? start.toLocaleDateString() : '') + ',结束日期是：'
                + (end ? end.toLocaleDateString() : ''));
            }
        },
        components: {
            'date-picker': datePicker,
            'start-end-picker': startEndPicker
        }
    };
</script>