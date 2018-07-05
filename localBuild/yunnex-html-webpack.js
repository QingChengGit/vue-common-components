/**
 * Created by qingcheng on 2017/10/24.
 */
var fs = require('fs'),
	path = require('path');
function MyPlugin(options) {
    // Configure your plugin with options...
    var _defaultOptions = {
        assetsPrefix: '',
        assetsBeforeAppend: '',
        isNeedCtx: false
    };
    this.options = Object.assign(_defaultOptions, options || {});
}
function createFolder(to) {
	var sep = path.sep
	var folders = path.dirname(to).split(sep);
	var p = '';
	while (folders.length) {
		p += folders.shift() + sep;
		if (!fs.existsSync(p)) {
			fs.mkdirSync(p);
		}
	}
};
MyPlugin.prototype.apply = function(compiler) {
    var self = this,
        jsRE = /\.js$/,
        cssRE = /\.css$/;

    compiler.plugin('compilation', function(compilation) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            var jsStr = '',
                cssStr = '',
                copyJsPaths,
                source,
                dest;

            if(self.options.assetsBeforeAppend) {
	            if(self.options.outputDir) {
	            	//去除注释代码
		            htmlPluginData.html = htmlPluginData.html.replace(/<!--.*-->(?:(\r\n)|(\n))?/g, '');
		            if(/((<script\s*[^<>]*><\/script>[\n\s]*)*)(\n|\s)*<\/body>/.test(htmlPluginData.html)) {
			            //需要拷贝用户在页面手动引入的第三方外链js
			            copyJsPaths = htmlPluginData.html.match(/\s+src="[^"']+"/g);
			            if(copyJsPaths) {
			            	copyJsPaths.forEach(function (item) {
					            source = '/' + item.replace(/\s+src="([^"']+)"/, '$1').replace(/\.\.\//g, '');
					            dest = self.options.outputDir + source;
					            if(!fs.existsSync(dest)) {
						            createFolder(path.resolve(dest));
					            }
					            fs.createReadStream(self.options.webpackContext + source).pipe(fs.createWriteStream(dest));
				            });
                        }
		            }
		            if(/((<link\s*[^<>]*><\/>[\n\s]*)*)(\n|\s)*<\/head>/.test(htmlPluginData.html)) {
			            //需要拷贝用户在页面手动引入的第三方外链css
			            copyJsPaths = htmlPluginData.html.match(/\s+href="[^"']+"/g);
			            if(copyJsPaths) {
				            copyJsPaths.forEach(function (item) {
				            	if(!/\.css/g.test(item)) {
				            		return true;
					            }
					            source = '/' + item.replace(/\s+href="([^"']+)"/, '$1').replace(/\.\.\//g, '');
					            dest = self.options.outputDir + source.replace('/styles/', '/css/');
					            if(!fs.existsSync(dest)) {
						            createFolder(path.resolve(dest));
					            }
					            fs.createReadStream(self.options.webpackContext + source).pipe(fs.createWriteStream(dest));
				            });
			            }
		            }
	            }
                if(!Array.isArray(self.options.assetsBeforeAppend)) {
                    self.options.assetsBeforeAppend = [self.options.assetsBeforeAppend];
                }
                self.options.assetsBeforeAppend.forEach(function(item) {
                    if(jsRE.test(item)) {
                        jsStr += '      <script type="text/javascript" src="' + item + '"></script>\n    ';
                    }
                    if(cssRE.test(item)) {
                        cssStr += '<link href="' + item + '" rel="stylesheet"/>\n  '
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
            htmlPluginData.html = htmlPluginData.html.replace('/styles/', '/css/');
            htmlPluginData.html = htmlPluginData.html.replace('</body>', '\n   </body>')
                .replace('</head>', '\n    </head>');

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