module.exports = function (grunt) {

    // *************************************************************************
    // PROJECT FILES
    // Make a list of templates you want converted to files
    // *************************************************************************

    var projectFiles = {
        'index.html': 'index.html.tmpl',
        'index.inc':  'index.inc.tmpl',
        'test.html':  'test.html.tmpl'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************

    grunt.config('multi_lang_site_generator', {
        default: {
            options: {
                vocabs:             ['<%= pkg.services.default %>'],
                vocab_directory:    'source/vocabs',
                template_directory: 'source/tmpl/',
                output_directory:   'content',
                data: {
                    version:             '<%= pkg.version %>',
                    inlineStyleElm:      '<style><%= grunt.file.read("content/" + pkg.services.default + "/css/inline.css") %></style>',
                    inlineIframeManager: '<%= grunt.file.read("source/js/lib/news_special/iframemanager__host.js") %>',
                    path:                '<%= env[pkg.whichEnv].domain %>/news/special/<%= pkg.year %>/newsspec_<%= pkg.project_number %>/content',
                    pathStatic:          '<%= env[pkg.whichEnv].domainStatic %>/news/special/<%= pkg.year %>/newsspec_<%= pkg.project_number %>/content',
                    projectNumber:       '<%= pkg.project_number %>',
                    cpsId:               '<%= pkg.cps_id || pkg.project_number %>',
                    istatsName:          '<%= pkg.istatsName %>',
                    storyPageUrl:        '<%= pkg.storyPageUrl %>',
                    debug:               '<%= pkg.debug %>',
                    amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>'
                }
            },
            files: projectFiles
        },
        build_all_other_sites: {
            options: {
                vocabs:             '<%= pkg.services.others %>',
                vocab_directory:    'source/vocabs',
                template_directory: 'source/tmpl/',
                output_directory:   'content',
                data: {
                    version:             '<%= pkg.version %>',
                    inlineStyleElm:      '<style><%= grunt.file.read("content/" + pkg.services.default + "/css/inline.css") %></style>',
                    inlineIframeManager: '<%= grunt.file.read("source/js/lib/news_special/iframemanager__host.js") %>',
                    path:                '<%= env[pkg.whichEnv].domain %>/news/special/<%= pkg.year %>/newsspec_<%= pkg.project_number %>/content',
                    pathStatic:          '<%= env[pkg.whichEnv].domainStatic %>/news/special/<%= pkg.year %>/newsspec_<%= pkg.project_number %>/content',
                    projectNumber:       '<%= pkg.project_number %>',
                    cpsId:               '<%= pkg.cps_id || pkg.project_number %>',
                    istatsName:          '<%= pkg.istatsName %>',
                    storyPageUrl:        '<%= pkg.storyPageUrl %>',
                    debug:               '<%= pkg.debug %>',
                    amdModulePaths:      '<%= JSON.stringify(amdModulePaths) %>'
                }
            },
            files: projectFiles
        }
    });
    grunt.loadNpmTasks('grunt-multi-lang-site-generator');
};