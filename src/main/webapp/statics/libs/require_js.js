(function () {

    var isFunction = function (obj) {
        return Object.prototype.toString.call(obj) === "[object Function]";
    }

    var doc = document,
        head = doc.head || doc.getElementsByTagName("head")[0],
        baseElement = head.getElementsByTagName("base")[0];

    var require = function (urls, callback, errorCallback) {

        if (urls.length === 0) {
            return isFunction(callback) && callback();
        }

        var url = urls.shift(),
            node = doc.createElement("script");

        node.charset = 'utf-8';

        if ("onload" in node) {
            // node.onload = node.onerror = onload;
            node.onload = onload;
            node.onerror = errorCallback
        } else {
            node.onreadystatechange = function () {
                if (/loaded|complete/.test(node.readyState)) {
                    onload();
                }
            }
        }

        function onload() {
            console.log('script loaded: ', node.src);
            // Ensure only run once and handle memory leak in IE
            node.onload = node.onerror = node.onreadystatechange = null;
            // Remove the script to reduce memory leak
            // head.removeChild(node);
            // Dereference the node
            node = null;

            if (urls.length) {
                require(urls, callback);
            } else {
                console.log('scripts load finish!');
                isFunction(callback) && callback();
            }
        }

        node.async = "async";
        node.src = url;

        // ref: #185 & http://dev.jquery.com/ticket/2709
        baseElement ?
            head.insertBefore(node, baseElement) :
            head.appendChild(node);
    };

    window.RM.requireJS = require;// window.RM 在webapp/js/index.js中注册的

})();