/**
 * development server webpack config
 */
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const constants = require('./const')

let baseConfig = require('./base')
let customConfig = require('./custom')

let serveConfig = {
  // webpack configure
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('dev') 
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: constants.serveFilePath,
      chunks: ['manifest', 'vendor', 'example'],
      inject: true
    })
  ],
  // dev server
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    contentBase: constants.staticPath,
    watchContentBase: true,
    host: constants.devHost,
    port: constants.devPort,
    watchOptions: {
      poll: 500
    }
  }
}

let config = merge({}, baseConfig, serveConfig, customConfig)
console.log(config.devServer)
module.exports = merge({}, baseConfig, serveConfig, customConfig)
