define(['lib/news_special/bootstrap'], function (news) {

    var IStatsController = function () {
        this.init();
    };

    IStatsController.prototype = {

        init: function () {
            this.listenForViewChange();
            this.listenForNavInteraction();
        },

        listenForViewChange: function () {
            news.pubsub.on('view:updated', function (view) {
                news.pubsub.emit('istats', ['View changed', view]);
            });
        },

        listenForNavInteraction: function () {

            news.pubsub.on('intro:clicked', function () {
                news.pubsub.emit('istats', ['Introduction clicked']);
            });

            news.pubsub.on('smallCarousel:navClicked', function (direction) {
                news.pubsub.emit('istats', ['Small carousel ' + direction + ' button clicked']);
            });

            news.pubsub.on('carousel:navClicked', function (direction) {
                news.pubsub.emit('istats', ['Large carousel ' + direction + ' button clicked']);
            });

            news.pubsub.on('smallCarousel:thumbClicked', function (panelNumber) {
                news.pubsub.emit('istats', ['Small carousel thumbnail ' + panelNumber + ' clicked']);
            });
        }

    };

    return new IStatsController();

});