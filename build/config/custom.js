/**
 * custom config
 */

const constants = require('./const')

module.exports = {
  entry: {
    example: constants.examplePath
  },
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    compress: true,
    contentBase: constants.staticPath,
    watchContentBase: true,
    // host: constants.devHost,
    host: '127.0.0.1',
    port: constants.devPort,
    publicPath: '/',
    watchOptions: {
      poll: true
    }
  }
}
