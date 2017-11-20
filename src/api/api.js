const language = require('@google-cloud/language');
// choose one http library
const fetch = require('node-fetch');
import axios from 'axios';
const client = new language.LanguageServiceClient();
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

// how do we get this file to be called when we hit our app
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json()
}

function callAPI() {
  // fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  // .then(checkStatus)
  // .then(parseJSON)
  // .then((data) => {
  //   console.log(data);
    //console.log("now calling NLP");
    // callNLPLibrary();
    callSpotifyApi();
  // }).catch(function(error) {
  //     console.log('request failed', error)
  //   })
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

  console.log("This is just the secrets", payload)

  let encodedPayload = new Buffer(payload).toString("base64");

  //let data = JSON.stringify("grant_type=client_credentials");
  //console.log(data);
  //onsole.log("this is the the authentication: ", authentication);

  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': "Basic " + encodedPayload
    },
  })

  // fetch('https://accounts.spotify.com/api/token', {
  //   method: 'POST',
  //   headers: {
  //     'Authorization': authentication,
  //     'Content-Type' : 'application/x-www-form-urlencoded',
  //   },
  //   body: data
  // })
  .then((data) => {
    console.log(data);
  }).catch(function(error) {
    console.log('request failed', error)
  })
}


const main = function() {
  callAPI();
}

export { main };
