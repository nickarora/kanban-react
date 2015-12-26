var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var merge = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'app'),
  build : path.join(__dirname, 'build')
}

process.env.BABEL_ENV = TARGET;

var common = {
  entry: PATHS.app,

  // dev server runs in memory
  // therefore temporarily drop output

  // output: {
  //   path: PATHS.build,
  //   filename: 'bundle.js'
  // },

  // import jsx files without an extension!
  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  module: {
    loaders: [
      {
        // Test expects a RegExp
        test: /\.css$/,
        loaders: ['style', 'css'],
        // Include accepts either a path or an array of paths
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'Kanban React'
    })
  ]
};


if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',

    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env so this is easy to customize.
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
