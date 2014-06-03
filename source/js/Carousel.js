/** 
* Displays list in a carousel format.
* @module Carousel
*/
define(['lib/news_special/bootstrap', 'Carousel_Small', 'ElementMeasurer', 'WindowResizeEvent', 'WorldService'], function (news, SmallCarousel, ElementMeasurer, WindowResizeEvent, WorldService) {

    /**
    * @constructor
    * @alias module:Carousel
    */
    var Carousel = function () {
        this.currentView = 'list';
    };

    Carousel.prototype = {

        getReady: function (config) {
            var defaults = {
                maxWidth: 976,
                minWidth: 900
            };
            this.settings = news.$.extend({}, defaults, config || {});
            this.setLocalVariables();
            this.defineClickEvents();
            this.subscribeToEvents();
            SmallCarousel.init(this.numberOfPanels);
        },

        setLocalVariables: function () {
            this.started = false;
            this.panelNumber = 1;
            this.numberOfPanels = news.$('.carousel_large__item').length;
        },

        defineClickEvents: function () {
            news.$('.introduction').on('click', function () {
                news.pubsub.emit('intro:clicked');
            });

            news.$('.carousel_nav_container--large .carousel_nav--prev').on('click', function () {
                news.pubsub.emit('carousel:navClicked', 'prev');
            });

            news.$('.carousel_nav_container--large .carousel_nav--next').on('click', function () {
                news.pubsub.emit('carousel:navClicked', 'next');
            });
        },

        subscribeToEvents: function () {
            var Carousel = this;

            news.pubsub.on('window:resize', function (viewportWidth) {
                var whatTheViewShouldBe;

                if (viewportWidth >= Carousel.settings.minWidth) {
                    whatTheViewShouldBe = 'carousel';
                } else {
                    whatTheViewShouldBe = 'list';
                }

                if (Carousel.currentView !== whatTheViewShouldBe) {
                    news.pubsub.emit('view:updated', [whatTheViewShouldBe]);
                }

                Carousel.resizeContainer(viewportWidth);
            });

            news.pubsub.on('intro:clicked', function () {
                Carousel.neverShowIntroductionAgain();
                Carousel.update();
                WindowResizeEvent.trigger(); // need to recalculate widths etc
            });

            news.pubsub.on('view:updated', function (view) {
                if (view === 'carousel') {
                    Carousel.triggerCarouselView();
                } else {
                    Carousel.triggerListView();
                }
                Carousel.currentView = view;
            });

            news.pubsub.on('carousel:navClicked', function (goTo) {
                if (goTo === 'prev') {
                    Carousel.panelNumber--;
                }
                else if (goTo === 'next') {
                    Carousel.panelNumber++;
                }

                if (Carousel.isValidPanelNumber()) {
                    Carousel.update();
                }
            });

            news.pubsub.on('smallCarousel:thumbClicked', function (panelNumber) {
                Carousel.panelNumber = panelNumber;

                if (Carousel.isValidPanelNumber()) {
                    Carousel.update();
                }
            });
        },

        triggerCarouselView: function () {
            news.$('.main').addClass('main--carousel');
            if (this.started) {
                this.update();
            } else {
                this.hideAllPanels(); // so that only the introduction is visible
            }
        },

        triggerListView: function () {
            this.resetCarouselCSS();
            news.$('.carousel_large__item').addClass('carousel_large__item--visible');
        },

        resetCarouselCSS: function () {
            news.$('.main').removeClass('main--carousel');
            news.$('.carousel_large_container--visible').css('height', 'auto');
            news.$('.carousel_large').css('width', 'auto').css('left', 'auto');
            news.$('.carousel_large__item').css('max-width', 'none');
        },

        neverShowIntroductionAgain: function () {
            news.$('.introduction').addClass('introduction--clicked');
            news.$('.carousel_large_container').addClass('carousel_large_container--visible');
            this.started = true;
        },

        update: function () {
            this.movePanels();
            this.showCurrentPanel();
            news.pubsub.emit('panel:changed', this.panelNumber);
        },

        hideAllPanels: function () {
            news.$('.carousel_large__item').removeClass('carousel_large__item--visible');
        },

        movePanels: function () {
            var shiftLeftNItems = this.panelNumber,
                offset;

            if (this.currentView === 'carousel') {
                if (WorldService.isRightToLeft()) {
                    // need to flip the offset.
                    // I have to admit, there was a bit of trial and error to get this working.
                    shiftLeftNItems = (this.numberOfPanels - this.panelNumber) + 2;
                }

                offset = ElementMeasurer.totalWidthOfFirstNItems('.carousel_large__item', shiftLeftNItems);
                news.$('.carousel_large').css('left', '-' + offset + 'px');
                this.showCurrentPanel();
            }
        },

        showCurrentPanel: function () {
            this.hideAllPanels();
            news.$('.carousel_large__item:nth-child(' + this.panelNumber + ')').addClass('carousel_large__item--visible');
        },

        isValidPanelNumber: function () {
            var valid = true,
                minPanelNumber = 1,
                maxPanelNumber = news.$('.carousel_large__item').length;

            if (this.panelNumber < minPanelNumber) {
                valid = false;
                this.panelNumber = minPanelNumber;
            }
            else if (this.panelNumber > maxPanelNumber) {
                valid = false;
                this.panelNumber = maxPanelNumber;
            }

            return valid;
        },

        resizeContainer: function (viewportWidth) {
            var Carousel = this;
            Carousel.setContainerWidth(viewportWidth);
            Carousel.movePanels();

            // height is adjusted when carousel_large__item max-width is changed, so only calculate this HERE!
            setTimeout(function () {
                Carousel.recalculateContainerHeight();
            }, 50);
        },

        setContainerWidth: function (viewportWidth) {
            var maxWidth = this.settings.maxWidth,
                width    = (viewportWidth > maxWidth) ? maxWidth : viewportWidth,
                containerWidth = width * (this.numberOfPanels + 1); // +1 to allow for padding etc

            news.$('.main--carousel .carousel_large__item').css('max-width', width + 'px');
            news.$('.main--carousel .carousel_large').css('width', containerWidth + 'px');
        },

        recalculateContainerHeight: function () {
            var height = ElementMeasurer.tallest('.carousel_large__item').height();
            news.$('.main--carousel .carousel_large_container--visible').css('height', height + 'px');
        }

    };

    return new Carousel();
});