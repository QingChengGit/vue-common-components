<template>
    <div class="multipleObject-select" @click="selectItem">
        <div class="select-item" v-for="item in multipleObject.list" :item-id="item.id">
            <i class="select-icon" :class="[item.selected ? activeClass : iconClass]">
            </i>
            <span class="select-text">{{item.text}}</span>
        </div>
    </div>
</template>

<style lang="less">
    .multipleObject-select {
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
    module.exports = {
        data: function() {
            var self = this;
            return {
                selectedItems: [],
            };
        },
        methods: {
            selectItem: function(e) {
                var target = e.target,
                    currentId,
                    l = this.selectedItems.length,
                    attrItem = 'item-id',
                    self = this,
                    curIndex;

                if(!target.hasAttribute(attrItem)){
                    target = target.parentNode;
                    while(target && target!== e.currentTarget){
                        if(target.hasAttribute(attrItem)){
                            break;
                        }else{
                            target = target.parentNode;
                        }
                    }
                }
                if(target.hasAttribute(attrItem)){
                    currentId =target.getAttribute(attrItem);
                    //some方法不会修改当前数组
                    self.multipleObject.list.some(function(el, index, arr) {
                        if(el.id === currentId){
                            curIndex = index;
                            if(self.isSingle){
                                if(el.selected){
                                    curIndex = void 0;
                                    return true;
                                }
                                //将之前选中的选置为未选中
                                self.selectedItems && (self.selectedItems.selected = false);
                                self.selectedItems = el;
                            }else{
                                if(el.selected){
                                    while(l--){
                                        if(self.selectedItems[l].id === currentId){
                                            self.selectedItems.splice(l, 1);
                                            break;
                                        }
                                    }
                                }else{
                                    self.selectedItems.push(el);
                                }
                            }
                            self.$emit('selectedItems', self.selectedItems);
                            return true;
                        }
                    });
                    if(curIndex !== void 0){
                        self.$set(self.multipleObject.list[curIndex], 'selected', !self.multipleObject.list[curIndex].selected);
                    }
                }
            }
        },
        computed: {
            iconClass: function() {
                if(this.isSingle){
                    return this.multipleObject.iconClass ? this.multipleObject.iconClass : 'icon-single-default';
                }
                return this.multipleObject.iconClass ? this.multipleObject.iconClass : 'icon-multile-default';
            },
            activeClass: function() {
                if(this.isSingle){
                    return this.multipleObject.iconActiveClass ? this.multipleObject.iconActiveClass : 'icon-circle-green-selected';
                }
                return this.multipleObject.iconActiveClass ? this.multipleObject.iconActiveClass : 'icon-square-selected';
            }
        },
        props: {
            isSingle: {
                type: Boolean,
                default:false
            },
            multipleObject: {
                type: Object,
                required: true
            }
        },
        created: function() {
            var self = this;
            self.multipleObject.list.some(function(el, index, arr) {
                if(el.selected){
                    self.selectedItems = self.isSingle ? el : [el];
                    return true;
                }
            });
            self.$emit('selectedItems', self.selectedItems);
        }
    };
</script>