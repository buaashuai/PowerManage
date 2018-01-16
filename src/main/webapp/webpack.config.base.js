var webpack = require("webpack");
var path = require('path');
var ETP = require("extract-text-webpack-plugin");

module.exports = {

    context: path.resolve(__dirname + "/js"),

    entry: {
        'index': './index.js',
        'common': './common/common.js',
        'require_css': './common/require_css.js',
        'require_img': './common/require_img.js',
        'require_js': './common/require_js.js',
        'router': './common/router.js',
        'utils': './common/utils.js',
        'menuItem': './component/menu_item/menuItem.js',
        'config': './sys/config.js',
        'generator': './sys/generator.js',
        'menu': './sys/menu.js',
        'role': './sys/role.js',
        'schedule_log': './sys/schedule_log.js',
        'schedule': './sys/schedule.js',
        'user': './sys/user.js',


        'main': '../css/main.css'
    },

    output: {
        path: './dest',
        publicPath: './dest/',
        filename: "[name].js"
    },

    module: {
        loaders: [
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file?name=imgs/[sha512:hash:base64:6]_[name].[ext]'
            }, {
                test: /\.(woff|eot|ttf|otf|svg)$/i,
                loader: 'file?name=fonts/[hash:8]_[name].[ext]'
                // loader: 'url?limit=10000'
            }, {
                test: /\.css$/,
                loader: ETP.extract("style-loader", "css-loader")
            }, {
                test: /\.scss$/,
                loader: ETP.extract("style-loader", "css-loader!sass-loader")
            }, {
                test: /\.jade$/, loader: "jade"
            }, {
                test: /\.html$/, loader: "html-minify!ejs"
                // test: /\.html$/, loader: "ejs"
            }, {
                // 包含 <img> 标签的 html
                test: /\.shtml$/, loader: "underscore-template"
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },

    plugins: [
        new ETP("[name].css")
        // ,new webpack.optimize.UglifyJsPlugin({
        //   output: {comments: false},
        //   compress : {
        //     drop_console: true,
        //     warnings: false
        //   }
        // })
    ]

};
