module.exports = function(grunt) {
  grunt.initConfig({


    concat: {
        dist: {
              src: ['styles/agile-grenoble/*.css'],
              dest: 'styles/agile-grenoble-index.css'
            }
    },

    sync: {
      main: {
        files: [{
              cwd: 'bower_components/',
              src: [  '*/*.js',
                      '*/*.js.map',
                      '*/*.css'],
              dest: 'lib'
          },{
              cwd: 'bower_components/angular-gridster/dist/',
              src: [  '*'],
              dest: 'lib/angular-gridster/'
          },{
              cwd: 'bower_components/bootstrap/dist/',
              src: [  '*/*'],
              dest: 'lib/bootstrap/'
          },{
              cwd: 'bower_components/jquery/dist',
              src: ['*.js', '*.map'],
              dest: 'lib/jquery'
          }],
        verbose: true // Display log messages when copying files
      }
    }

  });

  grunt.loadNpmTasks('grunt-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('default', 'sync', 'concat');
};
