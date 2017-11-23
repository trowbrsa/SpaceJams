require('dotenv').config();

import axios from 'axios';
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const jsonFile = require('jsonfile');

const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

const file = './dailyData.json';

let apiData = {};

function callAPI() {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(checkStatus)
  .then((response) => {
    let data = response.data;
    apiData.image_data =
      {
        'date': data.date,
        'copyright': data.copyright,
        'title': data.title,
        'explanation': data.explanation,
        'hdurl': data.hdurl,
        'url': data.url
      };
    // jsonFile.writeFile(file, apiData, function (err){
    //   console.log(err)
    })
    .then(callNLPLibrary)
    //console.log("now calling NLP");
    // callNLPLibrary();
    //callSpotifyApi();
  // }).catch(function(error) {
  //     console.log('request failed', error)
    // })
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function callNLPLibrary() {
  const text = 'Space Jams';

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

// Detects the sentiment of the text client
  client
    .analyzeSentiment({document: document})
    .then(results => {
      const sentiment = results[0].documentSentiment;

      console.log(`Text: ${text}`);
      console.log(`Sentiment score: ${sentiment.score}`);
      console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function callSpotifyApi(){

  let payload = SPOTIFY_ID + ":" + SPOTIFY_SECRET;
  let encodedPayload = new Buffer(payload).toString("base64");

  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + encodedPayload
    },
  })
  .then((response) => {
    let token = response.data.access_token;

    axios.get('https://api.spotify.com/v1/search?q=space&type=artist', {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
}


const main = function() {
  callAPI();
}

export { main };
