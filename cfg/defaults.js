/**
 * Function that returns default values.
 * Used because Object.assign does a shallow instead of a deep copy.
 * Using [].push will add to the base array, so a require will alter
 * the base array output.
 */
'use strict';

const path = require('path');
const srcPath = path.join(__dirname, '/../src');
console.log(path.join(__dirname, '/../src'))
// const dfltPort = 8000;
const dfltPort = 80;
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractLESS = new ExtractTextPlugin('/src/styles/[name].less');

/**
 * Get the default modules object for webpack
 * @return {Object}
 */
function getDefaultModules() {
  return {
    // preLoaders: [
    //   {
    //     test: /\.(js|jsx)$/,
    //     include: srcPath,
    //     loader: 'eslint-loader'
    //   }
    // ],
    loaders: [

      {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
      },
      {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
      },
      {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.(woff|woff2|ttf)\??.*$/,
        loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  };
}

module.exports = {
  srcPath: srcPath,
  publicPath: '/',
  port: dfltPort,
  getDefaultModules: getDefaultModules
};
