module.exports = function (grunt) {
    grunt.config('connect', {
        local: {
            options: {
                hostname: '127.0.0.1',
                port:     1031,
                base:     '.',
                directory: '<%= env.localhost %>',
                middleware: function (connect, options) {
                    var middlewares = [];
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }
                    var directory = options.directory || options.base[options.base.length - 1];
                    options.base.forEach(function (base) {
                        middlewares.push(connect.static(base));
                    });
                    middlewares.push(connect.static(directory));
                    middlewares.push(connect.directory(directory));
                    return middlewares;
                }
            }
        },
        localStatic: {
            options: {
                hostname: '127.0.0.1',
                port:     1033,
                base:     '.',
                directory: '<%= env.localhost %>',
                middleware: function (connect, options) {
                    var middlewares = [];
                    if (!Array.isArray(options.base)) {
                        options.base = [options.base];
                    }
                    var directory = options.directory || options.base[options.base.length - 1];
                    options.base.forEach(function (base) {
                        middlewares.push(connect.static(base));
                    });
                    middlewares.push(connect.static(directory));
                    middlewares.push(connect.directory(directory));
                    return middlewares;
                },
                keepalive: true
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.registerTask('server', ['add_environment_data', 'connect']);
};