import React, { Component } from 'react';
import styles from '../styles.css';

require('dotenv').config();

const API_KEY = process.env.NASA_KEY;

class Image extends Component {
  constructor(props){
    super(props);

    this.state = { image: {} };

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
        let prevState = this.state.image;
        this.setState(prevState => ({
          image: {
            ...prevState,
            title: data.title,
            date: data.date,
            copyright: data.copyright,
            explanation: data.explanation,
            hdurl: data.hdurl,
            url: data.url,
          }
        }));
        console.log(data);
      }).catch(function(error) {
        console.log('request failed', error)
      })
    }

  render(){
    return (
      <div className="imageContainer">
        <h3><img src={this.state.image.hdurl}/></h3>
        <h1>{this.state.image.title}</h1>
        <h3>{this.state.image.date}</h3>
        <p>{this.state.image.explanation}</p>
        <p>{this.state.image.copyright}</p>
      </div>
    )
  }
}

export default Image;
