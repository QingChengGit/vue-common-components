<template>
    <div class="yunnex-table-component">
        <table class="yunnex-table">
            <thead class="yunnex-table-thead">
            <tr>
                <th v-for="(title, i) in tableTitles" :style="{'width': title.width}">
                    <div class="yunnex-th-wrap" v-if="typeof title.text === 'function'">
                        <expand-cell :render="title.text" :index="i"></expand-cell>
                    </div>
                    <div class="yunnex-th-wrap" v-else>
                        {{title.text}}
                    </div>
                </th>
            </tr>
            </thead>
            <tbody>
            <tr class="yunnex-table-tr" v-for="(item, index) in tableData" :key="item[forKey]">
                <td v-for="(t, idx) in tableTitles">
                    <div class="yunnex-cell-wrap" v-if="t.render">
                        <expand-cell :render="t.render" :data="item[t.name]" :row="item"
                        :index="index"></expand-cell>
                    </div>
                    <div class="yunnex-cell-wrap" v-else>
                        {{item[t.name]}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <pagination :page-size="pageSize" :current-page="currentPage" :data-count="dataCount"
                      @jump-to-page="jumpToPage" v-if="isShowPagination"></pagination>
    </div>
</template>

<style lang="less">
    .yunnex-table-component {
        .yunnex-table {
            width: 100%;
            table-layout: fixed;
            border: 0;
            border-collapse: collapse;
        }
        .yunnex-table-thead {
            color: #333;
            background: #f2f2f2;
            th {
                padding: 8px;
                font-size: 14px;
            }
        }
        .yunnex-table-tr {
            border-bottom: 1px solid #e7eaec;
            background-color: #fff;
        }
        td {
            padding: 8px;
            font-size: 14px;
            color: #676a6c;
        }
    }
</style>

<script>
    var expand = require('./expand-cell')/*,
        pagination = require('./pagination')*/;

    module.exports = {
        data: function() {
            return {};
        },
        props: {
            tableTitles: {
                type: Object,
                required: true
            },
            tableData: {
                type: Array,
                required: true
            },
            forKey: {
                type: String
            }
            /*,
            isShowPagination: {
                type: Boolean,
                default: false
            },
            pageSize: {
                type: Number,
                required: this.isShowPagination
            },
            currentPage: {
                type: Number,
                default: 1
            },
            dataCount: {
                type: Number
            },
            jumpToPage: {
                type: Function,
                required: this.isShowPagination
            }*/
        },
        components: {
            //在当前组件注册pagination组件
            //pagination: pagination,
            'expand-cell': expand
        }
    }
</script>