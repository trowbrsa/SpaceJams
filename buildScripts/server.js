import express from 'express';
import path from 'path';
import open from 'open';
import {main} from '../src/api/api.js';
import webpack from 'webpack';
import config from '../webpack.config.dev';

const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  main();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(3000, function (error) {
  if(error) {
    console.log(error);
  }
});


