 <template>
    <div class="page-demo-progress page-padding">
        <div class="title-page">进度条组件</div>
        <yunnex-progress :progress-data="progressArr"></yunnex-progress>
    </div>
</template>

<style lang="less">
    .page-demo-progress {
        .title-page {
            margin-bottom: 20px;
        }
    }
</style>

<script>
    var yunnexProgress = require('common/components/progress/index'),
        commCss = require('common/styles/common');

    module.exports = {
        data: function() {
            return {
                progressArr: [
                    {
                        name: '提交设计',
                        desc: '说明文字说明文字',
                        status: 'complete'
                    },
                    {
                        name: '绑定下单',
                        desc: '绑定下单的说明文字说明文字说明文字2017-09-24 10:20',
                        status: 'dealing'
                    },
                    {
                        name: '待审核',
                        desc: '待审核的说明文字说明文字说明文字2017-09-24 10:20',
                        //如果status为非complete、dealing状态或者不设置此属性则把此节点当做未来待处理的步骤
                        status: ''
                    },
                    {
                        name: '完成',
                        desc: '说明文字说明文字'
                    }
                ]
            };  
        },
        methods: {
            
        },
        components: {
            'yunnex-progress': yunnexProgress
        }
    };
</script>
