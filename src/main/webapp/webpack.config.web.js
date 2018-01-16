var webpack = require("webpack");
var path = require('path');
var ETP = require("extract-text-webpack-plugin");

var BaseConfig = require('./webpack.config.base');

module.exports = {

  context: BaseConfig.context,

  resolve: {
    extensions: ["", ".webpack.js", ".web.js", ".js"]
  },

  entry : Object.assign({}, BaseConfig.entry, {
  }),

  output: Object.assign({}, BaseConfig.output, {
    path: './dest',
    publicPath : 'http://127.0.0.1/powerManage/'
  }),

  module: BaseConfig.module,

  plugins: [].concat(BaseConfig.plugins, [
    new webpack.optimize.UglifyJsPlugin({
      output: {comments: false},
      compress : {
        drop_console: true,
        warnings: false
      }
    })
  ])

};
