import React, { Component } from 'react';
import './image.scss';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      loaded: false
    };
  }
  
  onLoad() {
    this.setState({loaded: true});
  }
  
  render() {
    let backgroundImage = {
      background: `url(${this.props.image})`,
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      opacity: this.state.loaded ? 0 : 1
    };
    
    return (
      <div>
        <img
          id="image"
          style={backgroundImage}
          onLoad={this.props.onLoad}
        />
      </div>
    );
  }
}

Image.propTypes = {
  image: PropTypes.string,
};

export default Image;
