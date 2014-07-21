if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(obj, start) {
        for (var i = (start || 0), j = this.length; i < j; i++) {
            if (this[i] === obj) { return i; }
        }
        return -1;
    }
}

if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (fn, scope) {
        'use strict';
        var i, len;
        for (i = 0, len = this.length; i < len; ++i) {
            if (i in this) {
                fn.call(scope, this[i], i, this);
            }
        }
    };
}

if (!document.addEventListener) {
    window.addEventListener = function (eventName, functionToCall) {
        window.attachEvent('on' + eventName, functionToCall);
    };
    window.removeEventListener = function (eventName, functionToCall) {
        window.detachEvent('on' + eventName, functionToCall);
    };
}