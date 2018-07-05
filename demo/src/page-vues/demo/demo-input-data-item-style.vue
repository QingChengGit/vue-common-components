 <template>
    <div class="page-demo-input-data-item-style page-padding">
        <p class="title-page">左边说明文字右边输入数据结构公共样式示例</p>
        <div class="content-wrap">
            <div class="yunnex-input-data-item">
                <!-- 这是左侧文字 -->
                <span class="input-left-text">上架数量<span class="symbol-required"></span></span>
                <div class="input-right">
                    <!-- 这是右侧内容区，内容区的东西根据页面实际要求自己定义，公共样式不定义此区域的样式 -->
                    <input type="text" class="yunnex-large-input" />
                </div>
            </div>
            <div class="yunnex-input-data-item">
                <!-- 如果此项是必填的，只需在文字后面加上<span class="symbol-required"></span>即可显示红色* -->
                <span class="input-left-text">说明<span class="symbol-required"></span></span>
                <div class="input-right">
                    <textarea class="yunnex-textarea"></textarea>
                </div>
            </div>
            <div class="yunnex-input-data-item">
                <span class="input-left-text">
                    特权说明说明说明说明说明说明<span class="symbol-required"></span>
                </span>
                <div class="input-right">
                    <textarea class="yunnex-textarea"></textarea>
                </div>
            </div>
            <div class="yunnex-input-data-item">
                <span class="input-left-text">
                    用户信息
                </span>
                <div class="input-right">
                    <span class="customer-text">发生过今儿个客人</span>
                </div>
            </div>
            <div class="yunnex-input-data-item">
                <span class="input-left-text">
                    特权说明说明说明说明说明说明<span class="symbol-required"></span>
                    <p class="customer-text-desc">(我是辅助性说明文字)</p>
                </span>
                <div class="input-right">
                    <textarea class="yunnex-textarea"></textarea>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    @import "../../../../common/styles/variable";
    @import "../../../../common/styles/yunnex-input-data-item";
    .page-demo-input-data-item-style {
        //这些是本页面所独有的样式
        .content-wrap {
            padding-top: 20px;
        }
        .customer-text-desc {
            line-height: 1;
            margin-top: 10px;
            color: $color_999;
        }
        .customer-text {
            display: inline-block;
            margin-top: 10px;
            font-size: 13px;
        }
    }
</style>

<script>
    /*
        common.scss必须通过此种方式引入，因为此文件内部引入了其他样式文件。如果不通过js引入会因为scss本身
        的文件路径解析方式与webpack的解析方式不同而导致打包错误，请各位注意!!
     */
    var commCss = require('common/styles/common.scss');

    module.exports = {
        data: function() {
            return {
                
            };  
        },
        methods: {
            
        },
        components: {
            
        }
    };
</script>
