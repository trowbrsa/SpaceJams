import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './tab.css';
// adapted from https://medium.com/trisfera/a-simple-react-tabs-component-47cac2cfbb5

class Tab extends Component {

  constructor(props, context){
    super(props, context);
    this.handleTabClick = this.handleTabClick.bind(this);
  }

  handleTabClick(event){
    event.preventDefault();
    this.props.onClick(this.props.tabIndex);
  }

  render(){

    const popoverHeader = {
      fontSize: 25,
      paddingBottom: 0.6 + 'em',
    };

    return (
      <div>
        <li className="tab">
          <a className={`tab-link ${this.props.linkClassName} ${this.props.isActive ? 'active' : ''}`}
            onClick={this.handleTabClick}>
            <i className={`tab-icon ${this.props.iconClassName}`}/>
          </a>
        </li>
      </div>
    )
  }
}

export default Tab;
