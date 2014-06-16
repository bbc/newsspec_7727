module.exports = function (grunt) {
	grunt.config('jasmine', {
        allTests: {
            src: 'source/js/newsspec_<%= config.project_number %>/*.js',
            options: {
                keepRunner: false,
                specs: 'source/js/spec/*Spec.js',
                template: require('grunt-template-jasmine-requirejs'),
                templateOptions: {
                    requireConfig: {
                        baseUrl: '<%= requirejs.build.options.baseUrl %>',
                        paths: '<%= requirejs.build.options.paths %>'
                    }
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jasmine');
};