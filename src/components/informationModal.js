import React from 'react';
import PropTypes from 'prop-types';
import style from './informationModal.css';
import closeIcon from '../../public/ic_close_white_24dp_2x.png';
import Tabs from './Tabs.js';
import icon from '../../public/ic_info_black_24dp_2x.png';

class InformationModal extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      modalVisible: false
    };
  }

  handleClick() {
    if(!this.state.modalVisible){
      "modal is not visible"
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      console.log("modal is visble")
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  handleOutsideClick(e){
    console.log("handling outside click")
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  render() {

    const informationModalStyle = {
      position: 'fixed',
      bottom: '1px',
      right: 0,
    }

    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 50,
    };


    return (
      <div
        className="modal-wrapper"
        ref={node => {this.node = node;}}
      >
        <div>
          <span className='informationModal' style={informationModalStyle}
            onClick={this.handleClick}>
            <img src={icon} alt="more info" />
          </span>
          {this.state.modalVisible && (
            <div>
              <Tabs />
            </div>

          )}
      </div>
    </div>
    );
  }
}


export default InformationModal;
