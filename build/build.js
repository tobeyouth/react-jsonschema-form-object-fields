/**
 * webpack build task
 */

const webpack = require('webpack')
const merge = require('webpack-merge')
const PrettyError = require('pretty-error')
const chalk = require('chalk')

let pe = new PrettyError()
let baseConfig = require('./config/base')
let productionConfig = require('./config/production')
let customConfig = require('./config/custom')
let config = merge({}, baseConfig, productionConfig, customConfig)

webpack(config, (err, stats) => {
  if (err) {
    console.log(chalk.bold.red(pe.render(new Error(err))))
  }
  if (stats) {
    let _stats = stats.toString()
    if (_stats.match(/ERROR/g)) {
      console.log(chalk.bold.red(`[webpack] ${_stats}`))
    } else if (_stats.match(/WARNING/g)) {
      console.log(chalk.bold.yellow(`[webpack] ${_stats}`))
    } else {
      console.log(chalk.cyan(`[webpack] ${_stats}`))
    }
  }
})