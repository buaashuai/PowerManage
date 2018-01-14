(function () {

var isFunction = function (obj) {
  return Object.prototype.toString.call(obj) === "[object Function]";
}

var doc = document,
  head = doc.head || doc.getElementsByTagName("head")[0];

var require = function (urls, callback) {

  var url = urls.shift(),
    node = doc.createElement("link");

  node.rel = 'stylesheet';
  node.type = 'text/css';
  node.charset = 'utf-8';
  node.href = url;

  head.appendChild(node);
  console.log('sytle loaded: ', node.href)

  if (urls.length) {
    require(urls, callback);
  } else {
      console.log('style load finish!');
    isFunction(callback) && callback();
  }
};

module.exports = require

})();