var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/app.js',
    vendor: [
      'jquery',
      'bootstrap/dist/js/bootstrap.min.js',
      './bootstrap-material-design/dist/js/material.min.js',
      './bootstrap-material-design/dist/js/ripples.min.js'
    ]
  },
  output: {
    publicPath: '/',
    path: './dist',
    filename: 'app.bundle.js'
  },
  module: {
    noParse: [
      'bootstrap/dist/js/bootstrap.min.js',
      './bootstrap-material-design/dist/js/material.min.js',
      './bootstrap-material-design/dist/js/ripples.min.js'
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader'
      },
      {
        test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    new HtmlWebpackPlugin({
      inject: 'body',
      hash: true,
      template: './src/index.html'
    })
  ]
};