<template>
    <div class="yunnex-cr-box-component" @click="selectItem">
        <div class="select-item" v-for="item in config.list"
             :class="[config.isBlock ? 'cr-block' : 'cr-inline-block']">
            <i class="select-icon" :class="[getIconClass(item)]" :item-id="item[dataKey]">
            </i>
            <div class="select-text" v-html="item[dataVal]"></div>
        </div>
    </div>
</template>

<style lang="less">
    .yunnex-cr-box-component {
        .border-radius (@radius: 4px) {
            -webkit-border-radius: @radius;
            -moz-border-radius: @radius;
            border-radius: @radius;
        }
        display: inline-block;
        vertical-align: middle;
        .select-item {
            margin-right: 40px;
            font-size: 0;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
        }
        .cr-block {
            display: block;
            margin-bottom: 12px;
            &:last-child {
                margin-bottom: 0;
            }
        }
        .cr-inline-block {
            display: inline-block;
            vertical-align: middle;
        }
        .select-icon {
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
        }
        .icon-single-default, .icon-multiple-default, .icon-single-default-disabled, .icon-multiple-default-disabled {
            width: 20px;
            height: 20px;
            border: 1px solid #d7d7d7;
            font-size: 0;
        }
        .icon-single-default {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
        .icon-single-default-disabled {
            .border-radius(10px);
            background-color: #d7d7d7;
        }
        .icon-circle-disabled-checked {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            background-color: #d7d7d7;
        }
        .icon-multiple-default {
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
        }
        .icon-multiple-default-disabled {
            .border-radius;
            background-color: #d7d7d7;
        }
        .select-text {
            display: inline-block;
            line-height: 1;
            font-size: 14px;
            color: #666;
            vertical-align: middle;
        }
    }
</style>

<script>
    var sprite = require('common/styles/yunnex-cr-box-sprite.css');

    module.exports = {
        data: function() {
            return {
                selectedItems: ''
            };
        },
        props: {
            config: {
                type: Object,
                required: true
            }
        },
        methods: {
            selectItem: function(e) {
                var target = e.target,
                    currentId,
                    l,
                    attrItem = 'item-id',
                    self = this,
                    hasSelected = false;

                if(!target.hasAttribute(attrItem)){
                    target = target.parentNode;
                    while((target && target !== document) && target!== e.currentTarget){
                        if(target.hasAttribute(attrItem)){
                            break;
                        }else{
                            target = target.parentNode;
                        }
                    }
                }
                if(target !== document && target.hasAttribute(attrItem)){
                    currentId =target.getAttribute(attrItem);
                    self.config.list.some(function(el, index, arr) {
                        if(el[self.dataKey] == currentId){
                            if(el.disabled) {
                                return;
                            }
                            if(self.config.isSingle){
                                if(self.selectedItems && self.selectedItems[self.dataKey] == currentId) {
                                    return true;
                                }
                                self.selectedItems = el;
                            }else{
                                l = self.selectedItems.length;
                                while(l--){
                                    if(self.selectedItems[l][self.dataKey] == currentId){
                                        self.selectedItems.splice(l, 1);
                                        hasSelected = true;
                                        break;
                                    }
                                }
                                !hasSelected && self.selectedItems.push(el);
                            }
                            self.$emit('input', self.selectedItems);
                            self.$emit('checked-change', self.selectedItems, currentId, !hasSelected);
                            return true;
                        }
                    });
                }
            },
            isSelected: function(item) {
                var self = this,
                    flag = false;

                if(self.config.isSingle) {
                    return item[self.dataKey] === self.selectedItems[self.dataKey];
                }
                self.selectedItems.some(function(t, index) {
                    if(t[self.dataKey] === item[self.dataKey]) {
                        flag = true;
                        return true;
                    }
                });

                return flag;
            },
            getIconClass: function(item) {
                var flag;

                flag = this.isSelected(item);
                if(flag) {
                    return item.disabled ? this.activeDisabledClass : this.activeClass;
                }
                return item.disabled ? this.defaultDisabledClass : this.defaultClass;
            },
            initSelectedItems: function() {
                var self = this;

                if(!self.config.isSingle) {
                    self.selectedItems = [];
                }
                self.config.list.some(function(item) {
                    if(item.checked) {
                        if(self.config.isSingle) {
                            self.selectedItems = item;
                            return true;
                        }else {
                            self.selectedItems.push(item);
                        }
                    }
                });
                self.$emit('input', self.selectedItems);
                //self.$emit('checked-change', self.selectedItems);
            }
        },
        computed: {
            defaultClass: function() {
                return this.config.iconDefaultClass ? this.config.iconDefaultClass :
                    this.config.isSingle ? 'icon-single-default' : 'icon-multiple-default';
            },
            defaultDisabledClass: function() {
                return this.config.iconDefaultDisabledClass ? this.config.iconDefaultDisabledClass :
                    this.config.isSingle ? 'icon-single-default-disabled' : 'icon-multiple-default-disabled';
            },
            activeClass: function() {
                return this.config.iconActiveClass ? this.config.iconActiveClass :
                    this.config.isSingle ? 'icon-circle-green-checked' : 'icon-square-green-checked';
            },
            activeDisabledClass: function() {
                return this.config.iconActiveDisabledClass ? this.config.iconActiveDisabledClass :
                    this.config.isSingle ? 'icon-circle-disabled-checked' : 'icon-square-disabled-checked';
            },
            dataKey: function() {
                return this.config.propertyMap.key;
            },
            dataVal: function() {
                return this.config.propertyMap.val;
            }
        },
        watch: {
            'config.isSingle': function(newVal, oldVal) {
                this.initSelectedItems();
            },
            'config.list': function(newVal, oldVal) {
                this.initSelectedItems();
            }
        },
        created: function() {
            var self = this;

            self.initSelectedItems();
        }
    };
</script>