module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: [
                'Gruntfile.js',
                'src/simple-matrix.js',
                'test/test.js'
            ]
        },

        uglify: {
            my_target: {
                files: {
                    'simple-matrix.min.js': ['simple-matrix.js']
                }
            }
        }
    });
    grunt.registerTask('default', ['jshint', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
};