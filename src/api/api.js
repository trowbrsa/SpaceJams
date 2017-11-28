import axios from 'axios';
import dotenv from 'dotenv';
import jsonFile from 'jsonfile';

const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const file = './dailyData.json';

dotenv.config();

const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

let apiData = {};

function callAPI() {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(response => {
    let data = response.data;
    if(response.data.media_type !== 'image'){
      return;
    }
    apiData.image_data =
      {
        'date': data.date,
        'copyright': data.copyright,
        'title': data.title,
        'explanation': data.explanation,
        'hdurl': data.hdurl,
        'url': data.url,
        'media_type': data.media_type
      };
      return(data.title, data.explanation);
  })
  .then((title, explanation) => {
    callNLPLibrary(title, explanation);
  })
  .then(entity => {
    callSpotifyApi(entity);
  })
  .catch(error => {
    console.log('request failed', error);
  })
}

function callNLPLibrary(title, explanation) {
  const text = title + explanation;

  const document = {
    content: text,
    type: 'PLAIN_TEXT',
  };

  client
    .analyzeEntities({document})
    .then(results => {
      return results[0].entities;
    })
    .catch(err => {
      console.error('Error from Google: ', err);
    });
}

function callSpotifyApi(processedData) {
  let payload = `${SPOTIFY_ID}:${SPOTIFY_SECRET}`;
  let encodedPayload = new Buffer(payload).toString('base64');

  axios({
    url: 'https://accounts.spotify.com/api/token',
    method: 'post',
    params: {
      grant_type: 'client_credentials'
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedPayload}`
    },
  })
  .then(response => {
    let token = response.data.access_token;
    let getSong = function(entity){
      return new Promise(function(resolve, reject) {
        let songSearchTerm = entity.name;
        let song = '';
        axios.get(`https://api.spotify.com/v1/search?q=${songSearchTerm}&type=track`, {
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
          if(response.data.tracks.items.length > 0){
            if('album' in response.data.tracks.items[0]){
                song = response.data.tracks.items[0].uri;
                apiData.track_data = song;
                jsonFile.writeFile(file, apiData);
                return resolve();
            }
          }
          // no song found, use default
          song = '3gdewACMIVMEWVbyb8O9sY';
          return reject(song);
        })
        .catch(error => {
          console.log("Error with Spotify", error);
        })
      })
      processedData.find(getSong);
    }
  })
}


const main = () => {
  callAPI();
}

export { main };
