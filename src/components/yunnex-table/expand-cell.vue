/**
 * Created by liuxinxin on 2017/7/13.
 */
<script>
    module.exports = {
        functional: true,
        render: function(createElement, context) {
            var params = {
                data: context.props.data,
                rowData: context.props.row,
                index: context.props.index
            };
            return context.props.render(createElement, params);
        }
    };
</script>
