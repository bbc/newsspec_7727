define(['lib/news_special/bootstrap', 'Carousel', 'spec/fixtureData'],  function (news, Carousel, fixtureData) {

    news.$('body').append(fixtureData);

    describe('timeline appearance', function () {

        Carousel.getReady();

        it('should stay be in list format if the viewport is too small to accommodate carousel format', function () {
            news.pubsub.emit('view:updated', ['list']);
            iExpect(viewToBe('list'));
        });

        it('should be in carousel format if the viewport is wide enough', function () {
            news.pubsub.emit('view:updated', ['carousel']);
            iExpect(viewToBe('carousel'));
        });

        it('should start off with an introductory panel to begin with', function () {
            var mainCarouselHidden     = news.$('carousel_large_container--visible').length === 0,
                smallCarouselHidden    = news.$('carousel_small_container--visible').length === 0,
                allCarouselsToBeHidden = mainCarouselHidden && smallCarouselHidden;

            iExpect(allCarouselsToBeHidden);
        });

        it('when in carousel format, should only show one panel at a time', function () {
            news.$('.introduction').click();
            iExpect(allPanelsHiddenExcept(1));
        });
    });

    describe('carousel navigation', function () {

        it('should go forward a panel when clicking Next', function () {
            var nextButton = news.$('.carousel_nav_container--large .carousel_nav--next');
            
            nextButton.click();
            iExpect(allPanelsHiddenExcept(2));
            
            nextButton.click();
            iExpect(allPanelsHiddenExcept(3));
        });

        it('should go backward a panel when clicking Previous', function () {
            var prevButton = news.$('.carousel_nav_container--large .carousel_nav--next');
            
            prevButton.click();
            iExpect(allPanelsHiddenExcept(2));
            
            prevButton.click();
            iExpect(allPanelsHiddenExcept(1));
        });
    });

    describe('small thumbnail carousel', function () {

        it('should switch panels when thumbnail is clicked', function () {
            news.$('.carousel_small__item:nth-child(6)').click();
            iExpect(allPanelsHiddenExcept(6));
        });

        it('should automatically correct itself if the carousel is navigated through other means', function () {

        });
    });

    var iExpect = function (condition) {
        expect(condition).toBeTruthy();
    };

    var viewToBe = function (viewMode) {
        var actualViewMode = news.$('.main--carousel').length === 1 ? 'carousel' : 'list';
        return actualViewMode === viewMode;
    };

    var allPanelsHiddenExcept = function (panelNumber) {
        var panelsAreHidden = true;
        news.$('.carousel_large__item').each(function (i) {
            if (news.$(this).hasClass('.carousel_large__item--visible') && (panelNumber !== ++i)) {
                panelsAreHidden = false;
            }
        });
        return panelsAreHidden;
    };

});