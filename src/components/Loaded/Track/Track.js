import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';

const Track = props => (
  <div className="trackContainer">
    <iframe
      src={`https://embed.spotify.com/?uri=${props.trackUri}`}
      width="300"
      height="75"
      frameBorder="0" />
  </div>
);

Track.propTypes = {
  trackUri: PropTypes.string
};

export default Track;
