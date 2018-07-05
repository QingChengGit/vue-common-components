<template>
<div class="yunnex-select-component" :style="{width: appearanceWidth + 'px'}">
    <div class="selected-text" :class="{'disabled': disabled, 'selected-text-active': isActive,
        'crack': isActive && appearanceWidth}" @click="clickSelector">
        {{selectedItem ? selectedItem[selectTitle.text] : ''}}
        <i class="icon-select-arrow select-icon"></i>
    </div>
    <div class="decorate-line" :style="{width: appearanceWidth - 2 + 'px'}" v-if="isActive && appearanceWidth"></div>
    <div class="select-item-wrap" v-show="isActive" :class="{'tp29': appearanceWidth}">
        <input type="text" class="search-input" :placeholder="searchPlaceholder" v-model="searchText"
               @input="search" v-if="isShowSearch"/>
        <ul class="option-container" @click="selectItem">
            <li class="option-item" :class="{'option-item-selected': selectedItem &&
                selectedItem[selectTitle.name] === item[selectTitle.name]}" v-for="item in selectData"
                :option-id="item[selectTitle.name]">{{item[selectTitle.text]}}</li>
        </ul>
        <div v-show="false" :data-tmp="setSelectedItem"></div>
    </div>
</div>
</template>

<style lang="less">
.yunnex-select-component {
    position: relative;
    display: inline-block;
    width: 242px;
    font-size: 13px;
    color: #333;
    vertical-align: middle;
    .selected-text {
        position: relative;
        width: 100%;
        height: 34px;
        line-height: 32px;
        padding-left: 16px;
        padding-right: 18px;
        border: 1px solid #d7d7d7;
        overflow: hidden;
        cursor: pointer;
    }
    .selected-text-active {
        background-color: #fbfbfb;
    }
    .select-icon {
        position: absolute;
        right: 10px;
        top: 50%;
        -webkit-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        transform: translate(0, -50%);
    }
    .disabled {
        color: #c3cbd6;
        cursor: not-allowed;
    }
    .decorate-line {
        position: absolute;
        height: 0;
        top: 34px;
        left: 1px;
        border-top: 1px solid #fff;
        font-size: 0;
        z-index: 1001;
    }
    .select-item-wrap {
        position: absolute;
        left: 0;
        top: 34px;
        min-width: 242px;
        max-width: 420px;
        width: 100%;
        z-index: 1000;
        padding: 0 10px;
        border: 1px solid #d7d7d7;
        background-color: #fff;
        -webkit-box-shadow: 0 4px 2px 4px #fcfcfc;
        -moz-box-shadow: 0 4px 2px 4px #fcfcfc;
        box-shadow: 0 4px 2px 4px #fcfcfc;
    }
    .crack {
        border-bottom: none;
    }
    .tp33 {
        top: 33px;
    }
    .search-input {
        width: 100%;
        height: 30px;
        padding: 0 10px;
        margin: 13px 0;
    }
    .option-container {
        height: 150px;
        margin: 0 -10px;
        overflow-y: scroll;
        &:hover .option-item {
            color: #333;
            background-color: #fff;
        }
    }
    .option-item {
        line-height: 20px;
        padding: 7px 10px 7px 16px;
        word-wrap: break-word;
        white-space: normal;
        cursor: pointer;
        &:hover.option-item {
            color: #fff;
            background-color: #1ab394;
        }
    }
    .option-item-selected {
        color: #fff;
        background-color: #1ab394;
    }
}
</style>

<script>
    var sprite = require('common/styles/yunnex-select-sprite.css');

    module.exports = {
        data: function() {
            return {
                searchText: '',
                selectedItem: null,
                selectData: [],
                isActive: false
            };
        },
        props: {
            selectTitle: {
                type: Object,
                required: true
            },
            sourceData: {
                type: Array,
                required: true
            },
            isShowSearch: {
                type: Boolean,
                default: false
            },
            searchPlaceholder: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            },
            appearanceWidth: {
                type: Number
            }
        },
        methods: {
            search: function() {
                var self = this,
                    text = this.searchText.trim(),
                    reg;

                self.selectData = [];
                if(text) {
                    reg = new RegExp(text, 'i');
                    self.sourceData.forEach(function(item, index) {
                        if(reg.test(item[self.selectTitle.text])) {
                            self.selectData.push(item);
                        }
                    });
                }else {
                    this.selectData = this.sourceData.concat([]);
                }
            },
            selectItem: function(evt) {
                var target = evt.target,
                    id,
                    self = this;

                if(self.disabled || !target.hasAttribute('option-id')) {
                    return;
                }
                self.searchText = '';
                self.isActive = false;
                id = target.getAttribute('option-id');
                if(self.selectedItem && self.selectedItem[self.selectTitle.name] == id) {
                    return;
                }
                self.selectData.some(function(item, index) {
                    if(item[self.selectTitle.name] == id){
                        self.selectedItem = item;
                        self.$emit('input', item[self.selectTitle.name]);
                        self.$emit('select-change', item, index);
                        return true;
                    }
                });
            },
            clickSelector: function() {
                if(this.disabled) {
                    return;
                }
                this.isActive = !this.isActive;
                this.isActive && (this.selectData = this.sourceData.concat([]));
            },
            closeSelect: function(evt) {
                var target = evt.target;

                if(!this.$el.contains(target)) {
                    this.searchText = '';
                    this.isActive = false;
                }
            }
        },
        computed: {
            setSelectedItem: function() {
                var self = this;

                self.sourceData.some(function(item) {
                    if(item.selected) {
                        self.selectedItem = item;
                        self.$emit('input', item[self.selectTitle.name]);
                        //self.$emit('select-change', item);
                        return true;
                    }
                });
            }
        },
        mounted: function() {
            document.body.addEventListener('click', this.closeSelect, false);
        },
        beforeDestroy: function() {
            document.body.removeEventListener('click', this.closeSelect, false);
        }
    };
</script>