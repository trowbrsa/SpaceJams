import React, { Component } from 'react';
import FirstTimeVisitorModal from '../FirstTimeVisitorModal/FirstTimeVisitorModal';
import './image.scss';
import Loading from '../Loading/Loading';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.setLoadedBackground
  }

  render(){
    let backgroundImage = {
      background: 'url(' + this.props.image + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      opacity: this.props.isLoading === true ? null : 0
    }
    // is loading AND time has been greater than or equal to 5 seconds.
    return (
      <div>
        <img
          id="image"
          style={backgroundImage}
          onLoad={(e) => componentDidMount()}
        />
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
