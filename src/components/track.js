import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Track extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const trackContainerStyle = {
      position: 'fixed',
      bottom: 0,
      left: 0,
    };

    return (
      <div className="trackContainer" style={trackContainerStyle}>
        <iframe src={`https://embed.spotify.com/?uri=${this.props.track}`} width='250' height='75' frameBorder='0'></iframe>
      </div>
    )
  }
}

Track.propTypes = {
  track: PropTypes.string
}

export default Track;
