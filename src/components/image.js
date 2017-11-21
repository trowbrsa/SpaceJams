import React, { Component } from 'react';
import styles from '../styles.css';
import data from '../../dailyData.json';

class Image extends Component {
  constructor(props){
    super(props);
    this.state = {
      image: data.image_data.hdurl
    };

  }
  render(){
    return (
      <div className="imageContainer">
        <h3><img src={this.state.image}/></h3>
      </div>
    )
  }
}

export default Image;
