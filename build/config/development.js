/**
 * development webpack config
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const webpack = require('webpack')

module.exports = {
  // webpack configure
  mode: 'development',
  cache: true,
  devtool: 'cheap-module-eval-source-map',
  watch: true,
  devServer: {
    hot: false
  },
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify('dev') 
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
}