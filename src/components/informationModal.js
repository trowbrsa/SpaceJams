import React from 'react';
import PropTypes from 'prop-types';
import style from './informationModal.css';
import closeIcon from '../../public/ic_close_white_24dp_2x.png';
import onClickOutside from "react-onclickoutside";

class InformationModal extends React.Component {
  constructor(props){
    super(props);

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal = (evt) => {
    evt.preventDefault();
    // set state of parent component
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  handleClickOutside = evt => {
    console.log("handle it!");
    this.toggleModal(evt);
  };

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
          className="modal"
          style={modalStyle}>
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
    );
  }
}

InformationModal.propTypes = {
  show: PropTypes.bool,
  children: PropTypes.node
};


export default onClickOutside(InformationModal);
