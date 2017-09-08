<template>
    <div class="page-cr-box">
        <yunnex-cr-box :config="boxConfig" v-model="checkedItems" @checked-change="handleCheckedChange">
        </yunnex-cr-box>
        <div class="operate-btn-area">
            <div class="yunnex-btn" @click="setSingle">单选</div>
            <div class="yunnex-btn" @click="setMultiple">多选</div>
        </div>
    </div>
</template>

<style lang="less">
    .page-cr-box {
        padding: 20px 20px;
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
    var box = require('common/components/yunnex-cr-box/index');

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
     iconClass: {
         //设置选项图标,组件有默认样式
         type: String
     },
     iconActiveClass: {
         //设置选项被选中时的icon
         type: String
     },
     isSingle: {
         //设置是否单选
         type: Boolean
     }
     */
    module.exports = {
        data: function() {
            return {
                checkedItems: '',
                boxConfig: {
                    propertyMap: {
                        key: 'id',
                        val: 'text'
                    },
                    list: [
                        {id: '01', text: '冬瓜'},
                        {id: '02', text: '南瓜', checked: true},
                        {id: '03', text: '西瓜'},
                        {id: '04', text: '北瓜'}
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