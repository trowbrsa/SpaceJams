import webpack from 'webpack'
import path from 'path'

export default {
  devtool: 'inline-source-map',

  entry: [
    path.resolve(__dirname, 'src/index.js')
  ],

  output: {
    path: path.resolve(__dirname, 'src'),
    publicPath: '/',
    filename: 'bundle.js'
  }
}
