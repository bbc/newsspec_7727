module.exports = function (grunt) {
    grunt.registerTask('add_environment_data', [], function () {
        var env = {
            'local': {
                'domain':       'http://local.bbc.co.uk:1031',
                'domainStatic': 'http://static.local.bbc.co.uk:1033'
            },
            'vm': {
                'domain':       'http://10.0.2.2:1031',
                'domainStatic': 'http://10.0.2.2:1033'
            }
        };
        var environmentFilePath = '../../env.json';
        if (grunt.file.exists(environmentFilePath)) {
            env = grunt.file.readJSON(environmentFilePath);
        }
        grunt.config('env', env);
    });
}