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
        .icon-disabled-checked {
            background-color: #d7d7d7;
        }
        // 短信余量
        .note-surplus {
            margin-left: 3px;
            color: #1ab394;
        }
    }
</style>

<script>
    var util = require('common/js/util'),
        sprite = require('common/styles/yunnex-cr-box-sprite.css');

    module.exports = {
        data: function() {
            return {
	            selectedData: []
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
                    prevData,
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
                    self.config.list.some(function(element, index, arr) {
                        if(element[self.dataKey] == currentId){
                            if(self.isDisabled(element)) {
                                return;
                            }
                            if(self.config.isSingle){
                            	if(self.selectedData[0][self.dataKey] != currentId) {
		                            self.$emit('checked-change', element, self.selectedData[0]);
		                            self.selectedData = [element];
		                            self.$emit('input', self.selectedData[0]);
                                }
                            }else{
	                            prevData = self.selectedData.concat();
                                l = self.selectedData.length;
                                while(l--){
                                    if(self.selectedData[l][self.dataKey] == currentId){
                                    	//说明是取消选中操作
                                        self.selectedData.splice(l, 1);
                                        hasSelected = true;
                                        break;
                                    }
                                }
	                            !hasSelected && self.selectedData.push(element);
	                            self.$emit('checked-change', self.selectedData, prevData);
	                            self.$emit('input', self.selectedData);
                            }
                            return true;
                        }
                    });
                }
            },
            isSelected: function(item) {
                var self = this,
                    flag = false;

                if(self.config.isSingle) {
                    return item[self.dataKey] === self.selectedData[0][self.dataKey];
                }
                self.selectedData.some(function(t, index) {
                    if(t[self.dataKey] === item[self.dataKey]) {
                        flag = true;
                        return true;
                    }
                });

                return flag;
            },
	        isDisabled: function(item) {
		        var self = this,
                    disabledData = self.config.curDisabledData,
			        flag = false;

		        if(!disabledData || !disabledData.length) {
		        	return flag;
                }
		        disabledData.some(function(t) {
		        	if(util.isObject(t)) {
		        		if(t[self.dataKey] === item[self.dataKey]) {
		        			flag = true;
                        }
                    }else {
				        if(item[self.dataKey] === t) {
					        flag = true;
				        }
			        }
                    return flag;
                });

		        return flag;
	        },
            getIconClass: function(item) {
                var selectedFlag,
                    disabledFlag;
                
	            selectedFlag = this.isSelected(item);
	            disabledFlag = this.isDisabled(item);
                if(selectedFlag) {
                    return disabledFlag ? this.activeDisabledClass : this.activeClass;
                }
                return disabledFlag ? this.defaultDisabledClass : this.defaultClass;
            },
            initSelectedData: function() {
                var self = this;

	            if(self.config.isSingle) {
	            	//单选
                    if(self.config.curSelectedData && self.config.curSelectedData.length) {
	                    self.selectedData = [self.config.curSelectedData[0]];
                    }else {
	                    self.selectedData = [];
                    }
                }else {
		            self.selectedData = [];
		            self.config.curSelectedData.forEach(function(item) {
			            self.config.list.some(function(t) {
				            if(util.isObject(item)) {
					            if(t[self.dataKey] === item[self.dataKey]) {
						            self.selectedData.push(t);
						            return true;
					            }
				            }else {
					            //将用户传入的curSelectedData中的每项当做选中项的id
					            if(t[self.dataKey] === item) {
						            self.selectedData.push(t);
						            return true;
					            }
				            }
			            });
		            });
                }
                self.$emit('input', self.selectedData);
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
		        this.initSelectedData();
	        },
	        'config.curSelectedData': function (newVal, oldVal) {
		        this.initSelectedData();
	        },
	        'config.list': function (newVal, oldVal) {
		        this.initSelectedData();
	        }
        },
        created: function() {
            var self = this;

            self.initSelectedData();
        }
    };
</script>