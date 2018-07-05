<template>
    <div class="page-demo-date-picker page-padding">
        <div class="title-page">日期组件</div>
        <date-picker :config="dateConfig" @date-change="handleDateChange" :placeholder="'请选择日期'"></date-picker>
        <p class="placeholder-text">开始到结束日期的日期组件：</p>
        <start-end-picker :config="startEndConfig" @date-change="handleSelectedDate" v-model="startEndDate">
        </start-end-picker>
        <date-picker :config="dateTimeConfig" :placeholder="'请选择日期'"></date-picker>
        <p class="placeholder-text">新的开始到结束日期的日期组件：</p>
        <start-end-picker-new :config="startEndNewConfig" :date-picker-mode="mode" @date-change="handleNewPickerSelectedDate"
                  v-model="startEndDateNew"  :placeholder="'请选择日期'"></start-end-picker-new>
        <p class="placeholder-text">新的日期组件：</p>
        <date-picker-new :config="dateNewConfig" :date-picker-mode="mode"></date-picker-new>
        <div class="yunnex-btn green-btn" @click="query">查询</div>
    </div>
</template>

<style lang="less">
    .page-demo-date-picker {
        .title-page {
            margin-bottom: 20px;
        }
    }
</style>

<script>
    var commCss = require('common/styles/common'),
        datePicker = require('common/components/date-picker/index'),
        startEndPicker = require('common/components/start-end-picker/index'),
	    datePickerNew = require('common/components/date-picker-new/index'),
	    startEndPickerNew = require('common/components/start-end-picker-new/index');

    module.exports = {
        data: function() {
            return {
                /*
                 config object可以有如下属性(都非必选):
                 {
                 //禁用日期组件选择功能
                 disabled: [Boolean]
                 curDate: [Date],
                 //filterDate函数接受一个待过滤的日期参数，如果filterDate函数返回值为true则对应的日期
                 //可以选择，否则不能选择。
                 filterDate: [function],
                 //是否开启小时选择功能
                 isEnableTime: [Boolean],
                 //是否开启分钟
                 isEnableMinutes: [Boolean],
                 //是否开启秒
                 isEnableSecond: [Boolean]
                 }
                 */
                dateConfig: {
                    filterDate: function(date) {
                        //设置只能选择今天及以后的日期
                        if(date.getTime() >= (new Date()).getTime()) {
                            return true;
                        }
                        return false;
                    }
                },
                dateTimeConfig: {
                    //是否开启时间选择功能
                    isEnableTime: true
                },
                /*
                 config object可以有如下属性:
                 {
                 //禁用开始、结束日期
                 startDisabled: [Boolean],
                 endDisabled: [Boolean],
                 //设置开始、结束日期的当前日期
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
                 //是否开启时间选择功能，默认不开启
                 isEnableTime: [Boolean]
                 }
                 */
                //旧日期组件配置，推荐使用新的日期组件在新页面中
                startEndConfig: {
                    curStartDate: new Date('2017-12-03'),
	                curEndDate: new Date(),
                    canEqual: true,
                    startFilterDate: function(date) {
                        //设置只能选择今天及以后的日期
                        if(date.getTime() >= (new Date()).getTime()) {
                            return true;
                        }
                        return false;
                    },
                    isEnableTime: true,
                    isEnableMinutes: true,
                    isEnableSecond: true
                },
                startEndDate: {},
	            startEndDateNew: {},
                //新日期组件配置
	            startEndNewConfig: {
					curStartDate: new Date(),
					curEndDate: (function() {
						var now = new Date();

						now.setDate(now.getDate() - 2);
						return now;
					})()
                	/*
                     禁用开始、结束日期
                     startDisabled: [Boolean],
                     endDisabled: [Boolean],
                     //设置开始、结束日期的当前日期
                     curStartDate: [Date],
                     curEndDate: [Date],
                     ==========================
                     startFilterDate、endFilterDate函数接受一个待过滤的日期参数，如果filter函数返回值为true则对应的日期
                     可以选择，否则不能选择。都为可选参数
                     ==========================
                     startFilterDate: [function],
                     endFilterDate: [function]
                	 */
                },
                /*
                 新的日期组件的datePickerMode的取值为：'Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'其中的一个
                 datePickerMode: [String]
                 */
	            dateNewConfig: {
	            	/*
		            //禁用日期组件
		            disabled: [Boolean]
		            curDate: [Date],
		            //filterDate函数接受一个待过滤的日期参数，如果filterDate函数返回值为true则对应的日期
		            //可以选择，否则不能选择。
		            filterDate: [function]
		            */
	            	curDate: (function() {
	            		var now = new Date();

	            		now.setMonth(now.getMonth() - 1);
	            		return now;
                    })()
                },
	            mode: 'Month'
            };
        },
        methods: {
            handleDateChange: function(curDate, oldDate) {
                console.log('curDate:' + curDate + ',oldDate:' + oldDate);
            },
            handleSelectedDate: function(start, end) {
                console.log('你选择的开始日期是：' + (start ? start.toLocaleDateString() : '') + ',结束日期是：'
                    + (end ? end.toLocaleDateString() : ''));
            },
	        handleNewPickerSelectedDate: function(start, end, isInner) {
            	//isInner为true说明是组件内部触发了这个函数，否则是用户手动改变日期组件的日期导致触发了此函数
		        console.log('你选择的新开始日期是：' + (start ? start.toLocaleDateString() : '') + ',新结束日期是：'
			        + (end ? end.toLocaleDateString() : ''));
            },
            query: function() {
                //this.startEndDate为包含start、end属性的对象，start、end对应的值为当前选择的日期Date对象
                console.log(this.startEndDate);
            }
        },
        created: function() {
            var self = this;

            setTimeout(function() {
                self.mode = 'Day';
                console.log('改变了Mode');
                /*
                    如果组件初始化的时候congfig参数没有设置filterDate属性，则需要用此种方式让过滤器能够被vue检测到改变,
                    否则直接改变filterDate  vue可以响应到
                */
                self.$set(self.dateNewConfig, 'filterDate', function(date, curDateMode) {
                    /*
                     curDateMode为日期组件日期面板当前展示的模式值为：'Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'其中的一个
                     */
	                if(date.getFullYear() <= (new Date()).getFullYear()) {
		                return true;
	                }
	                return false;
                });
            }, 6000);
        },
        mounted: function() {
	        console.log(this.startEndDateNew);
        },
        components: {
            'date-picker': datePicker,
            'start-end-picker': startEndPicker,
	        'date-picker-new': datePickerNew,
            'start-end-picker-new': startEndPickerNew,
        }
    };
</script>