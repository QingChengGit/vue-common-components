<template>
    <div class="page-demo-cr-box page-padding">
        <div class="title-page">单、复选框组件</div>
        <yunnex-cr-box :config="boxConfig" v-model="checkedItems" @checked-change="handleCheckedChange">
        </yunnex-cr-box>
        <div class="operate-btn-area">
            <div class="yunnex-btn" @click="setSingle">单选</div>
            <div class="yunnex-btn" @click="setMultiple">多选</div>
        </div>
    </div>
</template>

<style lang="less">
    .page-demo-cr-box {
        .title-page {
            margin-bottom: 20px;
        }
        .operate-btn-area {
            width: 240px;
            margin-top: 20px;
        }
        .yunnex-btn {
            display: inline-block;
        }
    }
</style>

<script>
    var commCss = require('common/styles/common'),
        box = require('common/components/yunnex-cr-box/index');

    /*
     yunnex-cr-box组件(即自定义的checkbox/radio组件)props选项可以有如下值
     propertyMap: {
     //设置组件的数据对应的键名
         type: Object,
         required: true
     },
     //组件的数据列表
     list: {
         //要设置某一项数据默认选中直接给该项数据设置checked: true属性即可
         type: Array,
         required: true
     },
     // =======设置单选、复选框icon样式，除非有特殊icon的复选框否则不用设置这些样式======= //
     iconDefaultClass: {
         //设置默认选项图标,组件有默认样式
         type: String
     },
     iconActiveClass: {
         //设置选项被选中时的icon,组件有默认样式
         type: String
     },
     iconDefaultDisabledClass: {
         //设置选项被禁用的icon,组件有默认样式
         type: String
     }
     iconActiveDisabledClass: {
         /设置选项被禁用并被选中的icon,组件有默认样式
         type: String
     },
     //设置单选、复选框的选择项的排列方式，默认排列成一行，isBlock为true的话为多行显示
     isBlock: true,
     // =======设置单选、复选框icon样式，除非有特殊icon的复选框否则不用设置这些样式======= //
     isSingle: {
         //设置是否单选
         type: Boolean
     }
     */
    module.exports = {
        data: function() {
            return {
                checkedItems: null,
                boxConfig: {
                    propertyMap: {
                        key: 'id',
                        val: 'text'
                    },
                    list: [
                        {id: '01', text: '冬瓜'},
                        {id: '02', text: '南瓜', checked: true},
                        {id: '03', text: '西瓜'},
                        {id: '04', text: '北瓜', disabled: true}
                    ],
                    isSingle: true
                }
            };
        },
        methods: {
            handleCheckedChange: function(data) {
                console.log(data);
                console.log(this.checkedItems);
            },
            setSingle: function() {
                this.boxConfig.isSingle = true;
            },
            setMultiple: function() {
                this.boxConfig.isSingle = false;
            }
        },
        components: {
            'yunnex-cr-box': box
        }
    };
</script>