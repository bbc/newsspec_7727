module.exports = function (grunt) {
	grunt.config(['clean', 'beforeTranslate'], {
        src:  ['content']
    });
    grunt.registerTask('translate', ['clean:beforeTranslate', 'default', 'sass:inline', 'uglify', 'images', 'multi_lang_site_generator:build_all_other_sites', 'clean:main', 'copy_source']);
};