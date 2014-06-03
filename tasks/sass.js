module.exports = function (grunt) {
    grunt.config('sass', {
        main: {
            files: {
                './content/<%= pkg.services.default %>/css/main.css':      './source/scss/main.scss',
                './content/<%= pkg.services.default %>/css/legacy-ie.css': './source/scss/legacy-ie.scss',
            }
        },
        inline: {
            files: {
                './content/<%= pkg.services.default %>/css/inline.css': './source/scss/news_special/inline.scss'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-sass');
};