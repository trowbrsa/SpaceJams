import React, { Component } from 'react';
import styles from '../styles.css';

class Image extends Component {
  constructor(props){
    super(props);

  }
  render(){
    return (
      <div className="imageContainer">
        <h3><img src={this.state.image.hdurl}/></h3>
        <h1>{this.state.image.title}</h1>
        <h3>{this.state.image.date}</h3>
        <p>{this.state.image.explanation}</p>
        <p>{this.state.image.copyright}</p>
      </div>
    )
  }
}

export default Image;
