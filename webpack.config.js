/**
 * Created by qingcheng on 2017/05/15.
 */
var path = require('path'),
    glob = require('glob'),
    //指定frontend工程目录路径
    root = path.resolve('../frontend'),
    commonDir = root + '/common',
    //指定要打包的子项目目录。比如如果需要对login子项目打包就把demo改成login
    dir = root + '/advertise-web-admin/src',
    fs = require('fs'),
    entries = {},
    webpack = require('webpack'),
    nodeModulesDir = path.resolve('node_modules'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    SpritesmithPlugin = require('webpack-spritesmith'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    //自动注入ctx的插件
    CtxInjectPlugin = require('./ctx-inject'),
    libName = 'lib',
    entryDirPrefix = dir + '/js/',
    config,
    argv,
    prevModuleName = '',
    chunkArr = [],
    commIconsDir = commonDir + '/images/icons/',
    jsFileNameTemplate = '[name].min.js',
    cssFileNameTemplate = '[name].css',
    imgFileNameTemplate = '[name].[ext]';

try {
    argv = JSON.parse(process.env.npm_config_argv).original;
    if (argv[1] === 'production') {
        jsFileNameTemplate = '[chunkhash]-[name].js';
        cssFileNameTemplate = '[contenthash]-[name].css';
        imgFileNameTemplate = '[hash]-[name].[ext]';
    }
} catch (ex) {
    argv = process.argv;
}

function templateFunction(data) {
    //生成雪碧图模板
    var image,
        perSprite;

    if (!data.sprites.length) {
        return '';
    }
    image = data.sprites[0].image;

    perSprite = data.sprites
        .map(function (sprite) {
            return '.icon-N { display: inline-block; width: Wpx; height: Hpx; background-image: url(I); background-position: Xpx Ypx; }'
                .replace('N', sprite.name)
                .replace('W', sprite.width)
                .replace('H', sprite.height)
                .replace('I', image)
                .replace('X', sprite.offset_x)
                .replace('Y', sprite.offset_y);
        })
        .join('\n');

    return perSprite;
}
config = {
    context: dir,
    entry: entries,
    output: {
        path: dir + '/dist',
        filename: jsFileNameTemplate
        //filename: 'js/[chunkhash]-[name].js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader'
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: nodeModulesDir,
                loader: 'babel-loader'
            },
            {
                test: /\.vue$/,
                exclude: nodeModulesDir,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: 'yunnex-file-loader',
                options: {
                    name: imgFileNameTemplate,
                    useRelativePath: true,
                    publicPath: function (url) {
                        /*
                            正则表达式为取url的文件名以及文件所在目录，比如url为：'../images/mall/sprite.png'，处
                            理之后未mall/sprite.png。
                        */
                        return '../../images/' + url.replace(/.*?([^\/]+\/[^\/]+)$/, '$1');;
                    },
                    outputPath: function (url) {
                        return 'images/' + url.replace(/.*?([^\/]+\/[^\/]+)$/, '$1');
                    }
                }
            }
        ]
    },
    resolve: {
        modules: [nodeModulesDir, dir],
        extensions: ['.js', '.vue'],
        alias: {
            vue: commonDir + '/js/lib/vue.min.js',
            jsonp: commonDir + '/js/lib/jsonp.js',
            axios: commonDir + '/js/lib/axios.min.js',
            common: root + '/common'
        }
    },
    resolveLoader: {
        modules: [__dirname, nodeModulesDir]
    },
    plugins: [
        new CleanWebpackPlugin(['dist/*'], {
            root: dir,
            verbose: true,
            dry: false
        }),
        //提取css文件
        new ExtractTextPlugin({
            filename: function (getPath) {
                return getPath(cssFileNameTemplate).replace('js', 'css');
            }
        }),
        //new CopyWebpackPlugin([{from: dir + '/json', to: dir + '/dist/json'}]),
        //如果需要注入ctx，调用此插件即可
        //new CtxInjectPlugin()
    ],
    externals: {
        jquery: 'window.$'
    }
};
//对common/icons目录下的图标生成对应的雪碧图
fs.readdirSync(commIconsDir).forEach(function (el, index) {
    config.plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: commIconsDir + el,
                glob: '*.png'
            },
            target: {
                image: commonDir + '/images/common/' + el + '-sprite.png',
                css: [
                    [
                        commonDir + '/styles/' + el + '-sprite.css',
                        {
                            format: 'function_based_template'
                        }
                    ]
                ]
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: '../images/common/' + el + '-sprite.png'
            },
            customTemplates: {
                function_based_template: templateFunction
            }
        })
    );
});
//循环生成入口entries和自动输出html
function generateEntryAndHTMLPlugin (tarDir, moduleName) {
    var reg = /.*?([^\/]+)$/g,
        _prefix;

    moduleName = moduleName || '';
    _prefix = moduleName ? 'js/' + moduleName + '/' : 'js/';
    fs.readdirSync(tarDir).forEach(function (el, index, arr) {
        if (fs.statSync(tarDir + el).isFile()) {
            chunkArr.push('js/' + prevModuleName + el.split('.')[0]);
            entries[_prefix + el.split('.')[0]] = tarDir + el;
            config.plugins.push(
                new HtmlWebpackPlugin({
                    chunks: [_prefix + el.split('.')[0], _prefix + 'common', _prefix + libName],
                    template: dir + '/html/' + moduleName + '/' + el.split('.')[0] + '.html',
                    filename: 'html/' + moduleName + '/' + el.split('.')[0] + '.html',
                    xhtml: true,
                    chunksSortMode: function (a, b) {
                        if (b.names[0].replace(reg, '$1') === 'common') {
                            return 1;
                        }
                        if(a.names[0].replace(reg, '$1') !== 'common' && b.names[0].replace(reg, '$1') === libName) {
                            return 1;
                        }
                        return -1;
                    }
                })
            );
        }else if(el !== 'lib'){
            entries['js/' + el + '/lib'] = ['vue', 'axios'];
            if(prevModuleName) {
                config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
                    name: ['js/' + prevModuleName + libName, 'js/' + prevModuleName + 'common'],
                    chunks: chunkArr.concat(),
                    minChunks: 2
                }));
            }
            prevModuleName = el + '/';
            chunkArr = ['js/' + el + '/lib'];
            generateEntryAndHTMLPlugin(entryDirPrefix + el + '/', el);
        }
    });
    //处理最后一个目录的公共chunk的提取
    config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
        name: ['js/' + prevModuleName + libName, 'js/' + prevModuleName + 'common'],
        chunks: chunkArr.concat(),
        minChunks: 2
    }));
}
function generateSpriteForModule() {
    fs.readdirSync(dir + '/images/icons/').forEach(function (el, index, arr) {
        if (fs.statSync(dir + '/images/icons/' + el).isDirectory()) {
            //为不同的模块生成对应的雪碧图
            config.plugins.push(new SpritesmithPlugin({
                // 目标小图标
                src: {
                    cwd: dir + '/images/icons/' + el,
                    glob: '*.png'
                },
                // 输出雪碧图文件及样式文件
                target: {
                    image: dir + '/images/' + el + '/sprite.png',
                    css: [
                        [
                            dir + '/styles/' + el + '/sprite.css',
                            {
                                format: 'function_based_template'
                            }
                        ]
                    ]
                },
                // 样式文件中调用雪碧图地址写法
                apiOptions: {
                    cssImageRef: '../../images/' + el + '/sprite.png'
                },
                customTemplates: {
                    function_based_template: templateFunction
                }
            }));
        }
    });
}
generateSpriteForModule();
generateEntryAndHTMLPlugin(entryDirPrefix);

module.exports = config;
