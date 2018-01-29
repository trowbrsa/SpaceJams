import React, { Component } from 'react';
import './image.scss';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <img className="imageContainer" src={this.props.image}/>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
