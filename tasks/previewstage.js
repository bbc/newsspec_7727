module.exports = function (grunt) {
    grunt.config(['replace', 'prepPreviewStageDeploy'], {
        src: ['tmp/*/**.*', 'tmp/*/half_wide/**.*'],
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
    grunt.registerTask('previewstage', ['shell:checkMounts', 'stage_checklist', 'prepDeploy', 'replace:prepPreviewStageDeploy', 'copy:stageDeploy', 'clean:main']);
};