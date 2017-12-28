import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './track.css';

class Track extends Component {
  constructor(props){
    super(props);
  }



  render(){

    return (
      <div className="trackContainer" style={style.trackContainerStyle}>
        <iframe
          src={`https://embed.spotify.com/?uri=${this.props.trackUri}`}
          width='75'
          height='75'
          frameBorder='0'>
        å</iframe>
      </div>
    )
  }
}

Track.propTypes = {
  uri: PropTypes.string,
}

export default Track;
