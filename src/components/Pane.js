import React from 'react';
import PropTypes from 'prop-types';

// adapted from https://toddmotto.com/creating-a-tabs-component-with-react/
class Pane extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default Pane;
