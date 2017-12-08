import React from 'react';
import PropTypes from 'prop-types';
import closeIcon from '../../public/ic_close_white_24dp_2x.png';

class InformationModal extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      popupVisible: false
    };
  }

  handleClick() {
    if (!this.state.popupVisible) {
      // attach/remove event handler
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
       popupVisible: !prevState.popupVisible,
    }));
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  render() {
    if(!this.props.show) {
      return null;
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

    const modalStyle = {
      backgroundColor: 'rgba(0,0,0,0.5)',
      borderRadius: 5,
      maxWidth: 500,
      minHeight: 300,
      margin: '0 auto',
      padding: 30,
      position: 'relative',
    };

    const closeModal = {
      position: 'absolute',
      top: 5,
      right: 5,
      filter: 'invert(50%)',
    };

    return (
        <div
          className="modal"
          style={modalStyle}
          ref={ node => {this.node = node; }}
          onClick={this.handleClick}
        >
              <div className="popover">
                <div>
                  {this.props.imageTitle}
                </div>
                <div>
                  {this.props.imageExplanation}
                </div>
                <div>
                  {this.props.nlpData0Name}
                </div>
                {this.props.nlpData0Salience}
              </div>
        </div>
    );
  }
}

InformationModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node
};



export default InformationModal;
