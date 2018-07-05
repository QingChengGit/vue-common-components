 <template>
    <div class="page-demo-yunnex-hint page-padding">
        <div class="title-page">时间段选择器</div>

        <div class="subtitle">有边框</div>
        <div class="demo-block">
            <div class="yunnex-button-group yunnex-button-group-border">
                <button class="btn-sub">今天</button>
                <button class="btn-sub">近7天</button>
                <button class="btn-sub">近30天</button>
            </div>
        </div>
        
        <div class="subtitle">无边框</div>
        <div class="demo-block">
            <div class="yunnex-button-group">
                <button class="btn-sub">今天</button>
                <button class="btn-sub">近7天</button>
                <button class="btn-sub">近30天</button>
            </div>
        </div>

        <div class="subtitle">选中按钮</div>
        <div class="demo-block">
            <div class="yunnex-button-group yunnex-button-group-border">
                <button class="btn-sub btn-sub-current">今天</button>
                <button class="btn-sub">近7天</button>
                <button class="btn-sub">近30天</button>
            </div>
        </div>
        <div class="demo-block">
            <div class="yunnex-button-group">
                <button class="btn-sub">今天</button>
                <button class="btn-sub btn-sub-current">近7天</button>
                <button class="btn-sub">近30天</button>
            </div>
        </div>

        <div class="subtitle">多个按钮</div>
        <div class="demo-block">
            <div class="yunnex-button-group yunnex-button-group-border">
                <button class="btn-sub">周日</button>
                <button class="btn-sub">周一</button>
                <button class="btn-sub">周二</button>
                <button class="btn-sub btn-sub-current">周三</button>
                <button class="btn-sub">周四</button>
                <button class="btn-sub">周五</button>
                <button class="btn-sub">周六</button>
            </div>
        </div>
    </div>
   
</template>

<style lang="scss">
    @import "../../../../common/styles/yunnex-button-group";

    .page-demo-yunnex-hint {
        .demo-block {
            margin-bottom: 20px;
        }
    }
</style>

<script>

    var commCss = require('common/styles/common');

    module.exports = {
        data: function() {
            return {
                
            };
        },
        methods: {
            
        }
    };
</script>
