module.exports = function (grunt) {
    grunt.config('cloudfile_to_vocab', {
        default: {
            options: {
                output_directory:      'source/vocabs',
                google_spreadsheet_id: '<%= pkg.vocabs.googleSpreadsheetId %>',
                worksheet:             '<%= pkg.vocabs.worksheet %>',
                username:              '<%= env.google.username %>',
                password:              '<%= env.google.password %>'
            }
        }
    });
    grunt.loadNpmTasks('grunt-cloudfile-to-vocab');
    grunt.registerTask('make_vocabs', ['add_environment_data', 'cloudfile_to_vocab']);
};