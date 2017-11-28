import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
  }

  render(){

    const imageContainerStyle = {
      minHeight: '100%',
      minWidth: '1024px',
      width: '100%',
      height: 'auto',
      position: 'fixed',
      top: 0,
      left: 0,
    };

    return (
      <img className="imageContainer" style={imageContainerStyle} src={this.props.image}/>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
