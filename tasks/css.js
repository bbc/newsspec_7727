module.exports = function (grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.config('uglify', {
        options: {
            mangle: true
        },
        my_target: {
            files: {
                'content/<%= pkg.services.default %>/js/lib/news_special/iframemanager__host.js': ['source/js/lib/news_special/iframemanager__host.js']
            }
        }
    });
    grunt.config(['clean', 'sasscache'], {
        src:  ['./.sass-cache']
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('css', ['clean:sasscache', 'sass:main', 'sass:inline', 'csslint']);
};