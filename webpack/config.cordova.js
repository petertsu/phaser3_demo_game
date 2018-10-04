const path = require('path')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpackConfig = require('./config')

module.exports = merge(webpackConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, '../www'),
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new CleanWebpackPlugin(
      ['www'],
      { root: path.join(__dirname, '../') }
    ),
    new CopyWebpackPlugin([
      { from: 'assets', to: 'assets' }
    ]),
  ]
})
