import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loading from '../Loading/Loading';
import InformationModal from '../InformationModal/InformationModal';
import Track from '../Track/Track';
import data from '../../../dailyData.json';
import Loaded from '../Loaded/Loaded';

/// import dailyData here and then write function that grabs background image 
// and sets image as background image when it's loaded and sets this.state.isLoaded = false when its done
// set background image on container 

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {
      isLoading: true
    };

    this.image = data.image_data.hdurl;
  }
  
  componentDidMount() {
    const backgroundImage = new Image();
    backgroundImage.src = this.image;
    
    backgroundImage.onload = () => {
      this.container.setAttribute(
        'style',
        `
          height: 100%;
          background: #000 url('${this.image}') no-repeat center;
          background-size: cover;
        `
      );
      
      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div style={{height: '100vh', backgroundColor: '#000'}}>
        <div ref={container => this.container = container} />
        
        
        {this.state.isLoading ? 'Space Jamz' : <div> <Track /> <InformationModal /> </div>}
        <div>Space Jamz</div>
      </div>
    );
  }
}

export default Container;
