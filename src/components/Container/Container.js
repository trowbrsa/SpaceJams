import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../Loading/Loading';
import Loaded from '../Loaded/Loaded';

class Container extends Component {
  constructor(props){
    super(props);

    this.setLoadedBackground = this.setLoadedBackground.bind(this);

    this.state = {
      isLoading: true,
    }
  }

  setLoadedBackground(e){
    //  e.preventDefault();
    console.log("in set Loaded Background method")
    this.setState({
      isLoading: false
    })
  }

  render(){

    const isLoading = this.state.isLoading;

    // while image is loading, isLoading evaluates to true. So
    // long as image is loading, opacity remains at zero.
    // When image loads, opacity updates to 1.
    return(
      <div>
        {isLoading && <Loading />}
        <Loaded
          setLoadedBackground = {this.setLoadedBackground}
          isLoading = {this.state.isLoading}
        />
      </div>
    );
  }
}

export default Container;
