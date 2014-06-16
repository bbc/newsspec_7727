module.exports = function (grunt) {

    grunt.registerTask('copy_language_specific_items_from_source', function () {
        
        var config = grunt.file.readJSON('config.json');
            services = config.services.others;

        services.forEach(function (service) {

            var html = grunt.file.read('content/' + service + '/index.html'),
                matches = html.match(/div class="masthead__logo masthead__logo--([a-z]+)/),
                match;

            if (matches !== null) {
                match = matches[1];

                grunt.file.copy('source/scss/news_special/f/bbc-' + match + '.png', 'content/' + service + '/css/f/bbc-' + match + '.png');

                grunt.log.writeln('Copied ' + match + '.png into content/' + service + '/css/f/');
            }
        });

    });

    grunt.registerTask('translate', ['clean:beforeTranslate', 'default', 'images', 'multi_lang_site_generator:build_all_other_sites', 'clean:inlineCss', 'copy_source', 'copy_language_specific_items_from_source']);
};