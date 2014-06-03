define(['lib/news_special/bootstrap'], function (news) {

    var defineWindowResizeEvent = function () {

        // fire resize event a set time after the window has stopped resizing
        // Credit: http://stackoverflow.com/a/2854467
        var delay = (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })();

        news.$(window).on('resize', function () {
            delay(function () {
                fireResizeEvent();
            }, 100);
        });
    };

    var fireResizeEvent = function () {
        news.pubsub.emit('window:resize', [news.$(window).width()]);
    };

    defineWindowResizeEvent();

    return {
        trigger: fireResizeEvent
    };

});