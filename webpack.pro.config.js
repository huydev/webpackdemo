var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

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
    filename: 'js/app.bundle.js'
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
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url?limit=10000&name=images/[name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)\w*/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: require.resolve("jquery"), loader: "expose?$!expose?jQuery"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'build'], {
      verbose: true, 
      dry: false
    }),
    new ExtractTextPlugin("css/style.css", {allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin("vendor", "js/vendor.bundle.js"),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};