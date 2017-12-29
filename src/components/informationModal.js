import React from 'react';
import PropTypes from 'prop-types';
import style from './informationModal.css';
import closeIcon from '../../public/ic_close_white_24dp_2x.png';
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
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  handleOutsideClick(e){
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

    const popoverHeader = {
      fontSize: 25,
      paddingBottom: 0.6 + 'em',
    }

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
            <div
              className="modal"
              style={modalStyle}
              >
              <div className="popover">
                <div className="popoverHeader" style={popoverHeader}>
                  {this.props.imageTitle}
                </div>
                <div>
                  {this.props.imageExplanation}
                </div>
                <div className="trackInfo">
                  Track Name: {this.props.trackName}
                  Artist: {this.props.trackArtist}
                  Album: {this.props.trackAlbum}
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
    );
  }
}


export default InformationModal;
