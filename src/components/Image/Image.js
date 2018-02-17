import React, { Component } from 'react';
import FirstTimeVisitorModal from '../FirstTimeVisitorModal/FirstTimeVisitorModal';
import './image.scss';
import Loading from '../Loading/Loading';
import PropTypes from 'prop-types';

class Image extends Component {
  constructor(props){
    super(props);
    this.state = {loading: true};
  }

  render(){
    let backgroundImage = {
      background: 'url(' + this.props.image + ')',
      backgroundPosition: 'center center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover',
      opacity: this.state.loading === true ? null : 0
    }
    const isLoading = this.state.loading;
    return (
      <div>
        {isLoading && <Loading />}
        <div>
          <img
            id="image"
            style={backgroundImage}
            onLoad={(e) => {this.setState({loading: false});}}
          />
        </div>
      </div>
    )
  }
}

Image.propTypes = {
  image: PropTypes.string
}

export default Image;
