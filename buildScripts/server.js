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

app.listen(port, function (error) {
  console.log("in listen function");
  if(error) {
    console.log(error);
  }
});

app.get('/', function (req, res) {
  console.log("in get function");
  main();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});



