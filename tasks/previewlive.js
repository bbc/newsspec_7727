module.exports = function (grunt) {
    grunt.config(['replace', 'prepPreviewLiveDeploy'], {
        src: ['tmp/*/**.*', 'tmp/*/half_wide/**.*'],
        overwrite: true,
        replacements: [{
            from: '<%= env.local.domain %>',
            to:   '<%= env.previewlive.domain %>'
        }, {
            from: '<%= env.local.domainStatic %>',
            to:   '<%= env.previewlive.domainStatic %>'
        }]
    });
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('previewlive', ['project_checklist', 'checkStage', 'prepDeploy', 'replace:prepLiveDeploy', 'copy:liveDeploy', 'clean:main']);
};