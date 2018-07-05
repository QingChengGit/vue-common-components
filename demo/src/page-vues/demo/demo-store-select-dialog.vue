<template>
    <div class="page-demo-store-select-dialog page-padding">
        <div class="title-page">选择门店组件</div>
        <div class="yunnex-btn green-btn" @click="selectShop">选择门店</div>
        <store-select-dialog :store-list="storeList" :property-map="storePropertyMap" @query="queryStoreList"
                             ref="storeDialog" v-model="shops" @store-selected="storeSelectedHandle">
        </store-select-dialog>
    </div>
</template>

<style lang="scss">
    .page-demo-store-select-dialog {
        .title-page {
            margin-bottom: 20px;
        }
    }
</style>

<script>
    var axios = require('libs/axios'),
        yunnexDialog = require('common/components/dialog/index'),
        storeSelectDialog = require('common/components/store-select-dialog/index'),
        util = require('common/js/util'),
        ctx = '/user-web-admin',
        commCss = require('common/styles/common.scss');

    /*
     store-select-dialog组件接受两个必传参数：
     store-list [Array]，门店列表数据
     property-map [Object],门店列表中门店对象的id和门店名称对应的字段名称。
     {key: '门店id对应的字段名称', val: '门店名称对应的字段名称'}

     query事件为点击门店选择弹框内的查询按钮会触发此事件,此事件接收一个对象参数：
     {
     province: '门店选择框内查询条件的省份的code',
     city: '门店选择框内查询条件的城市的code',
     area: '门店选择框内查询条件的地区的code',
     storeName: '门店名称查询条件的值'
     }
     */
    function openDialog(context, config) {
        context.dialogConf = util.clone(config);
        context.dialogConf.isShow = true;
    }
    module.exports = {
        data: function() {
            return {
                storeList: [
                    {branchId: 1, branchName: '门店1'},
                    {branchId: 2, branchName: '门店2'}
                ],
                storePropertyMap: {
                    key: 'branchId',
                    val: 'branchName'
                },
                shops: null,
                dialogConf: {
                    dialogType: '',
                    dialogMessage: '',
                    dialogIcon: '',
                    okBtnText: '',
                    isShow: false
                }
            };
        },
        methods: {
            selectShop: function() {
                if(!this.storeList.length) {
                    this.queryStoreList();
                }
                this.$refs.storeDialog.show();
            },
            queryStoreList: function(params) {
                var self = this,
                    data;

                params = params || {};
                axios.post(ctx + '/customer/config/queryAlipayBranchs', {
                    area: params.area,
                    province: params.province,
                    city: params.city,
                    branchName: params.storeName
                }).then(function(res) {
                    data = res.data;
                    if(data.success) {
                        self.storeList = data.attach;
                        /*if(previousShops && previousShops.length) {
                         previousShops.forEach(function(item) {
                         self.storeList.some(function(t, idx) {
                         if(t.branchId == item) {
                         //回显数据
                         self.storeList[idx].checked = true;
                         return true;
                         }
                         });
                         });
                         }*/
                    }else {
                        openDialog(self, {
                            dialogType: 'errorAlert',
                            dialogMessage: '查询门店列表接口失败:' + data.message,
                            dialogIcon: 'icon-error'
                        });
                    }
                });
            },
            storeSelectedHandle: function(stores) {
                console.log('你选择了门店并且点击了门店选择弹框的确定按钮啦!');
                console.log(this.shops);
            }
        },
        created: function() {
            var self = this;

            setTimeout(function() {
                /*
                 可以通过修改门店选择组件的v-model绑定的变量(此处变量为shops)的值来实现门店的选中效果，有两种方式：
                 1、设置self.shops = [要选中门店的id, 要选中门店的id]
                 当shops数组中的项为object时，只需要保证对象中的门店id在门店列表中即可选中该门店，所以此处也可以设
                 置self.shops = [{branchId: 2}]也可选中id为2的门店。注：选中门店的id的值必须和门店列表的id完全相等。
                 2、设置self.shops = [{branchId: 2, branchName: '门店2'}]
                 */
                self.shops = [2];
            }, 500);
        },
        components: {
            'yunnex-dialog': yunnexDialog,
            'store-select-dialog': storeSelectDialog
        }
    };
</script>
