<template>
    <div class="checked-time" @click="showSelectClick">
        <div class="show-time" :data-label="this.label" :class="{'col-gay': isNochecked}">
            {{ checkedName }}
        </div>
        <div class="trangle"></div>
        <div class="select-box" v-show="isShow" @click.stop="selectClick($event)">
            <ul class="select-list">
                <li :class="{'over-li': isOver === -1}" @mousemove="isOver = -1" >
                    <input type="checkbox" name="time" :id="label+ '' +'-1'" v-model="isAll">
                    <label :for="label" class="fl-left" @click.self="allCheck"></label>
                    <span class="fl-left span-time">
                       全部
                    </span>
                </li>
                <li v-for="(item, index) in selectData" :key="index" class="clearfix" :class="{'over-li': isOver === index}" @mousemove="liMove(index)">
                    <input type="checkbox" name="time" :id="label+ '' +index" v-model="checkedList" :value="item[trackByName]">
                    <label :for="label+ '' +index" class="fl-left"></label>
                    <span class="fl-left span-time">
                       {{ item[keyName] }}
                    </span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'options','selectMoreConfig', 'label'],
    data () {
        return {
            isShow: false,
            selectData: this.options,
            checkedList: [],
            isAll: false,
            isOver: '',
            isNochecked: false,
            trackByName: this.selectMoreConfig.trackByName,
            keyName: this.selectMoreConfig.keyName
        }
    },
    watch: {
        'value': function (n, o) {
            if (Object.prototype.toString.call(n) === '[object Array]' && n.length > 0) {
                const _this = this;
                let tempArr = [];
                n.forEach(function (item) {
                    tempArr.push(item[_this.trackByName]);
                });
                _this.checkedList = tempArr;
            }
        },
        'options': function (n, o) {
            if (Object.prototype.toString.call(n) === '[object Array]') {
                this.selectData = n;
            }
        },
        'checkedList': function (n, o) {
            var flag = false;
            if (n.length < this.selectData.length) {
                this.isAll = false;
            } else if (n.length == this.selectData.length) {
                this.isAll = true;
            }
            if(n.length > 0 && n.length == o.length) {
                n.every(function (item, index) {
                    if (item !== o[index]) {
                        flag = true;
                        return false;
                    } else {
                        return true;
                    }
                })
            } else {
                flag = true;
            }
            if (flag) {
                const _this = this;
                let tempArr = [];
                n.forEach(function (val) {
                    _this.selectData.forEach(function (item) {
                        if (val.toString() === item[_this.trackByName].toString()) {
                            tempArr.push(item);
                        }
                    })
                });
                this.$emit('input', tempArr);
            }
        }
    },
    computed: {
        'checkedName': function () {
            const _this = this;
            let tempStr = '';
            if (this.checkedList.length > 0 && this.selectData.length > 0) {
                this.isNochecked = false;
                this.checkedList.forEach(function (val) {
                    _this.selectData.forEach(function (item) {
                        if (item[_this.trackByName].toString() === val.toString()) {
                            tempStr += item[_this.keyName] + ' / ';
                        }
                    })
                });
                tempStr = tempStr.replace(/^\s+|\s+$/g,"");
                tempStr = tempStr.substring(0, tempStr.length - 1);
            } else {
                tempStr = !this.selectMoreConfig.placeholder ? '' : this.selectMoreConfig.placeholder;
                this.isNochecked = true;
            }
            return tempStr;
        }
    },
    mounted () {
        if (this.value.length > 0 && this.options.length > 0) {
            const _this = this;
            let trackByName = _this.trackByName;
            this.options.forEach(function (item) {
                _this.value.forEach(function (val) {
                    if (val[trackByName].toString() === item[trackByName].toString()) {
                        _this.checkedList.push(val[trackByName]);
                    }
                });
            });
        }
        document.body.addEventListener('click', this.closeTimeList, false);
    },
    beforeDestroy () {
        document.body.removeEventListener('click', this.closeTimeList, false);
    },
    methods: {
        // 全部选中
        allCheck () {
            const _this = this;
            if (this.isAll) {
               this.checkedList = [];
            } else {
                const _this = this;
                let tempArr = [];
                this.selectData.forEach(function (item) {
                    tempArr.push(item[_this.trackByName]);
                });
                _this.checkedList = tempArr;
            }
        },
        showSelectClick () {
            if (this.isShow) {
                this.isShow = false;
            } else {
                this.isShow = true;
            }
        },
        closeTimeList (event) {
            var target = event.target;
            var allEle = this.$el.firstChild;
            var isNowEle = target.isEqualNode(allEle);
            if (!isNowEle) {
                this.isShow = false;
            }
        },
        liMove (index) {
            this.isOver = index;
        },
        selectClick () {}
    }
}
</script>

<style scoped lang="scss">
.fl-left {
    float: left;
}

.fl-right {
    float: right;
}

.clearfix {
    &::after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
}
.checked-time {
    position: relative;
    width: 242px;
    height: 34px;
    line-height: 32px;
    border: 1px solid #d7d7d7;
    font-size: 13px;
    cursor: pointer;
    .show-time {
        position: absolute;
        z-index: 888;
        width: 100%;
        height: 100%;
        padding: 0 17px 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        &.col-gay {
            color: #999;
        }
    }
    .trangle {
        position: absolute;
        top: 13px;
        right: 10px;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 8px solid #000000;
    }
    .select-box {
        position: absolute;
        top: 34px;
        left: 0;
        width: 242px;
        height: max-content;
        padding-top: 10px;
        padding-bottom: 10px;
        border: 1px solid #d7d7d7;
        background-color: #fff;
        z-index: 999;
        .select-list {
            box-sizing: border-box;
            list-style: none;
            max-height: 260px;
            overflow-y: auto;
            width: 100%;
            &::after {
                content: '';
                display: block;
                clear: both;
                visibility: hidden;
                height: 0;
            }
            &::-webkit-scrollbar {
                width: 10px;
                height: 50px;
                background-color: #f5f5f5;
            }
            &::-webkit-scrollbar-track {
                // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                border-radius: 5px;
                background-color: #F5F5F5;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 5px;
                // -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .8);
                background-color: #999;
            }
            li {
                position: relative;
                box-sizing: border-box;
                height: 30px;
                margin: 5px 0;
                padding-left: 15px;
                padding-top: 5px;
                &.over-li{
                    background-color: #fbfbfb;
                }
                input[type="checkbox"] {
                    position: absolute;
                    opacity: 0;
                }
                input[type="checkbox"] + label{
                    position: relative;
                    width: 20px;
                    height: 20px;
                    border: 1px solid #d7d7d7;
                    border-radius: 3px;
                    background-color: #fff;
                    cursor: pointer;
                }
                input[type="checkbox"]:checked + label{
                    background-color: #1ab394;
                    border-color: #1ab394;
                }
                input[type="checkbox"] + label::after{
                    content: '';
                    position: absolute;
                    width: 11px;
                    height: 6px;
                    border: 0 solid #fff;
                    border-width: 0 0 2px 2px;
                    top: 5px;
                    left: 3px;
                    transform: scale(0) rotate(-45deg);
                    transition: transform 0.2s linear;
                }
                input[type="checkbox"]:checked + label::after{
                    transform: scale(1) rotate(-45deg);
                }
                .span-time {
                    margin-left: 10px;
                    line-height: 20px;
                }
            }
        }
    }
}
</style>
