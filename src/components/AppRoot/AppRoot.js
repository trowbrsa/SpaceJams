import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from '../Image/Image';
import InformationModal from '../InformationModal/InformationModal';
import Loading from '../Loading/Loading';
import Loaded from '../Loaded/Loaded';
import Track from '../Track/Track';
import data from '../../../dailyData.json';

class AppRoot extends Component {
  constructor(props){
    super(props);

    this.setLoadedBackground = this.setLoadedBackground.bind(this);

    this.state = {
      isLoading: true,
    }
  }

  setLoadedBackground(e){
    e.preventDefault();
    console.log("in set Loaded Background method")
    this.setState({
      isLoading: false
    })
  }

  render(){

    const isLoading = this.state.isLoading;

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

export default AppRoot;
