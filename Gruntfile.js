'use strict';

module.exports = function(grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    // measuring processing time
    require('time-grunt')(grunt);

    grunt.initConfig({
        jasmine: {
            taskName: {
                options: {
                    specs: 'test/*.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        paths: {
                            bower_components: '/bower_components',
                            modules: '/assets/js/modules'
                        }
                    }
                }
            }
        }
    });


    /*
    *
    * Сustom tasks
    *
    * */

    grunt.registerTask('watch-all', ['update','watch']);

};
