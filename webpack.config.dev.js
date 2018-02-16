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
      },
      {
        test:/\.(s*)css$/,
        use:['style-loader','css-loader', 'sass-loader'],
        include: __dirname + '/src'
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
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
  devServer: {
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
  }
}
