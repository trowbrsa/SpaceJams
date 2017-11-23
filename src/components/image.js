import React, { Component } from 'react';
import styles from '../styles.css';

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

export default Image;
