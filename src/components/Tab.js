import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// adapted from https://medium.com/trisfera/a-simple-react-tabs-component-47cac2cfbb5


export const Tab = (props) => {
  return (
    <li className="tab">
      <a className={`tab-link ${props.linkClassName} ${props.isActive ? 'active' : ''}`}
        onClick={(event) => {
          event.preventDefault();
          props.onClick(props.tabIndex);
        }}>
        <i className={`tab-icon ${props.iconClassName}`}/>
      </a>
    </li>
  )
}
