module.exports = function (grunt) {
    grunt.config(['clean', 'main'], {
        src:  ['content/<%= pkg.services.default %>/js/news_special', 'content/<%= pkg.services.default %>/css/inline.css', 'tmp']
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.registerTask('html', ['add_environment_data', 'sass:inline', 'uglify', 'multi_lang_site_generator:default', 'clean:main']);
};