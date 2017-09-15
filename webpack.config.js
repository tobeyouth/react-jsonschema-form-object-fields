var path = require('path')
var webpack = require('webpack')
var config = {
  entry: {
    'build/index': './demo/index.js'
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, "./"),
    chunkFilename: "[chunkhash].js",
    sourceMapFilenamr: "[file].map"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        use: [
          {
            loader: "json-loader"
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".web.js"],
    modules: ["node_modules", "./"]
  },
  target: "web"
}

module.exports = config
