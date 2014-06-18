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
                news.pubsub.emit('istats', ['view-changed', 'newsspec-nonuser', view]);
            });
        },

        listenForNavInteraction: function () {

            news.pubsub.on('intro:clicked', function () {
                news.pubsub.emit('istats', ['introduction-clicked', 'newsspec-interaction']);
            });

            news.pubsub.on('smallCarousel:navClicked', function (direction) {
                news.pubsub.emit('istats', ['small-carousel-nav-clicked', 'newsspec-interaction', direction + '-arrow']);
            });

            news.pubsub.on('carousel:navClicked', function (direction) {
                news.pubsub.emit('istats', ['large-carousel-nav-clicked', 'newsspec-interaction', direction + '-arrow']);
            });

            news.pubsub.on('smallCarousel:thumbClicked', function (panelNumber) {
                news.pubsub.emit('istats', ['small-carousel-thumbnail-clicked', 'newsspec-interaction', 'thumb-' + panelNumber]);
            });
        }

    };

    return new IStatsController();

});