<template>
    <div class="select-more page-padding">
        <div class="title-page">下拉框多选组件</div>
        <div class="clearfix top-city">
            <div class="fl-left">
                <span>请选择城市：</span>
            </div>
            <div class="fl-left">
                <yunnex-select-more v-model="selectMoreCityData" :options="selectData" :select-more-config="selectMoreCityConfig" :label="selectLabel" v-on:input="selectedCityMore"></yunnex-select-more>
            </div>
        </div>
        <div class="clearfix top-city">
            <div class="fl-left">
                <span>选中的数据为：</span>
            </div>
            <div class="fl-left">
                {{ selectMoreCityData }}
            </div>
        </div>
    </div>
</template>

<script>
import yunnexSelectMore from 'common/components/yunnex-select-more/index';
export default {
    data () {
        return {
            selectMoreCityConfig: {  
                keyName: 'name', //  必传  展示的字段名 一般为：'name'、'text'
                trackByName: 'id', //  必传  数据的唯一标识。 一般为：'id'
                placeholder: '请选择城市',   // 非必传  没有选中数据时，默认显示的提示。
            },
            selectData: [],  // 必传  下拉框的数据。
            selectMoreCityData: [], //  必传  选中的数据。格式为：[{name: '一', id: 1}, {name: '二, id: 2}]
            selectLabel: 'aa'  //  必传  当有多个组件时，传入不同的值 作为标识。
        }
    },
    components: {
        yunnexSelectMore
    },
    mounted () {
        const _this = this;
        setTimeout(function () {
            _this.selectData = [
                {
                    name: '周一',
                    id: 1
                },{
                    name: '周二',
                    id: 2
                },{
                    name: '周三',
                    id: 3
                }
                ,{
                    name: '周四',
                    id: 4
                }
                ,{
                    name: '周五',
                    id: 5
                }
            ];
            _this.selectMoreCityData = [
                {
                    name: '周三',
                    id: 3
                },{
                    name: '周五',
                    id: 5
                }
            ]
        }, 1500)
    },
    methods: {
        selectedCityMore (data) {
            console.log(data);
        }
    }
}
</script>

<style scoped lang="scss">
.fl-left {
    float: left;
}
.fl-right { 
    float: right;
}
.clearfix {
    &::after {
        content: '';
        display: block;
        clear: both;
        visibility: hidden;
        height: 0;
    }
}
.select-more {
    .title-page {
        margin-bottom: 20px;
    }
}
.top-city {
    margin-bottom: 30px;
}
</style>
