module.exports = function (grunt) {
    grunt.config(['copy', 'jsAll'], {
        files: [{
            expand: true,
            cwd:    'source/js/',
            src:    ['**'],
            dest:   'content/<%= pkg.services.default %>/js/'
        }]
    });
    grunt.config(['clean', 'allJs'], {
        src: ['content/<%= pkg.services.default %>/js']
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.config(['concurrent', 'js'], {
        tasks: ['jshint', 'jasmine', 'requirejs:jquery1']
    });
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.registerTask('js', ['clean:allJs', 'concurrent:js', 'copy:jsAll']);
};