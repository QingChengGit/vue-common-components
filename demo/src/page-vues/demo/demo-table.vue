<template>
    <div class="page-level-grouping">
        <yunnex-table :table-titles="titles" :table-data="tableList"></yunnex-table>
    </div>
</template>

<style lang="less">
    .page-level-grouping {
        padding-left: 20px;
        margin-top: 20px;
        .yunnex-btn {
            width: 60px;
            border-width: 1px;
            -webkit-border-radius: 4px;
            -moz-border-radius: 4px;
            border-radius: 4px;
            font-size: 14px;
            color: #fff;
            background-color: #18a689;
            text-align: center;
            cursor: pointer;
        }
        .yunnex-table-component {
            width: 98%;
        }
    }
</style>

<script>
    var table = require('common/components/yunnex-table/index');


    module.exports = {
        data: function() {
            var self = this;
            return {
                /*
                    当表格单元格需要调用render来渲染最终输出内容时，请使用vue的render函数来创建输出内容。
                    render函数用法参考：https://cn.vuejs.org/v2/guide/render-function.html
                 */
                titles: [
                    {
                        name: 'appName',
                        text: function(h, params) {
                            return h('i', {
                                'class': 'fa fa-th-large'
                            }, '应用名称');
                        },
                        width: '14.286%'
                    },
                    {
                        name: 'appPackage',
                        text: '应用包名',
                        width: '14.286%'
                    },
                    {
                        name: 'appType',
                        text: '应用类型',
                        width: '14.286%'
                    },
                    {
                        name: 'author',
                        text: '所属开发者',
                        width: '14.286%'
                    },
                    {
                        name: 'crateTime',
                        text: '创建日期',
                        width: '14.286%'
                    },
                    {
                        name: 'slogan',
                        text: '应用标语',
                        width: '14.286%'
                    },
                    {
                        name: 'operate',
                        text: '操作',
                        width: '14.286%',
                        render: function(h, params) {
                            return h('div', {
                                'class': {
                                    'yunnex-btn': true
                                },
                                on: {
                                    click: function() {
                                        self.updateApp();
                                    }
                                }
                            }, '更新');
                        }
                    }
                ],
                tableList: [
                    {
                        appName: '外卖',
                        appPackage: 'yunnex.waimai',
                        appType: '掌贝官方应用',
                        author: '掌贝',
                        crateTime: '2016-03-15',
                        slogan: '掌贝外卖让天下没有难送的外卖'
                    },
                    {
                        appName: '智能小二',
                        appPackage: 'yunnex.intelligencewaiter',
                        appType: '掌贝官方应用',
                        author: '掌贝',
                        crateTime: '2016-06-12',
                        slogan: '掌贝智能小二让顾客光临变得更容易'
                    },
                    {
                        appName: '商户后台',
                        appPackage: 'yunnex.saofu',
                        appType: '掌贝官方应用',
                        author: '掌贝',
                        crateTime: '2015-05-12',
                        slogan: '掌贝顾客大数据和智能营销平台'
                    }
                ]
            };
        },
        components: {
            'yunnex-table': table
        },
        methods: {
            updateApp: function() {
                alert('执行updateApp方法了!');
            }
        }
    };
</script>