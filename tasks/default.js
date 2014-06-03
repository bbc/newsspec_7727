module.exports = function (grunt) {
    grunt.config(['copy', 'cssFurniture'], {
        files: [{
            expand: true,
            cwd:    'source/scss/news_special/f/',
            src:    ['*.*'],
            dest:   'content/<%= pkg.services.default %>/css/f'
        }]
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('default', ['add_environment_data', 'css', 'js', 'uglify', 'multi_lang_site_generator:default', 'copy:cssFurniture', 'clean:main']);
};