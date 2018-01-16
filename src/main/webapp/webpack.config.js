var webpack = require("webpack");
var path = require('path');
var ETP = require("extract-text-webpack-plugin");

var BaseConfig = require('./webpack.config.base');
var platfrom = 'dev'
// var platfrom = 'pctest'
module.exports = {

  context: BaseConfig.context,

    resolve: {
        //PC
        extensions: ["", ".webpack.js", ".web.js", ".js"]
        //WAP
        //extensions: ["", ".webpack.js", ".js"]
    },

  entry : Object.assign({}, BaseConfig.entry, {
    // 'bootstrap' : './bootstrap.android.js',
    // 'bootstrap' : './bootstrap.ios.js',
    // 'bootstrap' : './bootstrap.checkin.js',
    // 'test' : './test/menuItem.js'
  }),

  output: Object.assign({}, BaseConfig.output, {
    path: './dest',
    publicPath : '/dest',
    pathinfo: true
  }),

  module: BaseConfig.module,

  plugins: [].concat(BaseConfig.plugins, [
    // new webpack.optimize.UglifyJsPlugin({
    //   output: {comments: false},
    //   compress : {
    //     drop_console: true,
    //     warnings: false
    //   }
    // })
  ])

};
