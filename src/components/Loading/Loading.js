import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './loading.scss';
import spaceFont from '../../../public/space_age.ttf';

class Loading extends Component {

  render(){
    return (
      <div className="loading">
        <div style={{ fontFamily: spaceFont}}>
          <p>SpaceJamz</p>
        </div>
      </div>
    )
  }
}

export default Loading;
