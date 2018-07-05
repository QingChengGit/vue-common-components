 <template>
    <div class="page-demo-yunnex-table page-padding">

        <!--普通表格 一行显示 -->

        <p class="title-page">普通表格高度为60</p>


        <table class="yunnex-table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        </table>

        <!--没有数据的时候 -->

        <p class="title-page">没有数据的时候</p>


        <table class="yunnex-table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="empty" colspan="4">暂未查询到数据</td>
                </tr>
            </tbody>
        </table>


        <!--普通表格 二行显示-->
        
        <p class="title-page">普通表格表体高度为80</p>

        <table class="yunnex-table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                    <th>3</th>
                    <th>4</th>
                    <th>3</th>
                    <th>4</th>
                </tr>
            </thead>
            <tbody class="common-yunnex-tbody">
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td>4</td>
                    <td>3</td>
                    <td>4</td>
                    <td>3</td>
                    <td>4</td>
                </tr>
            </tbody>
        </table>


         <!--普通表格表头两行 -->

        <p class="title-page">普通表格表头两行</p>

        <table class="yunnex-table">
            <thead class="yunnex-thead">
                <tr>
                    <th rowspan="2">门店名称</th>
                    <th rowspan="2">门店信息</th>
                    <th colspan="4" class="column-item">点评美团非餐饮</th>
                    <th colspan="2" class="column-item">点评餐饮</th>
                </tr>
                <tr>
                    <th>门店ID</th>
                    <th>团单ID</th>
                    <th>状态</th>
                    <th>操作</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>味千拉面</td>
                    <td>广州云移</td>
                    <td>味千拉面</td>
                    <td>广州云移</td>
                    <td>味千拉面</td>
                    <td>广州云移</td>
                    <td>味千拉面</td>
                    <td>广州云移</td>
                </tr>
            </tbody>
        </table>


        <!--出现滚动条-->
        
        <p class="title-page">普通表格宽度超出现横向滚动条</p>
        
        <div class="table-cover">
            <table class="yunnex-table">
                <thead>
                    <tr>
                        <th width="200px">1</th>
                        <th width="200px">2</th>
                        <th width="200px">3</th>
                        <th width="200px">4</th>
                        <th width="200px">3</th>
                        <th width="200px">4</th>
                        <th width="200px">3</th>
                        <th width="200px">4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                        <td>3</td>
                        <td>4</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <!--普通表格点击拉取详情-->

        <p class="title-page">点击拉取详情</p>

        <table class="yunnex-table">
            <thead>
                <tr>
                    <th>1</th>
                    <th>2</th>
                    <th>3</th>
                    <th>4</th>
                </tr>
            </thead>
            <tbody>
                    <template v-for="item in dataTable">
                        <tr @click="getDetail(item)">
                            <td>{{item.name}}</td>
                            <td>{{item.name}}</td>
                            <td>{{item.name}}</td>
                            <td>点我！！！！</td>
                        </tr>
                        <tr class="common-item-belong" v-show="item.isHide">
                            <td colspan="4">{{item.name}}</td>
                        </tr>
                    </template>
            </tbody>
        </table>


        <!--管理型表格-->

        <p class="title-page">管理型表格</p>

        <div class="table-cover">
            <div class="common-manage-list">这里的内容，开发者自定义哦！！！</div>
            <table class="yunnex-table">
                <thead>
                    <tr>
                        <th>1</th>
                        <th>2</th>
                        <th>3</th>
                        <th>4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </div> 
    </div>        

</template>

<style lang="scss">
    
    // 页面独有的样式
    .page-demo-yunnex-table {
        .table-cover {
            width: 100%;
            overflow-x: auto;
            margin-top: 30px;
            .common-manage-list {
                height: 48px;
                line-height: 48px;
                padding-left: 20px;
                border: 1px solid #d7d7d7;
                border-bottom: 0;
                margin-bottom: -30px;
            }
        }
        .yunnex-table {
            margin-top: 30px;
        }
    }
</style>

<script>
    /*
        common.scss必须通过此种方式引入，因为此文件内部引入了其他样式文件。如果不通过js引入会因为scss本身
        的文件路径解析方式与webpack的解析方式不同而导致打包错误，请各位注意!!
     */
    var commCss = require('common/styles/common.scss'),
        tableCss = require('common/styles/yunnex-table.scss');

    module.exports = {
        data: function() {
            return {
                dataTable: [{name: '前后分离第一步：公共组件开发',isHide: false}]
            };  
        },
        methods: {
            getDetail( item ) {

                item.isHide = !item.isHide;
            }
        },
        components: {
            
        }
    };
</script>
