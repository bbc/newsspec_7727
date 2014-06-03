module.exports = function (grunt) {
    grunt.registerTask('prepDeploy', ['Copies each service into the "tmp" directory, making it ready to be deployed'], function () {
        var pkg    = grunt.file.readJSON('package.json'),
            wrench = require('wrench'),
            env    = grunt.config.get('env'),
            fs     = require('fs'),
            vocabs = pkg.services.others.concat(pkg.services.default);

        fs.mkdir('tmp');
        vocabs.forEach(function (vocab) {
            try {
                vocab_dir = fs.lstatSync(env.localhost + '/news/special/' + pkg.year + '/newsspec_' + pkg.project_number + '/content/' + vocab);
                if (vocab_dir.isDirectory()) {
                    wrench.copyDirSyncRecursive('content/' + vocab, 'tmp/' + vocab);
                    grunt.log.writeln(vocab + ' is ready for deployment');
                }
            } catch (e) {
                grunt.log.warn(vocab + ' will not be deployed as it has not yet been build');
            }
        });
    });
};