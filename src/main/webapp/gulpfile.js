var isTest = false

var gulp = require('gulp');
var gutil = require("gulp-util");
var connect = require('gulp-connect');
var concat  = require('gulp-concat');
var zip = require('gulp-zip');
var modRewrite = require('connect-modrewrite');
var open = require('gulp-open');
var sftp = require('gulp-sftp');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var header = require('gulp-header');
var rename = require("gulp-rename");
var webpack = require('webpack');
var webpackConfigPc = require('./webpack.config.web.js');
var user = require('./user.info')
var now = gutil.date('yyyy-mm-dd HH:MM');
var nowtimestamp = +new Date;

gulp.task('server', function() {
  connect.server({
    port: 8888,
    host: '0.0.0.0',
    livereload: false,
      // 一个request请求到达server，会经过middleware数组里面的中间件函数逐个处理
    middleware: function(connect, opt) {
      return [
        modRewrite([
            // MATCHING_PATHS  REPLACE_WITH FLAGS
          '^/page/?(.*)$ /src/index.html [L]'
        ])
      ]
    }
  });
});

gulp.task('publish', ['publish-pc'])

gulp.task('publish-pc', ['addheader-pc'], function () {
  return gulp.src('./dest/**/*')
      .pipe(sftp({
          host: '127.0.0.1',
          user: user.name,
          pass: user.pass,
          remotePath: isTest
            ? '/data/wwwroot/static/pctest'
            : '/data/wwwroot/static/pc'
      }))
});

gulp.task('webpack-pc', ['clean-webpack-pc'], function () {
  return {'then': function (callback) {
    webpack(webpackConfigPc, function (err) {
      if (err) throw new gutil.PluginError("webpack pc", err);
      callback()
    })
  }}
})

gulp.task('clean-webpack-pc', function () {
  var stream = gulp.src([
    './dest/*'
  ]).pipe(clean())
  return multiStreamsTaskReturn([stream])
})

gulp.task('addheader-pc', ['webpack-pc'], function(){
  var addheader = gulp.src([
      './dest/*.js',
      './dest/*.css'
    ])
    .pipe(header('/* '+now+' */\n'))
    .pipe(gulp.dest('./dest'))
  return multiStreamsTaskReturn([addheader])
})

gulp.task('reload-html', function () {
  gulp.src([
    './dest/*.js',
    './dest/*.css',
    './src/*.html']).pipe(connect.reload())
})

gulp.task('watch', function () {
  gulp.watch([
    './dest/*.js',
    './dest/*.css',
    './src/*.html'], ['reload-html'])
});

gulp.task('default', ['server', 'watch'])

function multiStreamsTaskReturn(streamArr) {
  return {'then': function (callback) {
    var len = streamArr.length, counter = 0
    streamArr.forEach(function (stream, idx) {
      stream.on('finish', function () {
        counter++
        if (counter === len) callback()
      })
    })
  }}
}