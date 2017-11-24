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
    console.log('request to NASA failed', error)
  })
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
      const processedData = entities[0].name;
      // could also continue doing the call here while there is apiData
      // until we get a response with album or tracks
      // keep iterating thorugh entities, then use the default song
      console.log("response from Google", entities);
      callSpotifyApi(processedData);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function callSpotifyApi(processedData) {

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
  .then(response => {
    let token = response.data.access_token;

    axios.get(`https://api.spotify.com/v1/search?q=${processedData}&type=track`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      console.log("spotify response: ", response.data);
      // check first if there are albums
      // if no albums, get check if there are tracks
      // if there are tracks, check if tracks.items.length > 0
      // if not, then use the default song.
      apiData.track_data = response.data.tracks.items[0].album.uri;
      jsonFile.writeFile(file, apiData, function (err){
        console.log('error with writing JSON: ', err)
      })
    }).catch(err => {
      console.error('Error in call response from Spotify:', err)
    });
  })
  .catch(err => {
    console.error('ERROR:', err)
  });
}


const main = () => {
  callAPI();
}

export { main };
