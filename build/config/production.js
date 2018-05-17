/**
 * production webpack config
 */
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const constants = require('./const')

module.exports = {
  // webpack configure
  mode: 'production',
  cache: false,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('production') 
      }
    }),
    new HtmlWebpackPlugin({
      template: constants.serveFilePath,
      filename: `${constants.distPath}/index.html`,
      chunks: ['manifest', 'vendor', 'app'],
      inject: true
    })
  ]
}