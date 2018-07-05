<template>
    <div class="store-select-pop">
        <yunnex-pop :dialog-config="popConfig">
            <div slot="pop-content" class="store-list-pop">
                <div class="store-pop-left">
                    <div class="pro-city-area-condition" v-if="isEnablePcaCondition">
                        <yunnex-select :source-data="provinceList" :select-title="selectTitle"
                                       @select-change="changeProvince" v-model="selectedProvince">
                        </yunnex-select>
                        <yunnex-select :source-data="cityList" :select-title="selectTitle"
                                       @select-change="changeCity" v-model="selectedCity">
                        </yunnex-select>
                        <yunnex-select :source-data="areaList" :select-title="selectTitle"
                                       v-model="selectedArea">
                        </yunnex-select>
                    </div>
                    <input type="text" class="yunnex-input vertical-base" v-model="searchContent"
                           placeholder="请输入查询关键字"/>
                    <div class="yunnex-btn green-btn query-btn" @click="queryStoreList">查询</div>
                    <div class="store-list-wrap">
                        <div class="store-list">
                            <yunnex-cr-box :config="selectAllBoxConfig" v-model="allCheckedItems"
                                           @checked-change="handleSelectAllChange">
                            </yunnex-cr-box>
                        </div>
                        <yunnex-cr-box :config="storeCheckBoxConfig" v-model="selectedStores"
                                       @checked-change="handleStoreChange">
                        </yunnex-cr-box>
                    </div>
                </div>
                <div class="store-pop-right">
                    <div class="selected-store-item">
                        已选：{{storeCheckedItems.length}}
                    </div>
                    <div class="selected-store-wrap">
                        <div class="selected-store-item" v-for="(store, idx) in storeCheckedItems">
                            {{store[storeCheckBoxConfig.propertyMap.val]}}
                            <i class="icon-popup-close-white delete-icon" @click="removeStore(idx)"
                               :id="store[storeCheckBoxConfig.propertyMap.key]">×</i>
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
    .store-select-pop {
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
            width: 440px;
            padding: 20px 20px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: left;
            vertical-align: top;
        }
        .store-pop-left {
            border-right: $border;
        }
        .vertical-base {
            vertical-align: baseline;
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
            overflow-y: auto;
        }
        .selected-store-wrap {
            height: 390px;
            overflow-y: auto;
        }
        .store-list-wrap {
            margin-top: 16px;
        }
        .store-list {
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
        .yunnex-select-component {
            width: 130px;
        }
    }
</style>

<script>
    var axios = require('libs/axios'),
        yunnexPop = require('common/components/pop/index'),
        yunnexSelect = require('common/components/yunnex-select/index'),
        yunnexCRBox = require('common/components/yunnex-cr-box/index'),
        util = require('common/js/util'),
        commonCss = require('common/styles/common.scss'),
        defaultOptions = [{code: '', name: '请选择'}],
        prevCheckedStores,
        ctx = '/user-web-admin';

    module.exports = {
        props: {
            storeList: {
                type: Array,
                required: true
            },
            propertyMap: {
                type: Object,
                required: true
            },
            value: {},
            //是否开启省市区查询条件,默认开启
            isEnablePcaCondition: {
                type: Boolean,
                default: true
            },
            dialogTitle: {
                type: String
            }
        },
        data: function() {
            return {
                storeCheckedItems: [],
                provinceList: defaultOptions,
                cityList: defaultOptions,
                areaList: defaultOptions,
                storeList: [],
                selectTitle: {
                    name: 'code',
                    text: 'name'
                },
	            selectedStores: null,
                selectedProvince: '',
                selectedCity: '',
                selectedArea: '',
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
                    isSingle: false
                },
                storeCheckBoxConfig: {
                    isBlock: true,
                    isSingle: false,
                    list: [],
                    propertyMap: {}
                },
                popConfig: {
                    title: '选择门店',
                    isShow: false
                }
            };
        },
        methods: {
            show: function() {
                this.popConfig.isShow = true;
            },
            queryStoreList: function() {
                var param = {
                    storeName: this.searchContent
                };
                if(this.isEnablePcaCondition) {
                    util.extend(param, {
                        province: this.selectedProvince,
                        city: this.selectedCity,
                        area: this.selectedArea
                    });
                }
                this.$emit('query', param);
            },
            changeProvince: function() {
                var self = this,
                    response;

                if(!self.selectedProvince) {
                    self.cityList = defaultOptions;
                    self.selectedCity = '';
                    self.areaList = defaultOptions;
                    self.selectedArea = '';
                    return;
                }
                axios.get(ctx + '/area/city/list', {
                    params: {
                        provinceCode: self.selectedProvince
                    }
                }).then(function(res) {
                    response = res.data;
                    if(response.success) {
                        self.cityList = defaultOptions;
                        self.cityList = self.cityList.concat(response.attach);
                    }else {
                        openDialog(self, {
                            dialogType: 'errorAlert',
                            dialogMessage: '请求城市列表接口失败:' + response.message,
                            dialogIcon: 'icon-error'
                        });
                    }
                });
            },
            changeCity: function() {
                var self = this,
                    response;

                if(!self.selectedCity) {
                    self.areaList = defaultOptions;
                    self.selectedArea = '';
                    return;
                }
                axios.get(ctx + '/area/district/list', {
                    params: {
                        cityCode: self.selectedCity
                    }
                }).then(function(res) {
                    response = res.data;
                    if(response.success) {
                        self.areaList = defaultOptions;
                        self.areaList = self.areaList.concat(response.attach);
                    }else {
                        openDialog(self, {
                            dialogType: 'errorAlert',
                            dialogMessage: '请求区县列表接口失败:' + response.message,
                            dialogIcon: 'icon-error'
                        });
                    }
                });
            },
            handleSelectAllChange: function(items) {
                var self = this,
	                key = self.storeCheckBoxConfig.propertyMap.key,
                    isExist;

                self.storeCheckBoxConfig.list = self.storeCheckBoxConfig.list.concat();
                if(items.length) {
                    self.storeList.forEach(function(item, idx) {
                        self.storeCheckBoxConfig.list[idx].checked = true;
                    });
	                if(!self.storeCheckedItems.length) {
		                self.storeCheckedItems = util.clone(self.storeCheckBoxConfig.list, true);
                    }else {
		                self.storeCheckBoxConfig.list.forEach(function (item) {
			                isExist = false;
			                self.storeCheckedItems.some(function (t, idx) {
				                if(t[key] === item[key]) {
					                isExist = true;
					                return true;
				                }
			                });
			                if(!isExist) {
			                	//如果不存在该门店则加入
				                self.storeCheckedItems.push(item);
                            }
		                });
                    }
                    return;
                }else {
                    self.storeCheckBoxConfig.list.forEach(function(item, idx) {
                        self.storeCheckBoxConfig.list[idx].checked = false;
                    });
                }
	            self.storeCheckBoxConfig.list.forEach(function (item) {
		            self.storeCheckedItems.some(function (t, idx) {
		            	if(t[key] === item[key]) {
		            		//如果存在则删除
				            self.storeCheckedItems.splice(idx, 1);
				            return true;
                        }
		            });
	            });
            },
            handleStoreChange: function(checkedStores, curId, isSelected) {
            	//处理全选复选框的选中逻辑
                this.selectAllBoxConfig.list = this.selectAllBoxConfig.list.concat();
                if(this.selectedStores.length !== this.storeCheckBoxConfig.list.length &&
                    this.allCheckedItems.length) {
                    this.$delete(this.selectAllBoxConfig.list[0], 'checked');
                }else if(this.selectedStores.length > 0 &&
                    this.selectedStores.length === this.storeCheckBoxConfig.list.length) {
                    this.$set(this.selectAllBoxConfig.list[0], 'checked', true);
                }else {
                    this.$delete(this.selectAllBoxConfig.list[0], 'checked');
                }
                //更新右侧被选中门店
                this.updateAlreadySelectedStores(curId, isSelected);
            },
            updateAlreadySelectedStores: function (curId, isSelected) {
            	var self = this,
                    key = self.storeCheckBoxConfig.propertyMap.key,
                    _list = self.storeCheckBoxConfig.list,
                    curSelectedStores = self.storeCheckedItems,
                    index,
                    isExist = false;

            	_list.some(function (item, idx) {
                    if(item[key].toString() === curId) {
	                    index = idx;
	                    return true;
                    }
	            });
            	if(!curSelectedStores.length && isSelected) {
		            curSelectedStores.push(_list[index]);
		            return;
                }
	            curSelectedStores.some(function (t, idx) {
		            if(t[key].toString() === curId) {
			            if(!isSelected) {
				            curSelectedStores.splice(idx, 1);
			            }else {
				            curSelectedStores.push(_list[index]);
			            }
			            isExist = true;
			            return true;
		            }
	            });
            	if(!isExist && isSelected) {
		            curSelectedStores.push(_list[index]);
                }
            },
            initSelectedStores: function () {
	            var self = this,
		            arr = self.storeCheckedItems,
                    list = self.storeCheckBoxConfig.list,
		            key = self.storeCheckBoxConfig.propertyMap.key;

	            if(arr.length) {
                    /*self.storeList = self.storeList.map(function(item) {
                        delete item.checked;
                        return item;
                    });*/
		            arr.forEach(function(item) {
			            list.some(function(t, idx) {
				            if(util.isObject(item)) {
					            if(t[key] === item[key]) {
						            list[idx].checked = true;
						            return true;
					            }
				            }else {
					            if(t[key] === item) {
						            list[idx].checked = true;
						            return true;
					            }
				            }
			            });
		            });
	            }
            },
            removeStore: function(idx) {
                var self = this,
                    key = self.storeCheckBoxConfig.propertyMap.key,
                    id = self.storeCheckedItems[idx][key],
                    isExist = false,
                    list = self.selectedStores;

	            list.some(function(item, index) {
                    if(item[key] === id) {
                    	list.splice(index, 1);
                    	self.updateAlreadySelectedStores(id, false);
	                    isExist = true;
                        /*self.selectAllBoxConfig.list = self.selectAllBoxConfig.list.concat();
                        self.$delete(self.selectAllBoxConfig.list[0], 'checked');*/
                        return true;
                    }
                });
	            if(!isExist) {
	            	self.storeCheckedItems.splice(idx, 1);
                }
            },
            cancelSelectStore: function() {
                var self = this;

                this.popConfig.isShow = false;
                this.storeCheckBoxConfig.list = util.clone(this.storeList, true);
	            self.storeCheckedItems = util.clone(prevCheckedStores, true);
                this.$nextTick(function() {
                    self.selectAllBoxConfig.list = self.selectAllBoxConfig.list.concat();
                    self.$set(self.selectAllBoxConfig.list[0], 'checked',
                        self.storeCheckedItems.length === self.storeCheckBoxConfig.list.length);
                });
            },
            saveSelectedStore: function() {
                this.$emit('input', this.storeCheckedItems);
                this.$emit('store-selected', this.storeCheckedItems);
	            prevCheckedStores = util.clone(this.storeCheckedItems, true);
                this.popConfig.isShow = false;
            }
        },
        watch: {
            storeList: function(newVal, oldVal) {
                var self = this,
                    count = 0,
                    flag;

                self.storeCheckBoxConfig.list = util.clone(newVal, true);
	            self.storeCheckBoxConfig.list.forEach(function (item) {
		            if(item.checked) {
		            	flag = true;
			            self.storeCheckedItems.push(item);
		            }
	            });
	            if(flag) {
		            prevCheckedStores = util.clone(self.storeCheckedItems, true);
                }else {
		            self.initSelectedStores();
                }
                self.storeCheckBoxConfig.list.forEach(function(item) {
                    if(item.checked) {
                        count++;
                    }
                });
                if(count > 0 && count === self.storeCheckBoxConfig.list.length) {
                    self.$set(self.selectAllBoxConfig.list[0], 'checked', true);
                }else {
                    self.$delete(self.selectAllBoxConfig.list[0], 'checked');
                }
            },
            propertyMap: function(newVal, oldVal) {
                this.storeCheckBoxConfig.propertyMap = newVal;
            },
            dialogTitle: function(newVal, old) {
                this.popConfig.title = newVal;
            }
        },
        created: function() {
            var self = this,
                data;

            axios.get(ctx + '/area/province/list').then(function(res) {
                data = res.data;
                if(data.success) {
                    self.provinceList = self.provinceList.concat(data.attach);
                }else {
                    openDialog(self, {
                        dialogType: 'errorAlert',
                        dialogMessage: '获取省份列表接口请求失败:' + data.message,
                        dialogIcon: 'icon-error'
                    });
                }
            });
            self.storeCheckBoxConfig.list = self.storeList;
            self.storeCheckBoxConfig.propertyMap = self.propertyMap;
            if(self.dialogTitle) {
                self.popConfig.title = self.dialogTitle;
            }
        },
        components: {
            'yunnex-cr-box': yunnexCRBox,
            'yunnex-select': yunnexSelect,
            'yunnex-pop': yunnexPop
        }
    };
</script>