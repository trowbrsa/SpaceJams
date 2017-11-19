import React, { Component } from 'react';
require('dotenv').config();

const API_KEY = process.env.NASA_KEY;

class Image extends Component {
  constructor(props){
    super(props);

    this.state = {
      image: {

            }
    };

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

    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then(checkStatus)
      .then(parseJSON)
      .then((data) => {
        // spread operator needs plugin to work
        let prevState = this.state.image;
        // prevState['title'] = data.title;
        this.setState(prevState => ({
          image: {
            ...prevState,
            title: data.title,
            date: data.date,
            copyright: data.copyright,
            explanation: data.explanation,
            url: data.hdurl,
          }
        }));
        console.log(data)
      }).catch(function(error) {
        console.log('request failed', error)
      })
  }

  render(){
    return (
      <div className="imageContainer">
        {this.state.image.date}
      </div>
    )
  }
}

export default Image;
