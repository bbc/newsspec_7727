define(['lib/news_special/bootstrap', 'VideoLoader', 'Carousel', 'WindowResizeEvent', 'WorldService', 'iStatsController'], function (news, VideoLoader, Carousel, WindowResizeEvent, WorldService) {

    news.pubsub.on('carousel:loaded', function () {
        // don't want transition effects until the carousel has loaded
        // otherwise we get sickly spinning effects in right-to-left as it
        // whizzes along a couple of thousand pixels!
        news.$('.main--carousel .carousel_large').css('transition', 'left 0.7s');
        news.$('.main--carousel .carousel_small').css('transition', 'left 1s');
        WindowResizeEvent.trigger(); // required to fix small nav in rtl languages on ipad
    });

    return {
        init: function () {
            WorldService.checkLanguageDirection();
            Carousel.getReady({
                maxWidth: 976,
                minWidth: 900
            });
            VideoLoader.getReady();
            WindowResizeEvent.trigger();
        }
    };

});