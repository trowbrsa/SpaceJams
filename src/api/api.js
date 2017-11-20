const language = require('@google-cloud/language');
const fetch = require('node-fetch');
const client = new language.LanguageServiceClient();
require('dotenv').config();

const NASA_API_KEY = process.env.NASA_KEY;

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
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
  .then(checkStatus)
  .then(parseJSON)
  .then((data) => {
    console.log(data);
    console.log("now calling NLP");
    callNLPLibrary();
  }).catch(function(error) {
      console.log('request failed', error)
    })
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

const main = function() {
  callAPI();
}

export { main };
