const path = require('path')
const staticPath = path.resolve(__dirname, './../../')

module.exports = {
  staticPath: staticPath,
  srcPath: path.resolve(staticPath, './src'),
  distPath: path.resolve(staticPath, './dist'),
  examplePath: path.resolve(staticPath, './example/index.jsx'),
  serveFilePath: path.resolve(staticPath, './example/index.html'),
  devHost: 'localhost',
  devPort: 8080
}

