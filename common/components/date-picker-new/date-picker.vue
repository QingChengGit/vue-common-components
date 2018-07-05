<template>
    <div class="date-picker-component">
    <span class="selected-date-text" @click="showDatePicker">
        <input type="text" class="place-holder-input" :class="{'date-picker-input-disabled': config.disabled}"
               :placeholder="placeholder" readonly="readonly"
               v-model="selectedDateStr"/>
        <i class="date-icon" :class="dateIcon"></i>
    </span>
        <div class="date-picker-wrap" v-show="isShow">
            <div class="top-operate-area">
                <i class="icon-picker-left-arrow arr-icon" @click="goPrevDate"></i>
                <span class="cur-date">
                    <span class="fs14" @click="changeYear">{{currentDateStr.split(' ')[0]}}</span>
                    <span class="fs14" @click="changeMonth">{{currentDateStr.split(' ')[1]}}</span>
                    <div class="fs14 operate-btn" @click="clearDate(true)">清空</div>
                </span>
                <!--<span class="cur-date" @click="changeYear" v-show="renderType !== 'Day'">{{currentDateStr}}</span>-->
                <i class="icon-picker-right-arrow arr-icon" @click="goNextDate"></i>
            </div>
            <table class="picker-table days-table" v-show="renderType === 'Day'">
                <thead>
                <tr class="thead-tr">
                    <th v-for="w in week">{{w}}</th>
                </tr>
                </thead>
                <tbody @click="clickDay">
                <tr v-for="(item, index) in days">
                    <td v-for="d in item" class="day" :class="{'active': d.getMonth() === currentDate.getMonth()
                     && d.getDate() === currentDate.getDate() && d.getFullYear() === currentDate.getFullYear(),
                      'disabled': !filter(d), 'gray-text': d.getMonth() !== currentDate.getMonth()}">
                        {{d.getDate()}}
                    </td>
                </tr>
                <!--<tr>
                    <td colspan="7" class="operate-btn-td">
                        &lt;!&ndash;<div class="operate-btn" @click="clearDate">清空</div>
                        <div class="operate-btn" @click="selectToday">今天</div>&ndash;&gt;
                    </td>
                </tr>-->
                </tbody>
            </table>
            <table class="picker-table years-table" v-show="renderType === 'Year'">
                <tbody @click="clickYear">
                <tr v-for="(item, index) in years">
                    <td v-for="d in item" class="year" :class="{'active': d === currentDate.getFullYear(),
                'disabled': !filter(new Date(d, 11, 31, 23, 59, 59))}">
                        {{d}}
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="picker-table month-table" v-show="renderType === 'Month'">
                <tbody @click="clickMonth">
                <tr v-for="(item, index) in months">
                    <td v-for="(d, idx) in item" class="month" :class="{'active': (index * 3 + idx) === currentDate.getMonth(),
                    'disabled': !filter(new Date(currentDate.getFullYear(), (index * 3 + idx + 1), 0, 23, 59, 59))}">
                        {{d}}
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="picker-table time-table" v-show="renderType === 'Hour'">
                <tbody @click="clickTime">
                <tr v-for="(item, index) in times">
                    <td v-for="(d, idx) in item" class="time" :class="{'active': (index * 4 + idx) === currentDate.getHours(),
                    'disabled': !filter(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
                     (index * 4 + idx), 59, 59))}">
                        {{d}}
                    </td>
                </tr>
                </tbody>
            </table>
            <table class="picker-table min-sec-table" v-show="renderType === 'Minute' || renderType === 'Second'">
                <tbody @click="clickMinSec">
                <tr v-for="(item, index) in minSecs">
                    <td v-for="(d, idx) in item" class="min-sec" :class="{'active': (index * 6 + idx) === currentDate[renderType === 'Minute' ? 'getMinutes': 'getHours'](),
                    'disabled': !filter(new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(),
                     currentDate.getHours(), renderType === 'Minute' ? (index * 6 + idx) : currentDate.getMinutes(),
                      renderType === 'Second' ? (index * 6 + idx) : 59))}">
                        {{d}}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="less">
    .date-picker-component {
        position: relative;
        display: inline-block;
        font-size: 13px;
        .border {
            border: 1px solid #d7d7d7;
        }
        .border-radius {
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .selected-date-text {
            position: relative;
            display: inline-block;
            .place-holder-input {
                width: 190px;
                height: 34px;
                line-height: 32px;
                padding: 0 8px 0 16px;
                .border;
                color: #676a6c;
                background-color: #fff;
                cursor: text;
            }
            .date-picker-input-disabled {
                color: #c3cbd6;
                background-color: #f7f7f7;
                cursor: not-allowed;
            }
            .date-icon {
                position: absolute;
                top: 50%;
                right: 10px;
                z-index: 2;
                -webkit-transform: translate(0, -50%);
                -moz-transform: translate(0, -50%);
                -ms-transform: translate(0, -50%);
                -o-transform: translate(0, -50%);
                transform: translate(0, -50%);
            }
        }
        .date-picker-wrap {
            position: absolute;
            left: 0;
            top: 36px;
            z-index: 99;
            width: 282px;
            padding: 18px 14px;
            .border;
            .border-radius;
            background-color: #fff;
        }
        .top-operate-area {
            margin-bottom: 16px;
        }
        .arr-icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
        }
        .cur-date {
            display: inline-block;
            width: 200px;
            height: 36px;
            line-height: 36px;
            font-size: 0;
            color: #333;
            text-align: center;
            vertical-align: middle;
            cursor: pointer;
        }
        .fs14 {
            font-size: 14px;
        }
        .picker-table {
            border-collapse: collapse;
            td, th {
                color: #333;
                text-align: center;
            }
            td {
                cursor: pointer;
                &:hover {
                    background-color: #eee;
                }
            }
            .active {
                .border-radius;
                color: #fff;
                background-color: #1ab394;
            }
            .gray-text {
                color: #999;
            }
            .disabled {
                color: #c3cbd6;
                background-color: #f7f7f7;
                cursor: not-allowed;
            }
        }
        .days-table {
            td, th {
                width: 36px;
                height: 32px;
            }
        }
        .min-sec-table {
            td {
                width: 42px;
                height: 32px;
            }
        }
        .days-table {
            th {
                font-size: 14px;
            }
        }
        .time-table {
            td {
                width: 63px;
                height: 40px;
            }
        }
        .operate-btn {
            display: inline-block;
            width: 60px;
            height: 36px;
            line-height: 36px;
            margin-right: 16px;
            .border-radius;
            color: #1ab394;
            text-align: center;
            &:last-child {
                margin-right: 0;
            }
        }
        .years-table, .month-table {
            td {
                width: 84px;
                height: 50px;
            }
        }
    }
</style>

<script>
    var monthArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
            '11月', '12月'],
        weekArr = ['日', '一', '二', '三', '四', '五', '六'],
        dom = require('common/js/dom'),
        renderTypeMap,
        css = require('common/styles/date-picker-sprite.css');

    function getDaysByYearAndMonth(year, month) {
        var rs,
            date = new Date(year, month + 1, 0);

        rs = date.getDate();

        return rs;
    }
    function getRenderDays(year, month) {
        var startDate,
            endDate,
            tmpDate,
            arr = [],
            rs = [],
            d,
            n,
            l;

        d = getDaysByYearAndMonth(year, month);
        startDate = new Date(year, month, 1);
        endDate = new Date(year, month, d);
        tmpDate = new Date(year, month, 0);
        if(startDate.getDay() === 0) {
            //星期天
            l = 0;
        }else {
            l = startDate.getDay();
        }
        while(l--) {
            arr.push((function(_y, _m, _d) {
                return new Date(_y, _m, _d, 23, 59, 59);
            })(tmpDate.getFullYear(), tmpDate.getMonth(), tmpDate.getDate() - l));
            //day = tmpDate.getDate() - l;
        }
        l = startDate.getDate();
        while(l <= endDate.getDate()) {
            arr.push((function(_d) {
                return new Date(year, month, _d, 23, 59, 59);
            })(l));
            //day = l;
            l++;
        }
        if(arr.length < 42) {
            //日期面板显示为6行7列，所以此处与42相比
            n = arr.length;
            l = 42 - n;
            while(l--) {
                endDate.setDate(endDate.getDate() + 1);
                arr.push((function(_y, _m, _d) {
                    return new Date(_y, _m, _d, 23, 59, 59);
                })(endDate.getFullYear(), endDate.getMonth(), 42 - n - l));
                //day = 42 - n - l;
            }
        }
        n = 0;
        arr.forEach(function(item, index) {
            if(index % 7 === 0) {
                rs[n] = [];
            }
            rs[n].push(item);
            if(index % 7 === 6) {
                n++;
            }
        });
        return rs;
    }
    function getRenderYears(curYear) {
        var yearGap = 10,
            startYear,
            endYear,
            n = 0,
            m = 0,
            //一行显示3个年份
            rowSize = 3,
            rs = [];

        startYear = curYear - curYear % 10;
        endYear = startYear + yearGap;
        while(startYear <= endYear) {
            if(m % rowSize === 0) {
                rs[n] = [];
            }
            rs[n].push(startYear);
            if(m % rowSize == rowSize - 1) {
                n++;
            }
            startYear++;
            m++;
        }

        return rs;
    }
    function getRenderMonths() {
        var rowSize = 3,
            n = 0,
            rs = [];

        monthArr.forEach(function(item, index) {
            if(index % rowSize === 0) {
                rs[n] = [];
            }
            rs[n].push(item);
            if(index % rowSize === rowSize - 1) {
                n++;
            }
        });

        return rs;
    }
    function getRenderHours() {
        var rowSize = 4,
            n = 0,
            m = 0,
            rs = [];

        for(n;n < 24;n++) {
            if(n % rowSize === 0) {
                m = n / rowSize;
                rs[m] = [];
            }
            rs[m].push((n > 9 ? n : '0' + n) + ':00');
        }

        return rs;
    }
    function getRenderMinutesOrSeconds(minutesOrSeconds) {
        var rowSize = 6,
            n = 0,
            m = 0,
            rs = [];

        for(n;n < 60;n++) {
            if(n % rowSize === 0) {
                m = n / rowSize;
                rs[m] = [];
            }
            rs[m].push(minutesOrSeconds + ':' + (n > 9 ? n : '0' + n));
        }

        return rs;
    }
    function getItemRowCol(targetDom, classIdentifier) {
        //获取单元格所在位置的索引
        var row,
            col,
            sibling;

        if((' ' + targetDom.className + ' ').indexOf(' ' + classIdentifier + ' ') === -1 ||
            (' ' + targetDom.className + ' ').indexOf(' disabled ') > -1) {
            return;
        }
        row = col = 0;
        sibling = dom.prev(targetDom);
        while(sibling) {
            sibling = dom.prev(sibling);
            col++;
        }
        sibling = dom.prev(dom.parent(targetDom));
        while(sibling) {
            sibling = dom.prev(sibling);
            row++;
        }

        return {row: row, col: col};
    }
    renderTypeMap = {
        'Day': function(date) {
            return date.getFullYear() + '年 ' + monthArr[date.getMonth()];
        },
        'Month': function(date) {
            return date.getFullYear() + '年';
        },
        'Year': function(date) {
            var year = date.getFullYear(),
                gap = year % 10;

            return (year - gap) + '年-' + (year - gap + 10) + '年';
        },
        'Hour': function(date) {
            return date.getFullYear() + '年 ' + monthArr[date.getMonth()] + date.getDate() + '日';
        },
        'Minute': function(date) {
            return date.getFullYear() + '年 ' + monthArr[date.getMonth()] + date.getDate() + '日';
        },
        'Second': function(date) {
            return date.getFullYear() + '年 ' + monthArr[date.getMonth()] + date.getDate() + '日';
        }
    };
    module.exports = {
        props: {
            placeholder: {
                type: String
            },
            /*
             config object可以有如下属性:
             {
             //禁用日期组件
             disabled: [Boolean]
             curDate: [Date],
             //filterDate函数接受一个待过滤的日期参数，如果filterDate函数返回值为true则对应的日期
             //可以选择，否则不能选择。
             filterDate: [function]
             }
             //datePickerMode的取值为：'Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'其中的一个
             datePickerMode: [String]
             */
            config: {
                type: Object
            },
			datePickerMode: {
				validator: function (value) {
					var modeArr = ['Year', 'Month', 'Day', 'Hour', 'Minute', 'Second'];

					return modeArr.indexOf(value) > -1;
				}
            }
        },
        data: function() {
            return {
                isShow: false,
                selectedDate: null,
                currentDate: '',
                week: weekArr,
                days: [],
                years: [],
                months: [],
                times: [],
                minSecs: [],
                renderType: 'Day'
            };
        },
        computed: {
            selectedDateStr: function() {
                var date,
                    month,
                    day,
                    hours,
                    minutes,
                    second;

                date = this.selectedDate;
                if(!date) {
                    return '';
                }
                month = date.getMonth() + 1;
                day = date.getDate();
                hours = date.getHours();
                minutes = date.getMinutes();
                second = date.getSeconds();
                month = month > 9 ? month : '0' + month;
                day = day > 9 ? day : '0' + day;
                month = this.datePickerMode !== 'Year' ? '-' + month : '';
                if(this.datePickerMode !== 'Year' && this.datePickerMode !== 'Month') {
                	day = '-' + day;
                }else {
                	day = '';
                }
				if(this.datePickerMode === 'Hour' || this.datePickerMode == 'Minute' || this.datePickerMode == 'Second') {
					hours = ' ' + (hours > 9 ? hours : '0' + hours);
				}else {
					hours = '';
				}
				if(this.datePickerMode === 'Minute' || this.datePickerMode == 'Second') {
					minutes = ':' + (minutes > 9 ? minutes : '0' + minutes);
				}else if(this.datePickerMode === 'Hour'){
					minutes = ':00';
				}else {
					minutes = '';
                }
				if(this.datePickerMode == 'Second') {
					second = ':' + (second > 9 ? second : '0' + second);
				}else {
					second = '';
				}

                return date.getFullYear() + month + day + hours + minutes + second;
            },
            currentDateStr: function() {
                return renderTypeMap[this.renderType](this.currentDate);
            },
            filter: function() {
            	var self = this,
                    fn = (this.config && this.config.filterDate) || function () {
			            return true;
		            };

            	return function(date) {
            		return fn(date, self.renderType);
                };
            },
            dateIcon: function() {
                return (this.config && this.config.dateIcon) || 'icon-date';
            }
        },
        methods: {
            showDatePicker: function() {
                if(this.config.disabled) {
                    return;
                }
                this.isShow = true;
            },
	        goPrevDate: function() {
                var year,
                    month,
                    day;

                if(this.renderType === 'Day') {
                    month = this.currentDate.getMonth();
                    this.currentDate = new Date(this.currentDate.setMonth(month - 1));
                }else if(this.renderType === 'Month') {
                    year = this.currentDate.getFullYear() - 1;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else if(this.renderType === 'Year'){
                    year = this.currentDate.getFullYear() - 10;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else {
	                day = this.currentDate.getDate();
	                this.currentDate = new Date(this.currentDate.setDate(day - 1));
                }
                this.updateDatePickerPanel();
            },
	        goNextDate: function() {
                var year,
                    month,
                    day;

                if(this.renderType === 'Day') {
                    month = this.currentDate.getMonth();
                    this.currentDate = new Date(this.currentDate.setMonth(month + 1));
                }else if(this.renderType === 'Month') {
                    year = this.currentDate.getFullYear() + 1;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else if(this.renderType === 'Year'){
                    year = this.currentDate.getFullYear() + 10;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else {
	                day = this.currentDate.getDate();
	                this.currentDate = new Date(this.currentDate.setDate(day + 1));
                }
                this.updateDatePickerPanel();
            },
            changeYear: function() {
                //切换的时候每页显示10年
                if(this.renderType !== 'Year') {
                    this.renderType = 'Year';
                    this.updateDatePickerPanel();
                }
            },
            changeMonth: function() {
                this.renderType = 'Month';
                if(!this.months.length) {
                    this.updateDatePickerPanel();
                }
            },
            clickTime: function(evt) {
                var target = evt.target,
                    o;

                o = getItemRowCol(target, 'time');
                if(!o) {
                    return;
                }
                if(!this.filter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
                        this.currentDate.getDate(), o.row * 4 + o.col, 59, 59))) {
                    //防止用户作弊
                    return;
                }
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
                    this.currentDate.getDate(), o.row * 4 + o.col, 0, 0);
                if(!this.selectedDate || this.currentDate.getTime() !== this.selectedDate.getTime()) {
                    this.$emit('date-change', this.currentDate, this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
                    this.$emit('input', this.currentDate);
                }
                this.selectedDate = this.currentDate;
                if(this.datePickerMode !== 'Hour') {
                    this.renderType = 'Minute';
                }else {
                    this.renderType = 'Day';
                    this.isShow = false;
                }
                this.updateDatePickerPanel();
            },
            clickDay: function(evt) {
                var target = evt.target,
                    o;

                o = getItemRowCol(target, 'day');
                if(!o) {
                    return;
                }
                if(!this.filter(this.days[o.row][o.col])) {
                    //防止用户作弊
                    return;
                }
                this.currentDate = new Date(this.days[o.row][o.col].getTime());
                if(this.datePickerMode !== 'Day') {
                    if(this.selectedDate) {
                        this.currentDate.setHours(this.selectedDate.getHours());
                    }else {
                        this.currentDate.setHours((new Date()).getHours());
                    }
                    //设置秒、分钟
                    this.currentDate.setSeconds(0);
                    this.currentDate.setMinutes(0);
                    this.renderType = 'Hour';
                    this.updateDatePickerPanel();
                    return;
                }
                if(!this.selectedDate || this.days[o.row][o.col].getTime() !== this.selectedDate.getTime()) {
                    this.$emit('date-change', this.days[o.row][o.col], this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
                    this.$emit('input', this.days[o.row][o.col]);
                }
                this.selectedDate = this.days[o.row][o.col];
                this.isShow = false;
            },
            clickYear: function(evt) {
                var target = evt.target,
                    o;

                o = getItemRowCol(target, 'year');
                if(!o) {
                    return;
                }
                if(!this.filter(new Date(this.years[o.row][o.col], 11, 31, 23, 59, 59))) {
                    //防止用户作弊
                    return;
                }
                this.currentDate.setFullYear(this.years[o.row][o.col]);
                if(this.datePickerMode === 'Year') {
					this.selectedDate = new Date(this.currentDate.getTime());
                	this.isShow = false;
					this.$emit('date-change', this.currentDate, this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
					this.$emit('input', this.currentDate);
                	return;
                }
                this.renderType = 'Month';
                this.updateDatePickerPanel();
            },
            clickMonth: function(evt) {
                var target = evt.target,
                    o;

                o = getItemRowCol(target, 'month');
                if(!o) {
                    return;
                }
                if(!this.filter(new Date(this.currentDate.getFullYear(), o.row * 3 + o.col + 1, 0, 23, 59, 59))) {
                    //防止用户作弊
                    return;
                }
                this.currentDate.setMonth(o.row * 3 + o.col);
				if(this.datePickerMode === 'Month') {
					this.selectedDate = new Date(this.currentDate.getTime());
					this.isShow = false;
					this.$emit('date-change', this.currentDate, this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
					this.$emit('input', this.currentDate);
					return;
				}
                this.renderType = 'Day';
                this.updateDatePickerPanel();
            },
            clickMinSec: function(evt) {
                var target = evt.target,
                    o,
                    minutes = 0,
                    second = 59;

                o = getItemRowCol(target, 'min-sec');
                if(!o) {
                    return;
                }
                if(this.renderType === 'Minute') {
                    minutes = o.row * 6 + o.col;
                }else {
                    //当前为秒模式
                    minutes = this.currentDate.getMinutes();
                    second = o.row * 6 + o.col;
                }
                if(!this.filter(new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
                        this.currentDate.getDate(), this.currentDate.getHours(), minutes, second))) {
                    //防止用户作弊
                    return;
                }
                this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(),
                    this.currentDate.getDate(), this.currentDate.getHours(), minutes, second);
                if(!this.selectedDate || this.currentDate.getTime() !== this.selectedDate.getTime()) {
                    this.$emit('date-change', this.currentDate, this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
                    this.$emit('input', this.currentDate);
                }
                this.selectedDate = this.currentDate;
                if(this.renderType === 'Minute') {
                    if(this.datePickerMode === 'Second') {
                        this.renderType = 'Second';
                    }else {
                        this.isShow = false;
                        this.renderType = 'Day';
                    }
                }else {
                    this.isShow = false;
                    this.renderType = 'Day';
                }
                this.updateDatePickerPanel();
            },
            clearDate: function(isInner) {
                //isInner代表某个方法是否是组件内部触发
                if(!this.selectedDate) {
                    this.isShow = false;
                    return;
                }
                this.$emit('date-change', null, new Date(this.selectedDate.getTime()), isInner);
                this.$emit('input', null);
                this.selectedDate = null;
                this.isShow = false;
            },
            selectToday: function() {
                this.currentDate = new Date();
                this.$emit('date-change', new Date(), this.selectedDate ? new Date(this.selectedDate.getTime()) : null, true);
                this.$emit('input', new Date());
                this.selectedDate = new Date();
                this.isShow = false;
                this.updateDatePickerPanel();
            },
            updateDatePickerPanel: function() {
                var date = this.currentDate,
                    minSec;

                if(!this.selectedDate && this.config.defaultDisplayDate) {
                    date = this.config.defaultDisplayDate;
                    this.currentDate = new Date(date.getTime());
	                this.config.defaultDisplayDate = null;
                }
	            minSec = this.renderType === 'Minute' ? date.getHours() :
		            date.getMinutes();

                switch(this.renderType){
                    case 'Day':
                        this.days = getRenderDays(date.getFullYear(), date.getMonth());
                        break;
                    case 'Year':
                        this.years = getRenderYears(date.getFullYear());
                        break;
                    case 'Month':
                        this.months = getRenderMonths();
                        break;
                    case 'Hour':
                        this.times = getRenderHours();
                        break;
                    default:
                        this.minSecs = getRenderMinutesOrSeconds(minSec);
                }
            },
            closeDatePicker: function(evt) {
                var target = evt.target;

                if(target !== this.$el && !dom.parent(target, '.date-picker-component')) {
                    this.isShow = false;
					this.renderType = this.datePickerMode;
                }
            }
        },
        watch: {
            'config.curDate': function(newVal, oldVal) {
                this.currentDate = newVal || new Date();
                this.selectedDate = newVal;
                this.updateDatePickerPanel();
                this.$emit('input', newVal);
            },
            'datePickerMode': function(newVal, oldVal) {
	            this.renderType = newVal;
	            this.updateDatePickerPanel();
            }
        },
        created: function() {
            if(!this.config) {
                this.config = {};
            }
            if(this.config.curDate) {
                this.$emit('input', this.config.curDate);
            }
            this.currentDate = this.config.curDate || new Date();
            this.renderType = this.datePickerMode;
            this.updateDatePickerPanel();
            this.selectedDate = this.config.curDate;
        },
        mounted: function() {
            var picker = this.$el.querySelector('.date-picker-wrap');

            document.body.addEventListener('click', this.closeDatePicker, false);
        },
        beforeDestroy: function() {
            document.body.removeEventListener('click', this.closeDatePicker, false);
        }
    };
</script>