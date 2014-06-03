define(['lib/news_special/bootstrap', 'bump-3'], function (news, bump) {

    var VideoLoader = function () {
        this.emp             = {};
        this.videoContainer  = 'carousel_large__item-media__playlist';
        this.videoLoadedFlag = 'carousel_large__item-media__playlist--videoLoaded';
    };

    VideoLoader.prototype = {

        getReady: function () {
            this.defineEvents();
            this.subscribeToEvents();
        },

        defineEvents: function () {
            var VideoLoader = this;
            news.$('.carousel_large__item').on('click', '.' + VideoLoader.videoContainer, function (e) {
                e.preventDefault();
                var carouselLargeItem = news.$(this).parent().parent();
                news.pubsub.emit('videos:load', [carouselLargeItem]);
                return false;
            });
        },

        subscribeToEvents: function () {

            var VideoLoader = this;

            news.pubsub.on('videos:load', function (carouselLargeItem) {
                VideoLoader.removeVideos();
                VideoLoader.loadVideo(carouselLargeItem);
            });

            news.pubsub.on('view:updated',   function () { VideoLoader.removeVideos(); });
            news.pubsub.on('panel:changed', function () { VideoLoader.removeVideos(); });
        },

        loadVideo: function (carouselLargeItem) {

            var video        = carouselLargeItem.find('.' + this.videoContainer),
                playlist     = video.attr('data-playlist'),
                poster       = video.attr('data-holding-image'),
                uniqueKey    = 'ns-player--' + new Date().getTime();

            video.append('<div id="' + uniqueKey + '" class="ns_media_content"></div>');
            this.emp = {
                elm: news.$('#' + uniqueKey),
                player: bump('#' + uniqueKey).player({
                    product : 'news',
                    playerProfile: playlist,
                    responsive: true,
                    autoplay: true,
                    overrideHoldingImage: poster
                })
            };

            video.addClass(this.videoLoadedFlag);
            this.emp.player.load(playlist);
        },

        removeVideos: function () {
            news.$('.' + this.videoLoadedFlag).removeClass(this.videoLoadedFlag);
            news.$('.ns_media_content').remove();
        }

    };

    return new VideoLoader();

});