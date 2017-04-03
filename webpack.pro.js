/**
 * Created by Administrator on 2017/4/1.
 */
let path=require('path');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let BowerWebpackPlugin = require('bower-webpack-plugin');
let CompressionWebpackPlugin = require('compression-webpack-plugin');
let webpack = require('webpack');
console.log(path.join(__dirname, '/src/index1.html'));
console.log(path.posix.join('static', 'css/all.css'));
module.exports={
  entry: {
    app:path.join(__dirname, '/src/main'),
    vendor: ['react','react-dom','react-router','react-mixin','reflux'],
    vendor1:['fastclick','swiper']
  },
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name].js',
    chunkFilename: '[name].js'
  },
  cache: false,
  devtool: 'sourcemap',
  module:{
    loaders: [
      {
        test: /\.css$/,
        loader:ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.less/,
        loader:ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },
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
        loader: 'url-loader?limit=8192&name=/[hash:8].[name].[ext]'
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
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: [].concat(
          [ path.join(__dirname, '/src/') ]
        )
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: '"production"'}
    }),
    new webpack.optimize.DedupePlugin(),

    new ExtractTextPlugin(path.posix.join('static', 'css/all.css')),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor','vendor1']
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, '/dist/index.html'),
      template: path.join(__dirname, '/src/index1.html'),
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
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        ['js', 'css'].join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '/src/static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.web.js', '.jsx', '.js', '.json'],
    alias: {
      actions: path.join(__dirname,'/src/actions/'),
      components: path.join(__dirname,'/src/components/'),
      sources: path.join(__dirname,'/src/sources/'),
      stores: path.join(__dirname,'/src/stores/'),
      styles: path.join(__dirname,'/src/styles/'),
      config: path.join(__dirname,'/src/config/') + process.env.REACT_WEBPACK_ENV,
      'react/lib/ReactMount': 'react-dom/lib/ReactMount'
    }
  }
};
