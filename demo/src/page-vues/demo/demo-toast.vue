 <template>
    <div class="page-demo-toast page-padding">
        <div class="title-page">toast弹框</div>
        <button @click="Handler1" class="yunnex-btn green-btn">Button1</button>
        <button @click="Handler2" class="yunnex-btn green-btn">Button2</button>
        <button @click="Handler3" class="yunnex-btn green-btn">Button3</button>
        <button @click="Handler4" class="yunnex-btn green-btn">Button4</button>
        <button @click="Handler5" class="yunnex-btn green-btn">回调</button>
    </div>
   
</template>

<style lang="scss">
    .page-demo-toast {
        .title-page {
            margin-bottom: 20px;
        }
    }
</style>

<script>
    /*
        common.scss必须通过此种方式引入，因为此文件内部引入了其他样式文件。如果不通过js引入会因为scss本身
        的文件路径解析方式与webpack的解析方式不同而导致打包错误，请各位注意!!
     */
    var commCss = require('common/styles/common'),
        fnToast = require('common/components/yunnex-toast/index');

    module.exports = {
        data: function() {
            return {
                
            };  
        },
        methods: {
            Handler1: function () {
                // 完整配置
                fnToast({
                    status: 'success',    //提示状态四种: 'warn','error','success','wait'
                    message: 'HELLO WORLD',    //提示文字
                    duration: 3000    //提示时长，单位毫秒
                });
            },
            Handler2: function () {
                // 可仅传字符串，默认状态图标为"warn"，显示时长为2000毫秒
                fnToast("警告！");
            },
            Handler3: function () {
                fnToast({
                    status: 'error',
                    message: '系统错误'
                });
            },
            Handler4: function () {
                fnToast({
                    status: 'wait',
                    message: '系统繁忙'
                });
            },
            Handler5: function () {
                fnToast({
                    status: 'wait',
                    message: '关闭后console',
                    closeHandler: function () {
                        console.log(123);
                    }
                });
            }
        }
    };
</script>
