 <template>
    <div class="page-demo-yunnex-hint page-padding">
        <div class="title-page">警告框</div>

        <div class="subtitle">默认</div>
        <div class="yunnex-hint-wrap hint-normal">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">单行文字</p>
            </div>
        </div>

        <div class="subtitle">提醒</div>
        <div class="yunnex-hint-wrap hint-warn">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">单行文字</p>
            </div>
        </div>

        <div class="subtitle">警告</div>
        <div class="yunnex-hint-wrap hint-error">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">单行文字</p>
            </div>
        </div>

        <div class="subtitle">带关闭按钮</div>
        <div class="yunnex-hint-wrap hint-warn">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">单行文字</p>
            </div>
            <i class="hint-close"></i>
        </div>

        <div class="subtitle">多行文字</div>
        <div class="yunnex-hint-wrap hint-normal">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">
                    一个p标签多行文字<br />
                    一个p标签多行文字<br />
                    一个p标签多行文字<br />
                    一个p标签多行文字<br />
                </p>
            </div>
        </div>

        <div class="subtitle">多行文字</div>
        <div class="yunnex-hint-wrap hint-normal">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">多个p标签多行文字</p>
                <p class="hint-text">多个p标签多行文字</p>
                <p class="hint-text">多个p标签多行文字</p>
                <p class="hint-text">多个p标签多行文字</p>
            </div>
        </div>

        <div class="subtitle">带链接</div>
        <div class="yunnex-hint-wrap hint-normal">
            <i class="hint-status"></i>
            <div class="hint-text-wrap">
                <p class="hint-text">
                    提示提示提示提示提示提示提示，
                    <a href="www.baidu.com" class="hint-link">请联系您的服务商进行咨询</a>
                </p>
            </div>
        </div>
    </div>
   
</template>

<style lang="scss">
    // @import "../../../../common/styles/yunnex-hint";
</style>

<script>
    /*
        common.scss必须通过此种方式引入，因为此文件内部引入了其他样式文件。如果不通过js引入会因为scss本身
        的文件路径解析方式与webpack的解析方式不同而导致打包错误，请各位注意!!
     */
    var commCss = require('common/styles/common.scss'),
        hintCss = require('common/styles/yunnex-hint.scss');

    module.exports = {
        data: function() {
            return {
                
            };  
        },
        methods: {
            
        }
    };
</script>
