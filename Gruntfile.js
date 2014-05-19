
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {

    // configurable paths
    var projectConfig = {
        app: 'app',
        dist: 'dist'
    };
    // Project configuration.
    grunt.initConfig({
        project: projectConfig,
        concat: {
            dist: {
                files: {
                    '<%= project.dist %>/scripts/scripts.js': 'public/js/*.js'
                }
            }
        },
        uglify: {
            options: {
                report: 'min'
            },
            dist: {
                files: {
                    '<%= project.dist %>/scripts/scripts.js': ['<%= project.dist %>/scripts/scripts.js']
                }
            }
        },
        cssmin: {
              minify: {
                expand: true,
                cwd: 'public/views/landing_page/css/',
                src: ['*.css', '!*.min.css'],
                dest: 'release/css/',
                ext: '.min.css'
              }
            }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    grunt.registerTask('build', [
        'concat',
        'uglify'
    ]);

    grunt.registerTask('minifyCss', ['cssmin']);
    grunt.registerTask('min', ['min']);

    grunt.registerTask('default', ['build']);

};