/**
 * base webpack config
 */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const constants = require('./const')


module.exports = {
  output: {
    path: constants.distPath, 
    filename: '[name].js',
    hotUpdateChunkFilename: '.hot/hot-update.js',
    hotUpdateMainFilename: '.hot/hot-update.json'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      'node_modules',
      constants.srcPath
    ]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: [
                  autoprefixer()
                ]
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.(png|jpe?g|gif)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 20000
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      }
    ]
  },
  optimization: {
    // webpack manifest
    runtimeChunk: {
      name: "manifest"
    },
    // node_modules 
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: "initial",
          name: 'vendor',
          test: /\/node_modules\//,
        }
      }
    }
  },
  context: constants.staticPath,
  target: 'web'
}
