import React, { Component } from 'react';
import styles from '../styles.css';

class Track extends Component {
  constructor(props){
    super(props);

  }

  render(){
    return (
      <div className="trackContainer">
        <iframe src='https://embed.spotify.com/?uri=spotify%3Aalbum%3A2DCzgO12HyMeGxoQlbtvQV' width='75' height='200' frameborder='0' allowtransparency='true'></iframe>
      </div>
    )
  }
}

export default Track;
