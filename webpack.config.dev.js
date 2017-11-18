import webpack from 'webpack'
import path from 'path'

const Dotenv = require('dotenv-webpack');

export default {
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  node: {
    fs: 'empty'
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: true,
    })
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  }
}
