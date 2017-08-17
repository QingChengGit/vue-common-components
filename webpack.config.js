/**
 * Created by qingcheng on 2017/05/15.
 */
var path = require("path"),
    glob = require("glob"),
    //指定frontend工程目录路径
    root = path.resolve("../frontend"),
    commonDir = root + "/common",
    //指定要打包的子项目目录。比如如果需要对login子项目打包就把demo改成login
    dir = root + "/demo/src",
    fs = require("fs"),
    entries = {
        lib: ["vue", "vue-resource"]
    },
    webpack = require("webpack"),
    nodeModulesDir = path.resolve("node_modules"),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    HtmlWebpackPlugin = require("html-webpack-plugin"),
    SpritesmithPlugin = require("webpack-spritesmith"),
    CleanWebpackPlugin = require("clean-webpack-plugin"),
    CopyWebpackPlugin = require("copy-webpack-plugin"),
    PurifyCSSPlugin = require("purifycss-webpack"),
    //自动注入ctx的插件
    //CtxInjectPlugin = require('./ctx-inject'),
    libName = "lib",
    config,
    argv,
    commIconsDir = commonDir + "/images/icons/",
    jsFileNameTemplate = "[name].js",
    cssFileNameTemplate = "[name].css",
    imgFileNameTemplate = "[name].[ext]";

try {
    argv = JSON.parse(process.env.npm_config_argv).original;
    if (argv[1] === "production") {
        jsFileNameTemplate = "[chunkhash]-[name].js";
        cssFileNameTemplate = "[contenthash]-[name].css";
        imgFileNameTemplate = "[hash]-[name].[ext]";
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
            return ".icon-N { display: inline-block; width: Wpx; height: Hpx; background-image: url(I); background-position: Xpx Ypx; }"
                .replace("N", sprite.name)
                .replace("W", sprite.width)
                .replace("H", sprite.height)
                .replace("I", image)
                .replace("X", sprite.offset_x)
                .replace("Y", sprite.offset_y);
        })
        .join("\n");

    return perSprite;
}
config = {
    context: dir,
    entry: entries,
    output: {
        path: dir + "/dist",
        filename: "js/" + jsFileNameTemplate
        //filename: "js/[chunkhash]-[name].js"
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: "html-loader"
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader"
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: nodeModulesDir,
                loader: "babel-loader"
            },
            {
                test: /\.vue$/,
                exclude: nodeModulesDir,
                loader: "vue-loader",
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                loader: "yunnex-file-loader",
                options: {
                    name: imgFileNameTemplate,
                    useRelativePath: true,
                    publicPath: function (url) {
                        if (url.indexOf("../") > -1) {
                            url = "../images/" + url.substr(url.lastIndexOf("/") + 1);
                        }
                        return url;
                    },
                    outputPath: function (url) {
                        return "images/" + url.substr(url.lastIndexOf("/") + 1);
                    }
                }
            } /*,
             {test: /\.png$/, loaders: [
             'file-loader?name=i/[hash].[ext]'
             ]}*/
        ]
    },
    resolve: {
        modules: [nodeModulesDir, dir],
        extensions: [".js", ".vue"],
        alias: {
            vue: commonDir + "/js/lib/vue.min.js",
            "vue-resource": commonDir + "/js/lib/vue-resource.min",
            common: root + "/common"
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
        /*new ExtractTextPlugin("css/[contenthash]-[name].css"),*/
        new ExtractTextPlugin("css/" + cssFileNameTemplate),
        new SpritesmithPlugin({
            // 目标小图标
            src: {
                cwd: dir + "/images/icons/",
                glob: "*.png"
            },
            // 输出雪碧图文件及样式文件
            target: {
                image: dir + "/images/sprite.png",
                css: [
                    [
                        dir + "/styles/sprite.css",
                        {
                            format: "function_based_template"
                        }
                    ]
                ]
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: "../images/sprite.png"
            },
            customTemplates: {
                function_based_template: templateFunction
            }
        }),
        new CopyWebpackPlugin([{from: dir + "/json", to: dir + "/dist/json"}]),
        new webpack.optimize.CommonsChunkPlugin({
            name: [libName, "common"],
            minChunks: 2
        })
        //如果需要注入ctx，调用此插件即可
        //new CtxInjectPlugin()
    ]
};
//对common/icons目录下的图标生成对应的雪碧图
fs.readdirSync(commIconsDir).forEach(function (el, index) {
    config.plugins.push(
        new SpritesmithPlugin({
            src: {
                cwd: commIconsDir + el,
                glob: "*.png"
            },
            target: {
                image: commonDir + "/images/common-" + el + "-sprite.png",
                css: [
                    [
                        commonDir + "/styles/" + el + "-sprite.css",
                        {
                            format: "function_based_template"
                        }
                    ]
                ]
            },
            // 样式文件中调用雪碧图地址写法
            apiOptions: {
                cssImageRef: "../images/common-" + el + "-sprite.png"
            },
            customTemplates: {
                function_based_template: templateFunction
            }
        })
    );
});
//循环生成入口entries
fs.readdirSync(dir + "/js/").forEach(function (el, index, arr) {
    if (fs.statSync(dir + "/js/" + el).isFile()) {
        entries[el.split(".")[0]] = dir + "/js/" + el;
        config.plugins.push(
            new HtmlWebpackPlugin({
                chunks: [el.split(".")[0], "common", libName],
                template: dir + "/" + el.split(".")[0] + ".html",
                filename: el.split(".")[0] + ".html",
                xhtml: true,
                chunksSortMode: function (a, b) {
                    if (a.names[0] === "common") {
                        return -1;
                    }
                    if (b.names[0] === "common") {
                        return 1;
                    }
                    if (a.names[0] === libName) {
                        return -1;
                    } else if (b.names[0] === libName) {
                        return 1;
                    }
                    return 1;
                }
            })
        );
    }
});
/*config.plugins.push(new PurifyCSSPlugin({
 // Give paths to parse for rules. These should be absolute!
 paths: glob.sync(path.join(dir,  'dist/js/!*.js'))
 }));*/

module.exports = config;
