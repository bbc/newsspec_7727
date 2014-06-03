module.exports = function (grunt) {
    
    grunt.registerTask('checkStage', ['add_environment_data', 'nowWeCanCheckStage']);

    grunt.registerTask('nowWeCanCheckStage', ['Checking content on stage'], function () {
        var path = require('path'),
            env  = grunt.config.get('env'),
            pkg  = grunt.file.readJSON('package.json'),
            done = this.async(),
            fs   = require('fs');

        try {
          // Query the entry
            stats = fs.lstatSync(env.stage.mount + '/news/special/' + pkg.year + '/newsspec_' + pkg.project_number + '/content/' + pkg.services.default);
          // Is it a directory?
            if (stats.isDirectory()) {
                grunt.log.writeln('This content is on stage - OK');
                done();
            }
        } catch (e) {
            done(false);
            grunt.log.writeln('This content has not been staged - Fail');
        }
    });
};