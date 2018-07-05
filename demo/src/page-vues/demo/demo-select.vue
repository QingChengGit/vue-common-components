<template>
    <div class="page-demo-select page-padding">
        <div class="title-page">下拉框组件</div>
        <yunnex-select :source-data="selectData" :select-title="selectTitle" v-model="selectValue"
                       @select-change="handleSelectChange">
        </yunnex-select>
        <p class="explain-text">带搜索功能的下拉框:</p>
        <yunnex-select :source-data="selectData" :is-show-search="true" :select-title="selectTitle"
                       :search-placeholder="'请输入搜索关键词'" v-model="searchSelectValue"></yunnex-select>
        <p class="explain-text">自定义外观宽度的下拉框:</p>
        <yunnex-select :source-data="selectData" :is-show-search="true" :select-title="selectTitle"
                       :search-placeholder="'请输入搜索关键词'" :appearance-width="150"
                       v-model="searchSelectValue"></yunnex-select>
        <p class="explain-text">禁用的下拉框:</p>
        <yunnex-select :source-data="selectData" :select-title="selectTitle" :disabled="true"></yunnex-select>
    </div>
</template>

<style lang="less">
    .page-demo-select {
        .title-page {
            margin-bottom: 20px;
        }
        .explain-text {
            color: #676a6c;
            margin: 20px 0;
        }
    }
</style>

<script>
    var commCss = require('common/styles/common'),
        select = require('common/components/yunnex-select/index'),
        datas = [
            {id: '01', text: 'vue'},
            {id: '02', text: 'react', selected: true},
            {id: '03', text: 'angular'},
            {id: '04', text: 'java'},
            {id: '05', text: 'nodejs'},
            {id: '06', text: 'koa'}
        ];

    /*
         select组件props选项可以有如下值
         selectTitle: {
             //设置select组件的数据对应的键名
             type: Object,
             required: true
         },
         sourceData: {
             //设置select组件的源数据。要设置某一项数据默认选中直接给该项数据设置selected: true属性即可
             type: Array,
             required: true
         },
         isShowSearch: {
             //设置是否显示搜索框
             type: Boolean,
             default: false
         },
         searchPlaceholder: {
            //搜索的placeholder文本
            type: String
         },
         disabled: {
             //设置是否禁用下拉框
             type: Boolean,
             default: false
         }
     */
    module.exports = {
        data: function() {
            return {
                selectData: [],
                selectTitle: {
                    name: 'id',
                    text: 'text'
                },
                selectValue: '',
                searchSelectValue: '',
            };
        },
        methods: {
            handleSelectChange: function(data) {
                console.log(data);
                console.log(this.selectValue);
            }
        },
        created: function() {
            var self = this;

            setTimeout(function() {
                self.selectData = datas;
            }, 2000);
        },
        components: {
            'yunnex-select': select
        }
    };
</script>