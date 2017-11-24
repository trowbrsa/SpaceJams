import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Track extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="trackContainer">
        <iframe src={`https://embed.spotify.com/?uri=${this.props.track}`} width='75' height='200' frameBorder='0'></iframe>
      </div>
    )
  }
}

Track.propTypes = {
  track: PropTypes.string
}

export default Track;
