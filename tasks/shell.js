module.exports = function (grunt) {
    grunt.config(['shell', 'checkMounts'], {
        command: 'ls -ls /Volumes | if grep --quiet "tmp"; then echo "OK"; else echo "WARNING"; fi',
        options: {
            stdout: true,
            callback: function (err, stdout, stderr) {

                done = this.async();

                if (stdout.match(/WARNING/)) {
                    grunt.log.warn('You need to mount your network drives before you can deploy to other environments.');
                    done(false);
                } else {
                    grunt.log.writeln('Drives appear to be mounted.');
                    done();
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-shell');
};