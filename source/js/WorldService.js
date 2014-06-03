define(['lib/news_special/bootstrap'], function (news) {

    return {

        checkLanguageDirection: function () {
            var body = news.$('body');
            body.addClass(body.css('direction'));
        },

        isRightToLeft: function () {
            return (news.$('body.rtl').length > 0);
        }
        
    };

});