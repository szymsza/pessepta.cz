module.exports = function(grunt) {
    grunt.initConfig({
      watch: {
        styles: {
          files: ['src/scss/**/*'],
          tasks: ['sass'],
          options: {
            spawn: false,
          },
        },
        scripts: {
          files: ['src/js/**/*'],
          tasks: ['buildjs'],
          options: {
            spawn: false,
          },
        },
      },
      sass: {
        dist: {
          options: {
              style: "compressed",
          },
          files: {
              'dist/main.css': 'src/scss/main.scss'
          }
        }
      },
    babel: {
        options: {
            sourceMap: true
        },
        dist: {
            files: {
                'dist/app.js': 'src/js/app.js'
            }
        }
    }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks("grunt-babel");

    grunt.registerTask("buildcss", ["sass"]);
    grunt.registerTask("buildjs", ["babel"])
};