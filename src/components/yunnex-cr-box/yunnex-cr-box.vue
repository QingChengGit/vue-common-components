<template>
    <div class="yunnex-cr-box-component" @click="selectItem">
        <div class="select-item" v-for="item in config.list" :item-id="item[dataKey]">
            <i class="select-icon" :class="[isSelected(item) ? activeClass : iconClass]">
            </i>
            <span class="select-text">{{item[dataVal]}}</span>
        </div>
    </div>
</template>

<style lang="less">
    .yunnex-cr-box-component {
        display: inline-block;
        vertical-align: middle;
        .select-item {
            display: inline-block;
            margin-right: 20px;
            font-size: 0;
            vertical-align: middle;
            cursor: pointer;
            &:last-child {
                margin-right: 0;
            }
        }
        .select-icon {
            display: inline-block;
            margin-right: 10px;
            vertical-align: middle;
        }
        .icon-single-default, .icon-multile-default {
            width: 20px;
            height: 20px;
            border: 2px solid #999;
            font-size: 0;
        }
        .icon-single-default {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
        }
        .icon-multile-default {
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
        }
        .select-text {
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
                            self.$emit('checked-change', self.selectedItems);
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
            iconClass: function() {
                if(this.config.isSingle){
                    return this.config.iconClass ? this.config.iconClass : 'icon-single-default';
                }
                return this.config.iconClass ? this.config.iconClass : 'icon-multile-default';
            },
            activeClass: function() {
                if(this.config.isSingle){
                    return this.config.iconActiveClass ? this.config.iconActiveClass : 'icon-circle-green-checked';
                }
                return this.config.iconActiveClass ? this.config.iconActiveClass : 'icon-square-green-checked';
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
            this.initSelectedItems();
        }
    };
</script>