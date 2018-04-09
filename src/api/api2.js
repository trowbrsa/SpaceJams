import axios from 'axios';
import dotenv from 'dotenv';
import jsonFile from 'jsonfile';

const fs = require('file-system');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const file = './dailyData.json';

dotenv.config();

const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

let apiData = {};

function nasaAPI(){
  return new Promise(resolve => {
    axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    .then(function(response){
      let data = response.data;
      if(data.media_type !== 'image'){
        // make boolean in dailyData
        const error = new Error("No image available today");
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
      let nasaData = {'title': data.title, 'explanation': data.explanation};
      return resolve(nasaData);
    });
  })
}

function googleAPI(nasaData){
  return new Promise(resolve => {
    const text = nasaData.title + nasaData.explanation;
    const document = {
      content: text,
      type: 'PLAIN_TEXT'
    };

    // TODO: add limit to Google response
    client
      .analyzeEntities({document})
      .then(results => {
        const entities = results[0].entities;
        const numberOfEntityExamples = entities.length > 3 ? 3 : entities.length;
        for(let i = 0; i < numberOfEntityExamples; i++){
          let nlp_data = 'nlp_data' + i;
          apiData[nlp_data] = {
            'name': entities[i].name,
            'salience': entities[i].salience
          }
        }
        return resolve(entities);
      })
      .catch(error => {
        console.log("error with call to Google API", error)
      })
    })
}

function spotifyGetCredentials(textEntities) {
  console.log("in spotify creds");
  return new Promise(resolve => {
    const payload = `${SPOTIFY_ID}:${SPOTIFY_SECRET}`;
    const encodedPayload = new Buffer(payload).toString('base64');

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
      const token = response.data.access_token;
      return resolve(token);
    })
  })
}

function spotifyGetSong(token, entity, songIndex){
  let songSearchTerm = entity[songIndex].name;
  console.log("song,", songSearchTerm);
  let song = '';
  axios.get(`https://api.spotify.com/v1/search?q=${songSearchTerm}&type=track`, {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(response => {
    let songExists = false;
    if(response.data.tracks.items.length > 0 && 'album' in response.data.tracks.items[0]){
      songExists = true;
    }
    if(songExists){
      let trackInfo = response.data.tracks.items[0];
      let name = trackInfo.name;
      console.log("success! Track name from Spotify is", name);
      apiData.track_data = {
        'name': name,
        'album': trackInfo.album.name,
        'artist': trackInfo.artists[0].name,
        'uri': 'spotify:track:683hRieVmYdAhVA1DkjSAk',
        'song_available': 'true'
      }
      const content = JSON.stringify(apiData);
      writeToJsonFile(content);
      console.log("we got to this point, should return true");
    } else {
      console.log("the entity " + entity + "does not have a song in Spotify");
      if(songIndex >= entity.length){
        // no song available, use default song
        console.log("use default song!");
        let song = 'spotify:track:683hRieVmYdAhVA1DkjSAk';
        apiData.track_data = {
          'name': 'Space Jam',
          'album': 'Space Jam!',
          'artist': "Quad City DJ's",
          'uri': song,
          song_available: 'false'
        }
        const content = JSON.stringify(apiData);
        writeToJsonFile(content);
        resolve();
      }
      getSong(token, entity, songIndex++);
    }
  })
  .catch(error => {
    console.log("error! with call to Spotify!", error)
  })
}


function writeToJsonFile(content){
  fs.writeFile(file, content, function(err) {
    if(err){
      console.log("There was an error writing to file", err)
    }
  })
}

async function callAPI() {
  try {
    const nasaData = await nasaAPI();
    const googleData = await googleAPI(nasaData);
    const spotifyCreds = await spotifyGetCredentials(googleData);
    const spotifySong = await spotifyGetSong(spotifyCreds, googleData, 0);
    // console.log("here is nasaData======>", nasaData);
    // console.log("here is googleData-===>", googleData);
    // console.log("here is SpotifyCreds===>", spotifyCreds);
    console.log("here is SpotifySong===>", spotifySong);
  } catch(e) {
    console.log(e);
  }
}

module.exports.callAPI = callAPI;
