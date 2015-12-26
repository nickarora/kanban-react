var path = require('path');
var htmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'app'),
  build : path.join(__dirname, 'build')
}

module.exports = {

  entry: PATHS.app,

  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },

  plugins: [
    new htmlWebpackPlugin({
      title: 'Kanban React'
    })
  ]

};