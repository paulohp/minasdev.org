module.exports = function( grunt ) {
  "use strict";

  // autoload modules from package.json
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  // Tasks configurations
  grunt.initConfig({

    metadata : {
      local:{
        dev:{
          path: "dev/"
        },
        test:{
          path: "test/"
        }
      },
      compass:{
        local:{
          url: "http://minasdev.org/"
        },
        remote:{
          url: "???"
        }
      }
    },

    htmlmin: {
      test: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          '<%= metadata.local.test.path %>index.html': '<%= metadata.local.dev.path %>index.html'
        }
      }
    },

    compass: {
      test: {
        options: {
        httpPath: "<%= metadata.compass.local.url %>",
        outputStyle: "compressed",
          environment: "production",
          sassDir: "<%= metadata.local.dev.path %>statics/scss",
          cssDir: "<%= metadata.local.test.path %>statics/styles/",
        fontsDir: "<%= metadata.local.test.path %>statics/fonts/",
        imagesDir: "<%= metadata.local.test.path %>statics/images"
        }
      }
    },

    uglify: {
      test: {
        files: {
          '<%= metadata.local.test.path %>statics/scripts/minasdev.js': ['<%= metadata.local.test.path %>statics/scripts/minasdev.js'],
        }
      }
    },

    imagemin: {
      default: {
        files: [{
          expand: true,
          cwd: '<%= metadata.local.dev.path %>statics/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: '<%= metadata.local.dev.path %>statics/images/'
        }]
      }
    },

    copy: {
      test: {
        files: [
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/images/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/images/' },
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/fonts/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/fonts/' },
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/scripts/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/scripts/' },
          ]
      },
      testIMAGES: {
        files: [
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/images/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/images/' },
          ]
      },
      testJS: {
        files: [
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/scripts/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/scripts/' },
          ]
      },
      testFONTS: {
        files: [
          { expand: true, cwd: '<%= metadata.local.dev.path %>statics/fonts/', src: ['**'], dest: '<%= metadata.local.test.path %>statics/fonts/' },
          ]
      }
    },

    clean: {
      test: ["<%= metadata.local.test.path %>"],
      testIMAGES: ["<%= metadata.local.test.path %>statics/images/"],
      testJS: ["<%= metadata.local.test.path %>statics/scripts/"],
      testFONTS: ["<%= metadata.local.test.path %>statics/fonts/"]
    },

    watch: {
      options: {
        spawn: false
      },
      html: {
        files: ['<%= metadata.local.dev.path %>**/*.html'],
        tasks: ['htmlmin:test']
      },
      scss: {
        files: ['<%= metadata.local.dev.path %>statics/scss/**/*.scss'],
        tasks: ['compass:test']
      },
      js: {
        files: ['<%= metadata.local.dev.path %>statics/scripts/**/*.js'],
        tasks: ['clean:testJS', 'copy:testJS', 'uglify:test']
      },
      images: {
        files: ['<%= metadata.local.dev.path %>statics/images/**/*'],
        tasks: ['clean:testIMAGES','imagemin:default','copy:testIMAGES']
      },
      fonts: {
        files: ['<%= metadata.local.dev.path %>statics/fonts/**/*'],
        tasks: ['clean:testFONTS','imagemin:default','copy:testFONTS']
      }
    },

    "regex-replace": {
        test: {
            src: ['<%= metadata.local.test.path %>statics/styles/minasdev.css'],
            actions: [
                {
                    name: 'bar',
                    search: '/dev',
                    replace: '',
                    flags: 'g'
                },
                {
                    name: 'bar',
                    search: '/test',
                    replace: '',
                    flags: 'g'
                }
                ]
        }
    }

  });

  // task registration
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('clear', ['clean:test']);

  grunt.registerTask('images', ['clean:testIMAGES','imagemin:default','copy:testIMAGES']);

  grunt.registerTask('local', ['clean:test', 'copy:test', 'compass:test', 'uglify:test', 'htmlmin:test']);

  grunt.registerTask('build', ['clean:test', 'copy:test', 'compass:test', 'regex-replace:test', 'uglify:test', 'htmlmin:test']);

  grunt.registerTask('prod', []);

};




