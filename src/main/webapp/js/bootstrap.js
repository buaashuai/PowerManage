window.PM.DEBUG = true;

/**
 * 第1项是部署时候的资源路径，第2项是开发时候的资源路径
 * @type {*[]}
 */
var jsMap = [
    ['dest/router.js', 'js/common/router.js'], //页面路由
    ['dest/common.js', 'js/common/common.js'], //公共js
    ['dest/menuItem.js', 'js/component/menu_item/menuItem.js'], //添加当前页面依赖的组件
    ['dest/utils.js', 'js/common/utils.js'], //工具库
    ['dest/index.js', 'js/sys/index.js'], //页面的业务逻辑
    // ['dest/index1.js', 'js/sys/index1.js'],
];
var jsArr = [];
_.each(jsMap, function (pair) {
    if (window.PM.DEBUG) {
        jsArr.push(pair[1]);
    } else {
        jsArr.push(pair[0]);
    }
})

window.PM.requireJS(jsArr);