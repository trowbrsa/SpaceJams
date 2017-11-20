import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image';
import Track from './components/track';

//Imports the Google Cloud client library
// const language = require('@google-cloud/language');
//
// // Instantiates a client
// const client = new language.LanguageServiceClient();
//
// // The text to analyze
// const text = 'Space Jams';
//
// const document = {
//   content: text,
//   type: 'PLAIN_TEXT',
// };
//
// // Detects the sentiment of the text client
// client.analyzeSentiment({document: document})
//   .then(results => {
//     const sentiment = results[0].documentSentiment;
//
//     console.log(`Text: ${text}`);
//     console.log(`Sentiment score: ${sentiment.score}`);
//     console.log(`Sentiment magnitude: ${sentiment.magnitude}`);
//   })
//   .catch(err => {
//     console.error('ERROR:', err);
//   });

class App extends Component {
  render(){
    return(
      <div>
       a plain hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
