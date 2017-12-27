import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './track.css';

class Track extends Component {
  constructor(props){
    super(props);
  }



  render(){

    return (
      <div className="trackContainer">
        <iframe src={`https://embed.spotify.com/?uri=${this.props.track}`} width='200' height='75' transition='width 2s' frameBorder='0'></iframe>
      </div>
    )
  }
}

Track.propTypes = {
  track: PropTypes.string
}

export default Track;
