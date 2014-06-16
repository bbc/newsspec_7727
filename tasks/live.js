module.exports = function (grunt) {
    grunt.config(['copy', 'liveDeploy'], {
        files: [
            {expand: true, cwd: 'tmp', src: ['**'], dest: '<%= env.live.mount %>/news/special/<%= config.year %>/newsspec_<%= config.project_number %>/content'}
        ]
    });
    grunt.config(['replace', 'prepLiveDeploy'], {
        src: ['tmp/*/**.*', 'tmp/*/half_wide/**.*'],
        overwrite: true,
        replacements: [{
            from: '<%= env.local.domain %>',
            to:   '<%= env.live.domain %>'
        }, {
            from: '<%= env.local.domainStatic %>',
            to:   '<%= env.live.domainStatic %>'
        }]
    });
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('live', ['stage_checklist', 'checkStage', 'prepDeploy', 'replace:prepLiveDeploy', 'copy:liveDeploy', 'clean:main']);
};
