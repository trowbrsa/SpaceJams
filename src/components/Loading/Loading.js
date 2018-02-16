import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './track.scss';

class Loading extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="loading">
        Loading SpaceJams
      </div>
    )
  }
}

export default Loading;
