<template>
    <div class="two-level-select-dialog">
        <yunnex-pop :dialog-config="popConfig">
            <div slot="pop-content" class="store-list-pop">
                <div class="store-pop-left">
                    <yunnex-select :source-data="selectData" :select-title="selectTitle" v-model="selectValue">
                    </yunnex-select>
                    <input type="text" class="yunnex-input vertical-base" v-model="searchContent"
                           placeholder="请输入查询关键字"/>
                    <div class="yunnex-btn green-btn query-btn" @click="query">查询</div>
                    <div class="store-list-wrap">
                        <div class="category-list" @click="clickCategory">
                            <div class="category-item" v-for="(item, idx) in firstCategoryConfig.list"
                                 :class="{'selected-text': item[firstCategoryId] === curCategory[firstCategoryId]}"
                                :category-id="item[firstCategoryId]">
                                {{item[firstCategoryText]}}
                            </div>
                        </div>
                        <div class="store-list">
                            <yunnex-cr-box :config="selectAllBoxConfig" v-model="allCheckedItems"
                                           @checked-change="handleSelectAllChange" class="select-all-box">
                            </yunnex-cr-box>
                            <yunnex-cr-box :config="secondCategoryConfig" v-model="storeCheckedItems"
                                           @checked-change="handleSecondCategoryChange">
                            </yunnex-cr-box>
                        </div>
                    </div>
                </div>
                <div class="store-pop-right">
                    <div class="selected-store-item">
                        已选：{{selectedData.length}}
                    </div>
                    <div class="selected-store-wrap" @click="removeStore">
                        <div class="selected-store-item" v-for="d in selectedData">
                            {{d.secondCategory[secondCategoryText]}}
                            <i class="icon-popup-close-white delete-icon" :id="d.secondCategory[secondCategoryId]"
                            :category="d.firstCategory[firstCategoryId]">×</i>
                        </div>
                    </div>
                </div>
                <div class="pop-operate-btns vertical-center">
                    <div class="yunnex-btn" @click="cancelSelectStore">取消</div>
                    <div class="yunnex-btn green-btn" @click="saveSelectedStore">确定</div>
                    <!--<div class="yunnex-btn green-btn" :class="{'disabled-btn': storeCheckedItems.length === 0}"
                         @click="saveSelectedStore">确定</div>-->
                </div>
            </div>
        </yunnex-pop>
    </div>
</template>

<style lang="scss">
    @import "../../styles/variable";
    .two-level-select-dialog {
        .yunnex-dialog-content {
            border-top: $border;
        }
        .store-list-pop {
            width: 880px;
            font-size: 0;
        }
        .store-pop-left, .store-pop-right {
            position: relative;
            display: inline-block;
            width: 340px;
            padding: 20px 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
            vertical-align: top;
        }
        .store-pop-left {
            width: 540px;
            padding-right: 0;
            border-right: $border;
        }
        .vertical-base {
            vertical-align: baseline;
        }
        .selected-text {
            background-color: $green;
            color: #fff;
        }
        .query-btn {
            width: 110px;
            height: 32px;
            line-height: 30px;
            margin-left: 15px;
            margin-top: 20px;
            vertical-align: baseline;
        }
        .store-list-wrap{
            height: 330px;
            margin-top: 16px;
            border-top: $border;
            overflow-y: auto;
        }
        .category-list {
            display: inline-block;
            width: 250px;
            margin-right: 4px;
            vertical-align: top;
            .category-item {
                height: 34px;
                line-height: 34px;
                padding-left: 8px;
                font-size: 14px;
                cursor: pointer;
            }
        }
        .selected-store-wrap {
            height: 390px;
            overflow-y: auto;
        }
        .store-list {
            display: inline-block;
            padding-left: 10px;
            border-left: $border;
            vertical-align: middle;
        }
        .select-all-box {
            height: 40px;
            line-height: 40px;
        }
        .selected-store-item {
            position: relative;
            height: 46px;
            line-height: 46px;
            border-bottom: 1px solid #e5e5e5;
            color: #494949;
            font-size: 14px;
        }
        .delete-icon {
            position: absolute;
            top: 50%;
            right: 0;
            width: 20px;
            height: 16px;
            line-height: 16px;
            -webkit-transform: translate(0, -50%);
            -moz-transform: translate(0, -50%);
            -ms-transform: translate(0, -50%);
            -o-transform: translate(0, -50%);
            transform: translate(0, -50%);
            font-size: 25px;
            color: darkgray;
            font-style: normal;
            text-align: center;
            cursor: pointer;
        }
        .yunnex-cr-box-component {
            display: block;
        }
    }
</style>

<script>
	var axios = require('libs/axios'),
		yunnexPop = require('common/components/pop/index'),
		yunnexCRBox = require('common/components/yunnex-cr-box-new/index'),
		util = require('common/js/util'),
		commonCss = require('common/styles/common.scss'),
		prevFirstSelectedData = [];

	module.exports = {
		props: {
			/*
             firstCategoryConfig有如下属性:
             list   [Array],一类类别列表数组
             propertyMap   [Object],类别数组对应的属性名
             propertyMap: {
                key: [String],用做唯一标识的属性名，通常为类别的id
                val: [String],类别名称对应的属性名
             }
			 */
			firstCategoryConfig: {
				type: Object,
                required: true
            },
            /*
             secondCategoryConfig有如下属性:
             list   [Array],一类类别列表数组
             propertyMap   [Object],类别数组对应的属性名
             propertyMap: {
                 key: [String],用做唯一标识的属性名，通常为类别的id
                 val: [String],类别名称对应的属性名
             },
             curSelectedData    [Array],初始化被选中的类别项集合。如果数组中的项为对象则会取对象的propertyMap.key属性的
             值作为某项是否选中的比较标准,否则直接将该项的值作为是否选中的比较标准。
             curDisabledData    [Array],初始化被禁用的类别项集合。如果数组中的项为对象则会取对象的propertyMap.key属性的
             值作为某项是否禁用的比较标准,否则直接将该项的值作为是否禁用的比较标准。
             */
			secondCategoryConfig: {
				type: Object,
				required: true
			},
			value: {},
			dialogTitle: {
				type: String
			}
		},
		data: function() {
			var self = this;

			return {
				storeCheckedItems: [],
				storeList: [],
				searchContent: '',
				allCheckedItems: [],
				selectAllBoxConfig: {
					propertyMap: {
						key: 'id',
						val: 'text'
					},
					list: [
						{id: '01', text: '全选'}
					],
					isSingle: false,
                    curSelectedData: []
				},
				storeCheckBoxConfig: {
					isBlock: true,
					isSingle: false,
					list: [],
					propertyMap: {}
				},
				curCategory: '',
                selectedData: [],
				popConfig: {
					title: '选择商品',
					isShow: false
				}
			};
		},
		methods: {
			show: function() {
				this.popConfig.isShow = true;
			},
			clickCategory: function(evt) {
				var target = evt.target,
					id,
					self = this;

				if(!target.hasAttribute('category-id')) {
					return;
				}
				id = target.getAttribute('category-id');
				if(self.curCategory && self.curCategory[self.firstCategoryId] == id) {
					return;
				}
				self.firstCategoryConfig.list.some(function(item, index) {
					if(item[self.firstCategoryId] == id){
						self.curCategory = item;
						self.$emit('first-category-change', item, index);
						return true;
					}
				});
            },
			query: function() {
				var param = {
					storeName: this.searchContent
				};
				this.$emit('query', param);
			},
			handleSelectAllChange: function(items) {
				var self = this;

				if(items.length) {
					self.secondCategoryConfig.curSelectedData = self.secondCategoryConfig.list.concat();
                }else {
					self.secondCategoryConfig.curSelectedData = [];
                }
			},
			handleSecondCategoryChange: function() {
                this.updateSelectedData();
            },
			removeStore: function(evt) {
				var target = evt.target,
					id,
                    category,
					self = this;

				if((' ' + target.className + ' ').indexOf(' delete-icon ') === -1) {
					return;
				}
				id = target.getAttribute('id');
				category = target.getAttribute('category');
				if(!id || !category) {
					return;
                }
                if(category != self.curCategory[self.firstCategoryId]) {
	                self.selectedData.some(function(item, idx) {
		                if(item.firstCategory[self.firstCategoryId] == category) {
			                self.selectedData.splice(idx, 1);
			                return true;
		                }
	                });
	                return;
                }
				self.storeCheckedItems.some(function(item, index) {
					if(item[self.secondCategoryId] == id) {
						self.storeCheckedItems.splice(index, 1);
						return true;
					}
				});
			},
			cancelSelectStore: function() {
				var self = this;

				this.popConfig.isShow = false;
				if(prevFirstSelectedData[0][this.firstCategoryId] !== this.curCategory[this.firstCategoryId]) {
					this.selectedData = [];
					this.firstCategoryConfig.curSelectedData = prevFirstSelectedData;
					this.initCurSelectedFirstCategory();
                }
			},
			saveSelectedStore: function() {
				this.$emit('input', this.selectedData);
				this.$emit('store-selected', this.selectedData);
				this.popConfig.isShow = false;
				prevFirstSelectedData = [this.curCategory];
			},
            updateSelectedData: function() {
	            var self = this,
		            flag = false,
		            arr = [],
                    prevArr = [],
		            index;

	            self.storeCheckedItems.forEach(function(t, idx) {
		            flag = false;
		            self.selectedData.some(function(s, _idx) {
			            if(s.firstCategory[self.firstCategoryId] === self.curCategory[self.firstCategoryId] &&
                            s.secondCategory[self.secondCategoryId] === t[self.secondCategoryId]) {
				            flag = true;
				            index = _idx;
				            return true;
			            }
		            });
		            if(!flag) {
			            //说明是新增加的商品
			            arr[idx] = {
				            firstCategory: self.curCategory,
				            secondCategory: t
			            };
		            }else {
			            arr[idx] = self.selectedData[index];
		            }
	            });
	            self.selectedData.forEach(function (item, index) {
	            	//保存其他类别的数据
                   if(item.firstCategory[self.firstCategoryId] !== self.curCategory[self.firstCategoryId]) {
	                   prevArr.push(item);
                   }
	            });
	            self.selectedData = prevArr.concat(arr);
            },
            initCurSelectedFirstCategory: function() {
				var self = this,
                    item = self.firstCategoryConfig.curSelectedData[0],
                    tmp;

	            if(util.isObject(item)) {
	            	tmp = item[self.firstCategoryId];
	            }else {
		            //将用户传入的curSelectedData中的每项当做选中项的id
	            	tmp = item;
                }
                if(self.curCategory[self.firstCategoryId] === tmp) {
	            	return;
                }
                self.firstCategoryConfig.list.some(function(t, index) {
                    if(t[self.firstCategoryId] === tmp) {
                        self.curCategory = t;
                        self.$emit('first-category-change', t, index);
                        return true;
                    }
                });
            }
		},
		watch: {
			dialogTitle: function(newVal, old) {
				this.popConfig.title = newVal;
			},
			storeCheckedItems: function() {
				//自动选中或者取消全选框
				if(this.secondCategoryConfig.list.length && this.storeCheckedItems.length === this.secondCategoryConfig.list.length) {
					this.selectAllBoxConfig.curSelectedData = ['01'];
				}else {
					this.selectAllBoxConfig.curSelectedData = [];
				}
				this.updateSelectedData();
            },
			'firstCategoryConfig.curSelectedData': function (newVal, oldVal) {
				this.initCurSelectedFirstCategory();
			}
		},
        computed: {
			firstCategoryId: function() {
                return this.firstCategoryConfig.propertyMap.key;
            },
            firstCategoryText: function() {
	            return this.firstCategoryConfig.propertyMap.val;
            },
            secondCategoryId: function() {
	            return this.secondCategoryConfig.propertyMap.key;
            },
	        secondCategoryText: function() {
		        return this.secondCategoryConfig.propertyMap.val;
	        }
        },
		created: function() {
			var self = this;

			if(self.dialogTitle) {
				self.popConfig.title = self.dialogTitle;
			}
			self.secondCategoryConfig.isBlock = true;
			self.initCurSelectedFirstCategory();
			prevFirstSelectedData = self.firstCategoryConfig.curSelectedData;
		},
		components: {
			'yunnex-cr-box': yunnexCRBox,
			'yunnex-pop': yunnexPop
		}
	};
</script>