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
<<<<<<< HEAD
let port = 8000;

console.log("this is the port: ", port);

=======
>>>>>>> Added debugging

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

<<<<<<< HEAD
app.listen(port, function (error) {
  console.log("in listen function");
  if(error) {
    console.log(error);
  }
});

=======
>>>>>>> Added debugging
app.get('/', function (req, res) {
  console.log("in get function");
  main();
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(8000, function (error) {
  console.log("in listen function");
  if(error) {
    console.log(error);
  }
});


