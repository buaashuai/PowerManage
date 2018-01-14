(function () {

var isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}

var doc = document
// fn1 - 全部加载完成后调用
// fn2 - 每完成一个加载调用一次, 参数是剩余数量
// fn3 - 出错时调用
var require = function (urls, fn1, fn2, fn3) {

  var url = urls.shift(),
    node = doc.createElement("img");

  node.onload = _onload
  node.onerror = _onerror
  node.src = url;

  function _onerror () {
    isFunction(fn3) && fn3(urls.length);
    _finished(this)
  }
  function _onload () {
    _finished(this)
  }
  function _finished (img) {
    // console.log('img loaded: ', img.src, img)
    node.onload = node.onerror = null
    node = null

    isFunction(fn2) && fn2(urls.length);

    if (urls.length) {
      require(urls, fn1, fn2, fn3);
    } else {
      // console.log('img load finish!');
      isFunction(fn1) && fn1(urls.length);
    }
  }

};

module.exports = require

})();