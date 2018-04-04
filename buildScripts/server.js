import express from 'express';
import path from 'path';
import open from 'open';
import {main} from '../src/api/api.js';
import dotenv from 'dotenv';

import webpack from 'webpack';
import config from '../webpack.config.dev';

const compiler = webpack(config);
dotenv.config();


const app = express();
let port = 8000

console.log("this is the port: ", port)


app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.listen(port, function (error) {
  if(error) {
    console.log(error);
  }
});

app.get('/', function (req, res) {
  main();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
