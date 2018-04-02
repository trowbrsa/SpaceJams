import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';

class Track extends React.Component {
  constructor(props){
    super(props);
  }
  
  componentDidUpdate(){
    console.log("this is this", this)
  };

  render(){
    return(
        <div className={this.props.loaded ? 'track-container-visible' : 'track-container-hidden'}>
        <iframe
          src={`https://embed.spotify.com/?uri=${this.props.trackUri}`}
          width="300"
          height="75"
          frameBorder="0"
         />
      </div>
    );
  }
}

Track.propTypes = {
  trackUri: PropTypes.string
};

export default Track;
