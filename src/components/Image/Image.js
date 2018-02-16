import React, { Component } from 'react';
import FirstTimeVisitorModal from '../FirstTimeVisitorModal/FirstTimeVisitorModal';
import './image.scss';
import '../FirstTimeVisitorModal/firstTimeVisitorModal.scss';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
  }

  componentDidMount(){
    let img = document.getElementById("image");
    img.onload = function(){
      console.log("it has truly loaded");
    }
    // img.addEventListener('load', function() {console.log("it loaded")})

    if(img.complete){
      console.log("it already loaded");
      img.load();
    } else {
      console.log("not complete?");
    }
  }


  handleImageLoaded() {
    console.log("loaded image!");
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
        <img
          id="image"
          style={backgroundImage}
          onLoad={this.handleImageLoaded.bind(this)}
        />
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
