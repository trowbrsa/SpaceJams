// const cron = require('cron');

import {callAPI} from './api2.js';

// let job = new cron.CronJob({
//   cronTime: '00 30 1 * * 1-7',
//   onTick(){
//     callAPI();
//   },
//   start: true,
//   timeZone: 'America/Los_Angeles'
// });

const main = () => {
  callAPI();
  // job.start();
}

export { main };
