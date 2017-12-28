import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './track.css';

class Track extends Component {
  constructor(props){
    super(props);
  }



  render(){

    return (
      <div className="trackContainer" style={trackContainerStyle}>
        <iframe src={`https://embed.spotify.com/?uri=${this.props.trackUri}`} width='75' height='75' frameBorder='0'></iframe>
      </div>
    )
  }
}

Track.propTypes = {
  trackUri: PropTypes.string,
}

export default Track;
