'use strict';

module.exports = function (grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    myApp: {
      app: require('./bower.json').appPath || 'app',
      dist: 'dist'
    },

   
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= myApp.app %>/js/{,*/}*.js'
      ],
      test: {
        options: {
          jshintrc: '.jshintrc'
        },
        src: ['test/unit/{,*/}*.js']
      }
    },
    uglify: {
      options: {
        mangle: false
      }
    },
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= myApp.dist %>/*',
            '!<%= myApp.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/css/',
          src: '{,*/}*.css',
          dest: '.tmp/css/'
        }]
      }
    },

    'bower-install': {
      app: {
        html: '<%= myApp.app %>/index.html',
        ignorePath: '<%= myApp.app %>/'
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= myApp.dist %>/js/{,*/}*.js',
            '<%= myApp.dist %>/css/{,*/}*.css',
            '<%= myApp.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
            '<%= myApp.dist %>/css/fonts/*'
          ]
        }
      }
    },

    useminPrepare: {
      html: '<%= myApp.app %>/index.html',
      options: {
        dest: '<%= myApp.dist %>'
      }
    },

    usemin: {
      html: ['<%= myApp.dist %>/{,*/}*.html'],
      css: ['<%= myApp.dist %>/css/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= myApp.dist %>']
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myApp.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= myApp.dist %>/img'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= myApp.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= myApp.dist %>/img'
        }]
      }
    },
    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= myApp.dist %>',
          src: ['*.html', '{,*/}*.html'],
          dest: '<%= myApp.dist %>'
        }]
      }
    },

    ngmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/js',
          src: '*.js',
          dest: '.tmp/concat/js'
        }]
      }
    },

    cdnify: {
      dist: {
        html: ['<%= myApp.dist %>/*.html']
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= myApp.app %>',
          dest: '<%= myApp.dist %>',
          src: [
            '*.{ico,png,txt}',
            '.htaccess',
            '*.html',
            '{,*/}*.html',
            'bower_components/**/*',
            'js/**/*',
            'img/{,*/}*.{webp}',
            'fonts/*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/img',
          dest: '<%= myApp.dist %>/img',
          src: ['generated/*']
        }]
      },
      styles: {
        expand: true,
        cwd: '<%= myApp.app %>/css',
        dest: '.tmp/css/',
        src: '{,*/}*.css'
      }
    },

    concurrent: {
      server: [
        'copy:styles'
      ],
      test: [
        'copy:styles'
      ],
      dist: [
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },

    replace: {
      development: {
        options: {
          patterns: [{
            json: grunt.file.readJSON(
              'config.development.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config.js'],
          dest: '<%= myApp.app %>/js'
        }]
      },
      azure: {
        options: {
          patterns: [{
            json: grunt.file.readJSON('config.azure.json')
          }]
        },
        files: [{
          expand: true,
          flatten: true,
          src: ['config.js'],
          dest: '<%= myApp.app %>/js'
        }]
      }
    },

    karma: {
      unit: {
        configFile: './karma.conf.js',
        singleRun: true
      }
    }
  });

  grunt.registerTask('server', function () {
    grunt.log.warn(
      'The `server` task has been deprecated. Use `grunt serve` to start a server.'
    );
    grunt.task.run(['serve']);
  });

  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'ngmin',
    'copy:dist',
    'cssmin',
    'uglify',
    'rev',
    'usemin',
    'htmlmin',
    'cdnify'
  ]);

  grunt.registerTask('default', [
    'newer:jshint',
    // 'test',
    'build'
  ]);
};