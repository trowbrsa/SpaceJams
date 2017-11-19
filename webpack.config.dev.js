import webpack from 'webpack'
import path from 'path'

const Dotenv = require('dotenv-webpack');

export default {
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader'] }
    ]
  },
  node: {
    fs: 'empty'
  },
  plugins: [
    new Dotenv({
      path: './.env',
      systemvars: true,
    })
  ],
}
