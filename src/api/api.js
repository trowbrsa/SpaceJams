import axios from 'axios';
import dotenv from 'dotenv';
import jsonFile from 'jsonfile';

const cron = require('cron');
const language = require('@google-cloud/language');
const client = new language.LanguageServiceClient();
const file = './dailyData.json';

dotenv.config();

const NASA_API_KEY = process.env.NASA_KEY;
const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

let apiData = {
};

const callAPI = function() {
  axios.get(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(response => {
    if(response.status !== 200) {
      const error = new Error("error Calling NASA");
      throw(error);
    }
    let data = response.data;
    if(data.media_type !== 'image'){
      // make boolean in dailyData
      const error = new Error("No image available today");
      throw(error);
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
  .catch(error => console.log(error));
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
      const entities = results[0].entities;
      const numberOfEntityExamples = entities.length > 5 ? 5 : entities.length;
      for(let i = 0; i < numberOfEntityExamples; i++){
        let nlp_data = 'nlp_data' + i;
        apiData[nlp_data] = {
          'name': entities[i].name,
          'salience': entities[i].salience
        }
        jsonFile.writeFile(file, apiData);
      }
      return entities;
    })
    .then(entity => {
      callSpotifyApi(entity);
    })
    .catch(err => {
      console.error(err);
    });
};

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
      return new Promise(function(resolve) {
        let songSearchTerm = entity.name;
        let song = '';
        axios.get(`https://api.spotify.com/v1/search?q=${songSearchTerm}&type=track`, {
          headers: { 'Authorization': 'Bearer ' + token }
        })
        .then(response => {
          if(response.data.tracks.items.length > 0){
            if('album' in response.data.tracks.items[0]){
              let trackInfo = response.data.tracks.items[0];
              let name = trackInfo.name;
              console.log("success! Track name from Spotify is", name);
              let album = trackInfo.album.name;
              let artist = trackInfo.artists[0].name;
              let uri = trackInfo.uri;
              apiData.track_data =
                {
                  'name': name,
                  'album': album,
                  'artist': artist,
                  'uri': uri,
                  'song_available': 'true'
                }

              jsonFile.writeFile(file, apiData);
              return resolve();
            }
          }
          song = 'spotify:track:683hRieVmYdAhVA1DkjSAk';
          apiData.track_data =
            {
              'name': 'Space Jam',
              'album': 'Space Jam!',
              'artist': "Quad City DJ's",
              'uri': song,
              song_available: 'false'
            }
          console.log("use default song!");
          jsonFile.writeFile(file, apiData);
          return reject(song);
        })
        .catch(error => {
          console.log("Error with Spotify", error);
        })
      })
    }
    processedData.find(getSong);
  })
}


let job = new cron.CronJob({
  cronTime: '00 30 1 * * 1-7',
  onTick(){
    callAPI();
  },
  start: true,
  timeZone: 'America/Los_Angeles'
});

const main = () => {
  job.start();
  callAPI();
}

export { main };
