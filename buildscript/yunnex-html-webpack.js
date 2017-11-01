/**
 * Created by qingcheng on 2017/10/24.
 */
function MyPlugin(options) {
    // Configure your plugin with options...
    var _defaultOptions = {
        assetsPrefix: '',
        assetsBeforeAppend: '',
        isNeedCtx: false
    };
    this.options = Object.assign(_defaultOptions, options || {});
}

MyPlugin.prototype.apply = function(compiler) {
    var self = this,
        jsRE = /\.js$/,
        cssRE = /\.css$/;

    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            var jsStr = '',
                cssStr = '';

            if(self.options.assetsBeforeAppend) {
                if(!Array.isArray(self.options.assetsBeforeAppend)) {
                    self.options.assetsBeforeAppend = [self.options.assetsBeforeAppend];
                }
                self.options.assetsBeforeAppend.forEach(function(item) {
                    if(jsRE.test(item)) {
                        jsStr += '<script type="text/javascript" src="' + item + '"></script>\n';
                    }
                    if(cssRE.test(item)) {
                        cssStr += '<link href="' + item + '" rel="stylesheet"/>\n'
                    }
                });
                htmlPluginData.html = htmlPluginData.html.replace(/((<script\s*[^<>]*><\/script>[\n\s]*)*)(\n|\s)*<\/body>/, '\n' + jsStr + '$1</body>')
                    .replace('</head>', cssStr + '</head>');
            }
            callback(null, htmlPluginData);
        });
        compilation.plugin('html-webpack-plugin-after-html-processing', function(htmlPluginData, callback) {
            if(self.options.assetsPrefix) {
                htmlPluginData.html = htmlPluginData.html.replace(/(?:([.]{2}\/)+)(js|css|images)/g, '/' + self.options.assetsPrefix + '/$2');
            }
            if(self.options.isNeedCtx) {
                htmlPluginData = addCtx(htmlPluginData);
            }
            //让页面引入的css、js每个链接一行
            htmlPluginData.html = htmlPluginData.html.replace(/(<rel="stylesheet"\/>)?=<link \s+/g, '$1\n').replace(/(<\/script>)?=<script \s+/g, '$1\n');
            htmlPluginData.html = htmlPluginData.html.replace('</body>', '\n</body>')
                .replace('</head>', '\n</head>');

            callback(null, htmlPluginData);
        });
    });
};

function addCtx(htmlPluginData) {
    var arr,
        html;

    html = htmlPluginData.html;
    htmlPluginData.html = '<#include  "/macro/common.ftl" />\n' + html.replace(/(<\/title>)/, '$1\n<script>var ctx = "${ctx}";</script>');
    htmlPluginData.html = htmlPluginData.html.replace(/(\.\.\/)+/g, '${ctx}/dist/');

    return htmlPluginData;
}
module.exports = MyPlugin;