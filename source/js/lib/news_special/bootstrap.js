define([
    'jquery-1.9',
    'lib/news_special/iframemanager__frame',
    'lib/news_special/imager',
    'istats',
    'pubsub'
], function ($, iframemanager__frame, Imager, istats) {

    // responsive iframe
    iframemanager__frame.init();

    // responsive images
    var imager = new Imager({
        availableWidths: [320, 440, 540, 620],
        regex: /(\/news\/.*img\/)\d+(\/.*)$/i
    });
    $.on('resize_images', function () {
        imager.resize_images();
    });
    $.on('init_images', function () {
        imager.change_divs_to_imgs();
    });

    // istats
    istats.init();
    $.on('istats', function (actionType, actionName, newLabels) {
        istats.log(actionType, actionName, newLabels);
    });

    return {
        $: $,
        pubsub: $,
        setIframeHeight: iframemanager__frame.setHeight,
        hostPageSetup: iframemanager__frame.setHostPageInitialization
    };

});