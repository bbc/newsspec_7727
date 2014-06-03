module.exports = function (grunt) {
    grunt.config(['replace', 'prepPreviewStageDeploy'], {
        src: ['tmp/*/**.*'],
        overwrite: true,
        replacements: [{
            from: '<%= env.local.domain %>',
            to:   '<%= env.previewstage.domain %>'
        }, {
            from: '<%= env.local.domainStatic %>',
            to:   '<%= env.previewstage.domainStatic %>'
        }]
    });
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.registerTask('previewstage', ['add_environment_data', 'shell:checkMounts', 'stage_checklist', 'prepDeploy', 'replace:prepPreviewStageDeploy', 'copy:stageDeploy', 'clean:main']);
};