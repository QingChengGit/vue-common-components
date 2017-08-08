<template>
<div class="yunnex-select-component">
    <div class="selected-text" :class="{'disabled': disabled, 'selected-text-active': isActive}"
         @click="clickSelector">
        {{selectedItem ? selectedItem[selectTitle.text] : ''}}
        <i class="icon-select-arrow select-icon"></i>
    </div>
    <div class="select-item-wrap" v-show="isActive">
        <input type="text" class="search-input" :placeholder="searchPlaceholder" v-model="searchText"
               @input="search" v-if="isShowSearch"/>
        <ul class="option-container" @click="selectItem">
            <li class="option-item" :class="{'option-item-selected': selectedItem &&
                selectedItem[selectTitle.name] === item[selectTitle.name]}" v-for="item in selectData"
                :option-id="item.id">{{item[selectTitle.text]}}</li>
        </ul>
    </div>
</div>
</template>

<style lang="less">
.yunnex-select-component {
    position: relative;
    display: inline-block;
    width: 220px;
    font-size: 14px;
    .selected-text {
        position: relative;
        height: 30px;
        line-height: 30px;
        padding-left: 10px;
        border: 1px solid #ccc;
        color: #555;
        cursor: pointer;
    }
    .selected-text-active {
        border-color: #1ab394;
        border-bottom: none;
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
    .select-item-wrap {
        position: absolute;
        left: 0;
        top: 30px;
        width: 100%;
        z-index: 1000;
        border: 1px solid #1ab394;
        border-top: none;
        background-color: #fff;
    }
    .search-input {
        height: 30px;
        padding: 0 10px;
        margin: 6px 10px;
    }
    .option-container {
        height: 150px;
        overflow-y: scroll;
    }
    .option-item {
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        cursor: pointer;
        &:hover {
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
                    id = target.getAttribute('option-id'),
                    self = this;

                if(self.disabled) {
                    return;
                }
                if(id) {
                    self.selectData.some(function(item, index) {
                        if(item[self.selectTitle.name] == id){
                            self.selectedItem = item;
                            self.$emit('input', item[self.selectTitle.name]);
                            self.$emit('select-change', item);
                            return true;
                        }
                    });
                    self.searchText = '';
                }
                self.isActive = false;
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
                    this.isActive = false;
                }
            }
        },
        watch: {
            sourceData: function(newVal, oldVal) {
                var self = this;

                newVal.some(function(item) {
                    if(item.selected) {
                        self.selectedItem = item;
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