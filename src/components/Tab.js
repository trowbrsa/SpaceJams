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

    const modalStyle = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      position: 'relative',
      color: 'white',
      lineHeight: 1.5,
      fontFamily: 'Arial',
      letterSpacing: 1.7,
    };

    const popoverHeader = {
      fontSize: 25,
      paddingBottom: 0.6 + 'em',
    };

    return (
        <li className="tab">
          <div className="modal" style={modalStyle}>
            <a className={`tab-link ${this.props.linkClassName} ${this.props.isActive ? 'active' : ''}`}
              onClick={this.handleTabClick}>
              <i className={`tab-icon ${this.props.iconClassName}`}/>
            </a>
          </div>
        </li>
    )
  }
}

export default Tab;
