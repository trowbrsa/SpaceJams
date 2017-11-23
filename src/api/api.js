import axios from 'axios';
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const jsonFile = require('jsonfile');
const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;
const file = './dailyData.json';

require('dotenv').config();

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

    callNLPLibrary(data.title, data.explanation);
  })
  .catch(function(error) {
    console.log('request failed', error)
  })
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

function callNLPLibrary(title, explanation) {
  const text = title + explanation;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  client
    .analyzeEntities({document: document})
    .then(results => {
      const entities = results[0].entities;
      let testEntity = entities[0].name;
      callSpotifyApi(testEntity);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function callSpotifyApi(test){

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

    axios.get(`https://api.spotify.com/v1/search?q=${test}&type=track`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(function(response){
      apiData.track_data = response.data.tracks.items[0].album.uri;
      jsonFile.writeFile(file, apiData, function (err){
        console.log('error with writing JSON: ', err)
      })
    })
  })
  .catch(err => {
    console.error('ERROR:', err)
  });
}


const main = function() {
  callAPI();
}

export { main };
