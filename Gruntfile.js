const path = require('path');

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
    webpack: {
      myConfig: {
        entry: './src/js/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  }
      },
    }
    });

    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask("buildcss", ["sass"]);
    grunt.registerTask("buildjs", ["webpack"])
};