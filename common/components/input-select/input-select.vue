<template>
<div class="yunnex-input-select-component">
    <input type="text" class="yunnex-middle-input" :placeholder="searchPlaceholder" v-model="searchText"
           @click="clickSelector" @input="search"/>
    <div class="select-item-wrap" v-show="isActive && sourceData.length">
        <ul class="option-container" @click="selectItem">
            <li class="option-item" :class="{'option-item-selected': selectedItem &&
                selectedItem[selectTitle.name] === item[selectTitle.name]}" v-for="item in sourceData"
                :option-id="item[selectTitle.name]">{{item[selectTitle.text]}}</li>
        </ul>
        <div v-show="false" :data-tmp="setSelectedItem"></div>
    </div>
</div>
</template>

<style lang="less">
.yunnex-input-select-component {
    position: relative;
    display: inline-block;
    width: 242px;
    font-size: 13px;
    color: #333;
    vertical-align: middle;
    input.yunnex-middle-input {
        width: 100%;
    }
    .disabled {
        color: #c3cbd6;
        cursor: not-allowed;
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
    var DeferPerform = require('common/js/defer-perform'),
        defer,
        sprite = require('common/styles/yunnex-select-sprite.css');

    module.exports = {
        data: function() {
            return {
                searchText: '',
                selectedItem: null,
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
            searchPlaceholder: {
                type: String
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            search: function() {
                var self = this,
                    text = this.searchText.trim();

	            if(!text) {
		            self.$emit('input', {});
	            }
	            defer.pushData('search-text-change', text);
	            self.selectedItem = null;
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
                self.sourceData.some(function(item, index) {
                    if(item[self.selectTitle.name] == id){
                        self.selectedItem = item;
                        self.searchText = item[self.selectTitle.text];
                        self.$emit('input', item);
                        self.$emit('select-change', item, index);
                        return true;
                    }
                });
            },
            emitEvt: function(evt, arg) {
                this.$emit(evt, arg);
            },
            clickSelector: function() {
                if(this.disabled) {
                    return;
                }
                this.isActive = !this.isActive;
            },
            closeSelect: function(evt) {
                var target = evt.target;

                if(!this.$el.contains(target)) {
                	if(!this.selectedItem) {
		                this.searchText = '';
                    }
                    this.isActive = false;
                }
            }
        },
        mounted: function() {
            document.body.addEventListener('click', this.closeSelect, false);
	        defer = new DeferPerform(this.emitEvt, 1000, this);
        },
        beforeDestroy: function() {
            document.body.removeEventListener('click', this.closeSelect, false);
        }
    };
</script>