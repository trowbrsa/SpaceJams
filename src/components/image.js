import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

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
