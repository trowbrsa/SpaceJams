import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// adapted from https://medium.com/trisfera/a-simple-react-tabs-component-47cac2cfbb5


export const Tab = (props) => {

  const popoverHeader = {
    fontSize: 25,
    paddingBottom: 0.6 + 'em',
  };

  return (
    <div>
      <li className="tab">
        <a className={`tab-link ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
          onClick={(event) => {
            event.preventDefault();
            props.onClick(props.tabIndex);
          }}>
          <i className={`tab-icon ${props.iconClassName}`}/>
        </a>
      </li>
      <div className="popoverHeader" style={popoverHeader}>
        Image Title - will be a prop
      </div>
      <div>
        Image Description - will be a prop
      </div>
        <div className="trackInfo">
          Track Name: Test - will be a prop someday
          Artist: Test - will be a prop someday
          Album: Test - will be a prop someday
        </div>
    </div>
  )
}
