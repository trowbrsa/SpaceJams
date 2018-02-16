import React, { Component } from 'react';
import FirstTimeVisitorModal from '../FirstTimeVisitorModal/FirstTimeVisitorModal';
import './image.scss';
import '../FirstTimeVisitorModal/firstTimeVisitorModal.scss';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
  }



  render(){
    let backgroundImage = {
      background: 'url(' + this.props.image + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
    }

    return (
      <div>
        <img className="imageContainer" style={backgroundImage}/>
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
