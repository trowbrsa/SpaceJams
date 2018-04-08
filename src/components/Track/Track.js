import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';

class Track extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
        <div className={this.props.loaded ? 'track-container' : 'track-container-hidden'}>
      </div>
    );
  }
}

Track.propTypes = {
  trackUri: PropTypes.string
};

export default Track;
