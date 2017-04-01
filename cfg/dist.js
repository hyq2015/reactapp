'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app:path.resolve(__dirname, '../src/index'),
    vendor: ['react','react-dom','react-router'],
    vendor1:['fastclick']
  },
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),

    new ExtractTextPlugin(path.posix.join('static', 'css/all.css')),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','vendor1']
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, '../dist/index.html'),
      template: path.resolve(__dirname, '../src/index1.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: false,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new webpack.NoErrorsPlugin()
  ],
  module: defaultSettings.getDefaultModules()
});
console.log(path.resolve(__dirname, '../src/index'));
console.log(path.resolve(__dirname, '/dist'));
console.log(path.join(__dirname, '/../src'));
// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

config.module.loaders.push({
  test: /\.css$/,
  loader:ExtractTextPlugin.extract("style-loader", "css-loader")

});
config.module.loaders.push({
  test: /\.less/,
  loader:ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
});

module.exports = config;
