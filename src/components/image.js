import React, { Component } from 'react';
require('dotenv').config();

const API_KEY = process.env.NASA_KEY;

class Image extends Component {
  constructor(props){
    super(props);

    this.state = {
      image: {
              'copyright': 'blank',
              'date': 'blank',
              'explanation': 'blank',
              'title': 'blank',
              'url': 'blank'
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
        // let prevState = this.state.image;
        // prevState['title'] = data.title;
        // this.setState(prevState => ({
        //   image: {
        //     ...prevState,
        //     date: data.date
        //   };
        // }));

        let image = Object.assign({}, this.state.image);
        image.date = data.date;
        this.setState({image});
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
