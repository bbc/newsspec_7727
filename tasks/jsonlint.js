module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-jsonlint');
    grunt.config(['jsonlint'], {
        default: {
            src: ['source/vocabs/*.json']
        }
    });
};