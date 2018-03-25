import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './loading.scss';
import '../../assets/fonts/_nasa.scss';

class Loading extends Component {

  render(){
    return (
      <div className="loading">
        <h1 style={{ fontFamily: 'nasaFont' }}>Space Jamz</h1>
      </div>
    )
  }
}

export default Loading;
