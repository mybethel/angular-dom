module.exports = function(grunt) {
   'use strict';

   grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      bower: grunt.file.readJSON('bower.json'),

      jshint: {
         all: ['Gruntfile.js', 'src/*.js', 'test/**/*.js']
      },

      concat: {
         options: {
            stripBanners: true,
            banner: '/*\n' +
                    ' * @license Angular DOM\n' +
                    ' * (c) 2015 Bethel Technologies, LLC http://getbethel.com\n' +
                    ' * License: MIT\n' +
                    ' */\n' +
                    '(function(angular) {' +
                    "'use strict';",
            footer: '})(angular);'
         },
         dist: {
            src: ['src/angularDom.js', 'src/*.js'],
            dest: 'dist/angularDom.min.js'
         }
      },

      uglify: {
         options: {
            preserveComments: 'some',
            report: 'min'
         },
         dist: {
            files: [{
               expand: true,
               src: 'dist/angularDom.min.js'
            }]
         }
      },

      clean: ['dist']
   });

   require('load-grunt-tasks')(grunt);

   grunt.registerTask('test', ['jshint']);
   grunt.registerTask('default', ['jshint', 'concat:dist', 'uglify:dist']);

};
