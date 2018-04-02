import React from 'react';
import PropTypes from 'prop-types';
import './track.scss';

class Track extends React.Component {
  constructor(props){
    super(props);
    
    console.log("these are track props", props.trackUri)
  }
  
  render(){
    return(
      <div className="trackContainer">
        <iframe
          src={`https://embed.spotify.com/?uri=${this.props.trackUri}`}
          width="300"
          height="75"
          frameBorder="0" />
      </div>
    );
  }
}

Track.propTypes = {
  trackUri: PropTypes.string
};

export default Track;
