define(['lib/news_special/bootstrap'], function (news) {

    var ElementMeasurer = function () {

    };

    ElementMeasurer.prototype = {

        tallest: function (selector) {
            var tallestElementSoFar = null,
                currentElement;

            news.$(selector).each(function () {
                
                currentElement = news.$(this);

                if (tallestElementSoFar === null) {
                    tallestElementSoFar = currentElement;
                }
                else if (currentElement.height() > tallestElementSoFar.height()) {
                    tallestElementSoFar = currentElement;
                }
            });

            return tallestElementSoFar;
        },

        totalWidthOfFirstNItems: function (selector, n) {
            var width = 0,
                elements = news.$(selector);

            for (var i = 0; ((i + 1) !== n); i++) {
                width = width + elements.eq(i).outerWidth();
            }

            return width;
        }

    };

    return new ElementMeasurer();

});