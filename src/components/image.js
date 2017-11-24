import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="imageContainer">
        <h3><img src={this.props.image}/></h3>
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
