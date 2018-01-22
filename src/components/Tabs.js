import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Tab} from './Tab';
import {style} from './tabs.css';
// adapted from https://medium.com/trisfera/a-simple-react-tabs-component-47cac2cfbb5

class Tabs extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTabIndex: this.props.defaultActiveTabIndex
    };
    this.handleTabClick = this.handleTabClick.bind(this);
  }

    // Toggle currently active tab
    handleTabClick(tabIndex) {
      this.setState({
          activeTabIndex: tabIndex === this.state.activeTabIndex ? this.props.defaultActiveTabIndex : tabIndex
        });
    }

    // Encapsulate <Tabs/> component API as props for <Tab/> children
    renderChildrenWithTabsApiAsProps() {
      return React.Children.map(this.props.children, (child, index) => {
        return React.cloneElement(child, {
          onClick : this.handleTabClick,
          tabIndex: index,
          isActive: index === this.state.activeTabIndex
        });
      });
    }

    // Render current active tab content
    renderActiveTabContent() {
      const {children} = this.props;
      const {activeTabIndex} = this.state;
      if(children[activeTabIndex]) {
        return children[activeTabIndex].props.children;
      }
    }

    render() {

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

      const closeModal = {
        position: 'absolute',
        top: 5,
        right: 5,
        filter: 'invert(50%)',
      };

      return (
        <div className="tabs">
          <ul className="tabs-nav nav navbar-nav navbar-left">
            <div
              className="modal"
              style={modalStyle}
            >
            <div className="popover">
              <Tab />
              <Tab />
            </div>
          </div>
          </ul>
        </div>
      );
    }
};

export default Tabs;
