 <template>
    <div class="page-components-list page-padding">
        <div class="title-page">组件列表</div>
        <a :href="item.link" class="green-link" v-for="item in componentsList">{{item.name}}</a>
    </div>
</template>

<style lang="scss">
    .page-components-list {
        .green-link {
            display: block;
            margin: 10px 0;
            font-size: 13px;
            color: #1ab394;
            cursor: pointer;
        }
    }
</style>

<script>
    var commCss = require('common/styles/common.scss');

    module.exports = {
        data: function() {
            return {
                componentsList: [
                    {name: '单、复选框组件', link: './demo-cr-box.htm'},
                    {name: '日期选择组件', link: './demo-date-picker.htm'},
                    {name: '系统弹框组件', link: './demo-dialog.htm'},
                    {name: '文件上传组件', link: './demo-file-upload.htm'},
                    {name: '表单校验插件', link: './demo-form-validate.htm'},
                    {name: '左右结构的输入项样式', link: './demo-input-data-item-style.htm'},
                    {name: '内容自定义的弹框组件', link: './demo-pop.htm'},
                    {name: '下拉框组件', link: './demo-select.htm'},
                    {name: '开关组件', link: './demo-switch.htm'},
                    {name: '浮层组件', link: './demo-tip.htm'},
                    {name: 'toast弹框组件', link: './demo-toast.htm'},
                    {name: '时间段选择样式', link: './demo-yunnex-button-group.htm'},
                    {name: '面包屑组件', link: './demo-yunnex-crumbs.htm'},
                    {name: '提示条样式', link: './demo-yunnex-hint.htm'},
                    {name: '选项卡组件', link: './demo-yunnex-tab.htm'},
                    {name: 'table样式', link: './demo-yunnex-table-style.htm'},
                    {name: '表格切换选项卡组件', link: './demo-yunnex-table-tab.htm'}
                ]
            };  
        },
        methods: {
            
        },
        components: {
            
        }
    };
</script>
