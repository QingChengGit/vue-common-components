/**
 * Created by qingcheng on 2017/05/15.
 */
function CtxInject(options) {
    // Configure your plugin with options...
}

CtxInject.prototype.apply = function(compiler) {
    var arr,
        html;

    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            html = htmlPluginData.html;
            htmlPluginData.html = '<#include  "/macro/common.ftl" />\n' + html.replace(/(<\/title>)/, '$1<script>var ctx = "${ctx}";</script>');
            arr = htmlPluginData.assets.js;
            arr.forEach(function(item, index, arr) {
                arr[index] = '${ctx}/dist/' + item.replace(/\.\.\//g, '');
                console.log(arr[index]);
                //后面正式分离后，可能需要删除
                arr[index] = arr[index].replace(/build/g, 'dist');
            });
            arr = htmlPluginData.assets.css;

            arr.forEach(function(item, index, arr) {
                arr[index] = '${ctx}/dist/' + item.replace(/\.\.\//g, '');
                arr[index] = arr[index].replace(/build/g, 'dist');
            });
            callback(null, htmlPluginData);
        });
    });
};

module.exports = CtxInject;
