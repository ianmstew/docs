module.exports = function (grunt) {
  /* jshint camelcase:false */

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    path: {
      // Source folders
      app: 'app',
      app_appjs: 'app/app-js',
      app_style: 'app/less',
      app_vendor: 'app/vendor',

      // Intermediate folders (transient)
      temp: 'temp',
      bower: 'bower_components',

      // Output folders (transient)
      dist: 'public',
      dist_appjs: 'public/app-js',
      dist_style: 'public/style',
      dist_vendor: 'public/vendor'
    },

    clean: {
      all: [
        '<%- path.app_vendor %>',
        '<%- path.dist %>',
        '<%- path.temp %>',
        '<%- path.bower %>'
      ],

      dist: [
        '<%- path.dist %>'
      ]
    },

    less: {
      options: {
        paths: [
          '<%- path.app_vendor %>',
          '<%- path.temp %>'
        ],
        cleancss: false
      },

      precompile: {
        files: {
          '<%- path.temp %>/engine-ui-grid-precompile.less':
              '<%- path.app_style %>/engine-ui-grid.less'
        }
      },

      app: {
        options: {
          sourceMap: true,
          sourceMapFilename: '<%- path.dist_style %>/hosted-apis.css.map',
          sourceMapBasepath: '<%- path.dist_style %>'
        },
        files: {
          '<%- path.dist_style %>/hosted-apis.css':
              '<%- path.app_style %>/hosted-apis.less'
        }
      }
    },

    bower: {
      install: {
        options: {
          targetDir: '<%- path.app_vendor %>',
          layout: 'byComponent',
          bowerOptions: {
            production: true
          }
        }
      }
    },

    copy: {
      prod: {
        expand: true,
        cwd: '<%- path.app %>',
        src: [
          'img/**/*',
          '**/font/**/*'
        ],
        dest: '<%- path.dist %>'
      },

      prod_versioned: {
        expand: true,
        cwd: '<%- path.app %>',
        src: ['index.html'],
        dest: '<%- path.dist %>',
        options: {
          process: function (content) {
            return content
              .replace(/\{version\}/g, grunt.config.data.pkg.version)
              .replace('src="vendor/requirejs/require.js" data-main="app-js/app-require.js"',
                       'src="app.js?v=' + grunt.config.data.pkg.version + '"');
          }
        }
      }
    },

    shell: {
      options: {
        stdout: true,
        stderr: true,
        failOnError: true
      },

      sync_dev: {
        command: [
          'cwd=$(pwd)',
          'cd <%- path.app %>',
          'rsync . $cwd/<%- path.dist %> ' +
              '--update --delete --verbose --recursive ' +
              '--exclude less --exclude style' 
        ].join('&&')
      },

      sourcemap_links: {
        command: [
          'mkdir -p <%- path.dist_style %>',
          'cd <%- path.dist_style %>',
          'rm -f app && ln -s ../../app app',
          'rm -f dist && ln -s ../ dist'
        ].join('&&')
      }
    },

    requirejs: {
      prod: {
        options: {
          baseUrl: '<%- path.app_appjs %>',
          out: '<%- path.dist %>/app.js',
          mainConfigFile: '<%- path.app_appjs %>/app-require.js',
          name: '../vendor/almond/almond',
          include: ['app-start'],
          stubModules: ['text', 'hgn'],
          optimize: 'uglify2',
          preserveLicenseComments: false,
          insertRequire: ['app-start'],
          paths: {
            'lib/logger':        'lib/logger-prod',
            'lib/eventDebugger': 'lib/eventDebugger-prod'
          }
        }
      }
    },

    jshint: {
      options: {
        jshintrc: true
      },

      app: ['Gruntfile.js', '<%- path.app_appjs %>/**/*.js']
    },

    jscs: {
      options: {
        config: '<%- path.app_appjs %>/.jscsrc'
      },

      app: ['Gruntfile.js', '<%- path.app_appjs %>/**/*.js']
    },

    watch: {
      options: {
        nospawn: true
      },

      app: {
        files: [
          '<%- path.app %>/**/*',
          '!<%- path.app_style %>/**/*'
        ],
        tasks: ['shell:sync_dev']
      },

      less: {
        files: [
          '<%- path.app_style %>/**/*',
          '<%- path.dist_vendor %>/engine-ui/less/**/*'
        ],
        tasks: ['less:app']
      },

      // Start livereload server at http://localhost:35729/livereload.js
      livereload: {
        options: {
          cwd: '<%- path.dist %>',
          livereload: true
        },

        files: [
          '*.html',
          'app-js/**/*.html',
          'style/*.css'
        ]
      }
    }
  });

  // bring in all grunt plugins from package.json
  require('load-grunt-tasks')(grunt);

  grunt.registerTask('set-prod', function () {
    grunt.config.data.less.options.cleancss = true;
    grunt.config.data.less.app.options.sourceMap = false;
  });

  grunt.registerTask('build-dev', [
    'clean:dist',
    'bower',
    'shell:sync_dev',
    'less',
    'shell:sourcemap_links'
  ]);

  grunt.registerTask('build-prod', [
    'set-prod',
    'clean:all',
    'bower',
    'copy',
    'less',
    'requirejs'
  ]);

  grunt.registerTask('default', ['build-dev']);
};
