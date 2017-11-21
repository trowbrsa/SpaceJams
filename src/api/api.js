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
    console.log("here is token", token);

    const BASE_URL = 'https://api.spotify.com/v1/search?';
    const FETCH_URL = BASE_URL + 'q=' + 'space&type=artist';

    let myOptions = {
      method: 'GET',
      headers:  {
        'Authorization': 'Bearer ' + token
     },
      mode: 'cors',
      cache: 'default'
    };

    fetch(FETCH_URL, myOptions)
    // axios.get('https://api.spotify.com/v1/search?q=space', {
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   }
    // })
    .then(response => response.json())
    .then(json => console.log(json))
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}


const main = function() {
  callAPI();
}

export { main };
