module.exports = function (grunt) {
    grunt.config(['replace', 'prepStageDeploy'], {
        src: ['tmp/*/**.*'],
        overwrite: true,
        replacements: [{
            from: '<%= env.local.domain %>',
            to:   '<%= env.stage.domain %>'
        }, {
            from: '<%= env.local.domainStatic %>',
            to:   '<%= env.stage.domainStatic %>'
        }]
    });
    grunt.config(['copy', 'stageDeploy'], {
        files: [
            {expand: true, cwd: 'tmp', src: ['**'], dest: '<%= env.stage.mount %>/news/special/<%= pkg.year %>/newsspec_<%= pkg.project_number %>/content'}
        ]
    });
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('stage', ['add_environment_data', 'shell:checkMounts', 'stage_checklist', 'prepDeploy', 'replace:prepStageDeploy', 'copy:stageDeploy', 'clean:main']);
};