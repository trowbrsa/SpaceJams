import React, { Component } from 'react';
import styles from '../styles.css';

class Track extends Component {
  constructor(props){
    super(props);
    let track = this.props.track;
  };

  render(){
    return (
      <div className="trackContainer">
        <iframe src={`https://embed.spotify.com/?uri=${this.props.track}`} width='75' height='200' frameBorder='0' allowtransparency='true'></iframe>
      </div>
    )
  }
}

export default Track;
