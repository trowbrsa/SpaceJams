import React from 'react';
import './image.scss';
import PropTypes from 'prop-types';

const Image = props => {
  let backgroundImage = {
    background: `url(${props.image})`,
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    opacity: props.isLoading === true ? null : 0
  };

  return (
    <div>
      <img
        id="image"
        style={backgroundImage}
      />
    </div>
  );
};

Image.propTypes = {
  image: PropTypes.string,
};

export default Image;
