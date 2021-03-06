var webpackConfig = require('./webpack.test');
var  webpack=require('webpack');
// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    frameworks: [
      // Reference: https://github.com/karma-runner/karma-jasmine
      // Set framework to jasmine
      'jasmine'
    ],

    files: [
      // Grab all files in the app folder that contain .test.
      'test/tests.webpack.js'
    ],

    preprocessors: {
      // Reference: http://webpack.github.io/docs/testing.html
      // Reference: https://github.com/webpack/karma-webpack
      // Convert files with webpack and load sourcemaps
      'test/tests.webpack.js': ['webpack', 'sourcemap']
    },

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],


    browsers: [
      // Run tests using PhantomJS
      'PhantomJS'
    ],

    singleRun: true,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'build/coverage/',
      type: 'html'
    },

    webpack: webpackConfig,
    plugins: [
      require("karma-webpack"),
      require('karma-jasmine'),
      require('karma-phantomjs-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('karma-sourcemap-loader')
    ]
  });
};
