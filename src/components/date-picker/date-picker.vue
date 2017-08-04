<template>
<div class="date-picker-component">
    <span class="selected-date-text" @click="showDatePicker">
        <input type="text" class="place-holder-input" :placeholder="placeholder" readonly="readonly"
        v-model="selectedDateStr"/>
        <i class="date-icon" :class="dateIcon"></i>
    </span>
    <div class="date-picker-wrap" v-show="isShow">
        <div class="top-operate-area">
            <i class="arr-icon" @click="goPrevMonth">&lt;&lt;</i>
            <span class="cur-date" v-show="renderType === 'Date'">
                <span @click="changeYear">{{currentDateStr.split(' ')[0]}}</span>
                <span @click="changeMonth">{{currentDateStr.split(' ')[1]}}</span>
            </span>
            <span class="cur-date" @click="changeYear" v-show="renderType !== 'Date'">{{currentDateStr}}</span>
            <i class="arr-icon" @click="goNextMonth">&gt;&gt;</i>
        </div>
        <table class="picker-table days-table" v-show="renderType === 'Date'">
            <thead>
                <tr class="thead-tr">
                    <th v-for="w in week">{{w}}</th>
                </tr>
            </thead>
            <tbody @click="clickDay">
                <tr v-for="(item, index) in days">
                    <td v-for="d in item" class="day" :class="{'active': d.getMonth() === currentDate.getMonth()
                     && d.getDate() === currentDate.getDate(), 'disabled': !filter(d)}">
                        {{d.getDate()}}
                    </td>
                </tr>
                <tr>
                    <td colspan="7" class="operate-btn-td">
                        <div class="operate-btn" @click="clearDate">清空</div>
                        <div class="operate-btn" @click="selectToday">今天</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <table class="picker-table years-table" v-show="renderType === 'FullYear'">
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
    </div>
</div>
</template>

<style lang="less">
.date-picker-component {
    position: relative;
    display: inline-block;
    font-size: 12px;
    .border {
        border: 1px solid #d3d3d3;
    }
    .border-radius {
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
    }
    .selected-date-text {
        position: relative;
        display: inline-block;
    }
    .place-holder-input {
        width: 120px;
        height: 30px;
        line-height: 30px;
        padding: 0 8px;
        .border;
        .border-radius;
        color: #676a6c;
        background-color: #fff;
        cursor: text;
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
    .date-picker-wrap {
        position: absolute;
        left: 0;
        top: 32px;
        z-index: 99;
        width: 200px;
        padding: 10px;
        .border;
        .border-radius;
        background-color: #fff;
    }
    .top-operate-area {
        margin-bottom: 16px;
    }
    .arr-icon {
        display: inline-block;
        width: 30px;
        height: 24px;
        line-height: 24px;
        font-size: 16px;
        font-style: normal;
        text-align: center;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        cursor: pointer;
    }
    .cur-date {
        display: inline-block;
        width: 110px;
        height: 36px;
        line-height: 36px;
        font-size: 14px;
        color: #333;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
    }
    .picker-table {
        border-collapse: collapse;
        td, th {
            color: #657180;
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
        .disabled {
            color: #c3cbd6;
            background-color: #f7f7f7;
            cursor: not-allowed;
        }
        .operate-btn-td {
            &:hover {
                background-color: #fff;
            }
        }
    }
    .days-table {
        td, th {
            width: 24px;
            height: 24px;
            line-height: 24px;
        }
    }
    .operate-btn {
        display: inline-block;
        width: 60px;
        height: 36px;
        line-height: 36px;
        margin-right: 16px;
        .border-radius;
        color: #fff;
        background-color: #1ab394;
        text-align: center;
        &:last-child {
            margin-right: 0;
        }
    }
    .years-table, .month-table {
        td {
            width: 60px;
            height: 40px;
        }
    }
}
</style>

<script>
    var monthArr = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月',
        '11月', '12月'],
        weekArr = ['日', '一', '二', '三', '四', '五', '六'],
        dom = require('common/js/dom'),
        renderTypeMap;

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
                endDate.setDate(d + 1);
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
    function getItemRowCol(targetDom, classIdentifier) {
        //获取单元格所在位置的索引
        var row,
            col,
            sibling;

        if((' ' + targetDom.className + ' ').indexOf(' ' + classIdentifier + ' ') === -1 || (' ' + targetDom.className + ' ').indexOf(' disabled ') > -1) {
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
        'Date': function(date) {
            return date.getFullYear() + '年 ' + monthArr[date.getMonth()];
        },
        'Month': function(date) {
            return date.getFullYear() + '年';
        },
        'FullYear': function(date) {
            var year = date.getFullYear(),
                gap = year % 10;

            return (year - gap) + '年-' + (year - gap + 10) + '年';
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
                    curDate: [Date],
                    //filterDate函数接受一个待过滤的日期参数，如果filterDate函数返回值为true则对应的日期
                    //可以选择，否则不能选择。
                    filterDate: [function]
                }
             */
            config: {
                type: Object
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
                renderType: 'Date'
            };
        },
        computed: {
            selectedDateStr: function() {
                var date,
                    month,
                    day;

                date = this.selectedDate;
                if(!date) {
                    return '';
                }
                month = date.getMonth() + 1;
                day = date.getDate();
                month = month > 9 ? month : '0' + month;
                day = day > 9 ? day : '0' + day;

                return date.getFullYear() + '-' + month + '-' + day;
            },
            currentDateStr: function() {
                return renderTypeMap[this.renderType](this.currentDate);
            },
            filter: function() {
                return (this.config && this.config.filterDate) || function () {
                    return true;
                };
            },
            dateIcon: function() {
                return (this.config && this.config.dateIcon) || 'icon-date';
            }
        },
        methods: {
            showDatePicker: function() {
                this.isShow = true;
            },
            goPrevMonth: function() {
                var year,
                    month;

                if(this.renderType === 'Date') {
                    month = this.currentDate.getMonth();
                    this.currentDate = new Date(this.currentDate.setMonth(month - 1));
                }else if(this.renderType === 'Month') {
                    year = this.currentDate.getFullYear() - 1;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else {
                    year = this.currentDate.getFullYear() - 10;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }
                this.updateDatePickerPanel();
            },
            goNextMonth: function() {
                var year,
                    month;

                if(this.renderType === 'Date') {
                    month = this.currentDate.getMonth();
                    this.currentDate = new Date(this.currentDate.setMonth(month + 1));
                }else if(this.renderType === 'Month') {
                    year = this.currentDate.getFullYear() + 1;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }else {
                    year = this.currentDate.getFullYear() + 10;
                    this.currentDate = new Date(this.currentDate.setFullYear(year));
                }
                this.updateDatePickerPanel();
            },
            changeYear: function() {
                //切换的时候每页显示10年
                if(this.renderType !== 'FullYear') {
                    this.renderType = 'FullYear';
                    this.updateDatePickerPanel();
                }
            },
            changeMonth: function() {
                this.renderType = 'Month';
                if(!this.months.length) {
                    this.updateDatePickerPanel();
                }
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
                if(!this.selectedDate || this.days[o.row][o.col].getTime() !== this.selectedDate.getTime()) {
                    this.$emit('date-change', this.days[o.row][o.col], this.selectedDate ? new Date(this.selectedDate.getTime()) : null);
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
                this.renderType = 'Date';
                this.updateDatePickerPanel();
            },
            clearDate: function() {
                if(!this.selectedDate) {
                    this.isShow = false;
                    return;
                }
                this.$emit('date-change', null, new Date(this.selectedDate.getTime()));
                this.selectedDate = null;
                this.isShow = false;
            },
            selectToday: function() {
                this.currentDate = new Date();
                this.$emit('date-change', new Date(), this.selectedDate ? new Date(this.selectedDate.getTime()) : null);
                this.selectedDate = new Date();
                this.isShow = false;
                this.updateDatePickerPanel();
            },
            updateDatePickerPanel: function() {
                switch(this.renderType){
                    case 'Date':
                        this.days = getRenderDays(this.currentDate.getFullYear(), this.currentDate.getMonth());
                        break;
                    case 'FullYear':
                        this.years = getRenderYears(this.currentDate.getFullYear());
                        break;
                    case 'Month':
                        this.months = getRenderMonths();
                        break;
                }
            },
            closeDatePicker: function(evt) {
                var target = evt.target;

                if(target !== this.$el && !dom.parent(target, '.date-picker-component')) {
                    this.isShow = false;
                    this.renderType = 'Date';
                }
            }
        },
        created: function() {
            if(!this.config) {
                this.config = {};
            }
            this.currentDate = this.config.curDate || new Date();
            this.updateDatePickerPanel();
            this.selectedDate = this.config.curDate;
        },
        mounted: function() {
            var picker = this.$el.querySelector('.date-picker-wrap');

            document.body.addEventListener('click', this.closeDatePicker, false);
            picker.style.top = this.$el.querySelector('.selected-date-text').clientHeight + 6 + 'px';
        },
        beforeDestory: function() {
            document.body.removeEventListener('click', this.closeDatePicker, false);
        }
    };
</script>