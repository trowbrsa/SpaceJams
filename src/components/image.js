import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.css';

class Image extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="imageContainer">
        <img src={this.props.image}/>
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
