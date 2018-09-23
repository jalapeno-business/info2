module.exports = (grunt) => {
  grunt.loadNpmTasks('grunt-run');
  grunt.initConfig({
    run: {
      webpack: {
        cmd: 'npm',
        args: [
          'run',
          'webpack-prod',
        ],
      },
      s3Reviews: {
        cmd: 'aws',
        args: [
          's3',
          'cp',
          './client/dist/info.js',
          's3://zagat-fec/',
          '--grants',
          'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
        ],
      },
      s3ReviewsGzip: {
        cmd: 'aws',
        args: [
          's3',
          'cp',
          './client/dist/info.js.gz',
          's3://zagat-fec/info.js',
          '--grants',
          'read=uri=http://acs.amazonaws.com/groups/global/AllUsers',
        ],
      },
    },
  });
  grunt.registerTask('build', ['run:webpack']);
  grunt.registerTask('deploy', ['run:s3']);
  grunt.registerTask('build-deploy', ['run:webpack', 'run:s3ReviewsGzip']);
};
