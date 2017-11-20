import React, { Component } from 'react';
import axios from 'axios';
import styles from '../styles.css';

// how to base64 encode my client ID and client secret

require('dotenv').config();

const SPOTIFY_ID = process.env.SPOTIFY_ID;
const SPOTIFY_SECRET = process.env.SPOTIFY_SECRET;

class Track extends Component {
  constructor(props){
    super(props);

    let authentication = 'Basic ' + new Buffer(`${SPOTIFY_ID}:${SPOTIFY_SECRET}`).toString('base64');
    let payload = {
      grant_type: 'client_credentials'
    }

    //let data = JSON.stringify("grant_type=client_credentials");

    //console.log(data);
    console.log(authentication);

    axios({
      url: 'https://accounts.spotify.com/api/token',
      method: 'post',
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Authorization': authentication,
        'Accept':'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
    })

    // fetch('https://accounts.spotify.com/api/token', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': authentication,
    //     'Content-Type' : 'application/x-www-form-urlencoded',
    //   },
    //   body: data
    // })
    .then((data) => {
      console.log(data);
    }).catch(function(error) {
      console.log('request failed', error)
    })
  }

  render(){
    return (
      <div className="trackContainer">
        Hello
      </div>
    )
  }
}


export default Track;
