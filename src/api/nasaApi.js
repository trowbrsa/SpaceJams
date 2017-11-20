// require('dotenv').config();
//
// let api_key = process.env.NASA_KEY;
//
// function checkStatus(response) {
//   if (response.status >= 200 && response.status < 300) {
//     return response
//   } else {
//     var error = new Error(response.statusText)
//     error.response = response
//     throw error
//   }
// }
//
// function parseJSON(response) {
//   return response.json()
// }
//
// fetch(`https://api.nasa.gov/planetary/apod?api_key=${api_key}`)
//   .then(checkStatus)
//   .then(parseJSON)
//   .then(function(data) {
//     console.log('request succeeded with JSON response', data)
//   }).catch(function(error) {
//     console.log('request failed', error)
//   })
