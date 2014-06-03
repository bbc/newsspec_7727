/** 
* Defines the mini carousel nav at the top of the large carousel.
* @module Carousel_Small
*/
define(['lib/news_special/bootstrap', 'WorldService'], function (news, WorldService) {

    /**
    * @constructor
    * @alias module:Carousel_Small
    */
    var SmallCarousel = function () {
        this.leftmostItem  = 1;
        this.numberOfLinks = 0;
        this.navItemWidth  = 0;
    };

    SmallCarousel.prototype = {

        init: function (numberOfLinks) {
            this.numberOfLinks = numberOfLinks;
            this.mapSmallCarouselToLargeCarousel();
            this.defineClickEvents();
            this.waitUntilIntroClicked();
        },

        mapSmallCarouselToLargeCarousel: function () {
            news.$('.carousel_small__item-link').each(function (i) {
                news.$(this).attr('data-panel', (i + 1)); // don't want zero based indexing
            });
        },

        defineClickEvents: function () {
            var SmallCarousel = this;

            news.$('.carousel_nav_container--small .carousel_nav--prev').on('click', function () {
                news.pubsub.emit('smallCarousel:navClicked', 'left');
            });

            news.$('.carousel_nav_container--small .carousel_nav--next').on('click', function () {
                news.pubsub.emit('smallCarousel:navClicked', 'right');
            });

            news.$('.carousel_small__item-link').on('click', function (e) {
                var panelNumber = parseInt(news.$(this).attr('data-panel'), 10);

                news.pubsub.emit('smallCarousel:thumbClicked', panelNumber);

                e.preventDefault();
                return false;
            });
        },

        waitUntilIntroClicked: function () {
            var SmallCarousel = this;

            news.pubsub.on('intro:clicked', function () {
                SmallCarousel.becomeVisible();
                SmallCarousel.navItemWidth = news.$('.carousel_small__item').first().outerWidth();
                SmallCarousel.subscribeToEvents();
                SmallCarousel.highlightSelectedPanel(SmallCarousel.leftmostItem);
                SmallCarousel.move('left');// ensure we start at the right place
                news.pubsub.emit('carousel:loaded');
            });
        },

        subscribeToEvents: function () {
            var SmallCarousel = this;

            news.pubsub.on('panel:changed', function (panelNumber) {
                SmallCarousel.highlightSelectedPanel(panelNumber);
                SmallCarousel.moveIfNecessary(panelNumber);
            });

            news.pubsub.on('smallCarousel:navClicked', function (direction) {
                if (WorldService.isRightToLeft()) {
                    direction = direction === 'left' ? 'right' : 'left';
                }
                SmallCarousel.move(direction);
            });

            news.pubsub.on('window:resize', function (viewportWidth) {
                SmallCarousel.resizeContainer(viewportWidth);
            });
        },

        becomeVisible: function () {
            news.$('.carousel_small_container').addClass('carousel_small_container--visible');
        },

        highlightSelectedPanel: function (panelNumber) {
            var activeClass = 'carousel_small__item--active';
            news.$('.carousel_small__item').removeClass(activeClass);
            news.$('.carousel_small__item-link[data-panel=' + panelNumber + ']').parent().addClass(activeClass);
        },

        moveIfNecessary: function (panelNumber) {
            if (panelNumber < this.leftmostItem) {
                this.move('left');
            }
            else if (panelNumber > this.rightmostItem()) {
                this.move('right');
            }
        },

        move: function (direction) {
            var rightmostItem = this.rightmostItem();

            if (direction === 'right' && rightmostItem < this.numberOfLinks) {
                this.leftmostItem = rightmostItem + 1;
            }
            else if (direction === 'left') {
                this.leftmostItem = 1;
            }

            this.doTheMove();
        },

        rightmostItem: function () {
            var navWidth = news.$('.carousel_small_container--visible').width(),
                numberOfItemsThatFit = Math.floor(navWidth / this.navItemWidth),
                rightmostItem = this.leftmostItem + numberOfItemsThatFit - 1;

            if (rightmostItem >= this.numberOfLinks) {
                rightmostItem = this.numberOfLinks;
            }

            return rightmostItem;
        },

        doTheMove: function () {
            var offset = this.navItemWidth * (this.leftmostItem - 1);

            if (WorldService.isRightToLeft()) {
                offset = this.navItemWidth * (this.numberOfLinks - this.rightmostItem());
            }

            news.$('.carousel_small').css('left', '-' + offset + 'px');
        },

        resizeContainer: function (viewportWidth) {
            var containerWidth = this.navItemWidth * this.numberOfLinks;
            news.$('.main--carousel .carousel_small').css('width', containerWidth + 'px');
        }
    };

    return new SmallCarousel();
});