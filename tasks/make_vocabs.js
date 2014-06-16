module.exports = function (grunt) {
    grunt.config('cloudfile_to_vocab', {
        default: {
            options: {
                output_directory:      'source/vocabs',
                google_spreadsheet_id: '<%= config.vocabs.googleSpreadsheetId %>',
                worksheet:             '<%= config.vocabs.worksheet %>',
                username:              '<%= env.google.username %>',
                password:              '<%= env.google.password %>'
            }
        }
    });
    grunt.loadNpmTasks('grunt-cloudfile-to-vocab');
    grunt.registerTask('make_vocabs', ['cloudfile_to_vocab']);
};