
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
        }
    });

	grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('build', [
        'concat',
        'uglify'
    ]);


    grunt.registerTask('default', ['build']);

};