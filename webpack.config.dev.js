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
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets:[ 'es2015', 'react', 'stage-2' ]
        }
      }
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
