'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: {
    app:[
      'webpack-dev-server/client?http://192.168.1.5:' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/main'
    ],
    vendor:['react','react-dom','react-router'],
    vendor1:['fastclick']
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','vendor1']
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});
config.module.loaders.push(
{
  test: /\.css$/,
    loader: 'style-loader!css-loader'
}
);
config.module.loaders.push({
  test: /\.less/,
  loader: 'style-loader!css-loader!less-loader'
});


module.exports = config;
