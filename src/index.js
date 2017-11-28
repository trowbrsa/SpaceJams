import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/Image';
import Track from './components/Track';
import InformationModal from './components/InformationModal'
import data from '../dailyData.json';

class App extends Component {
  constructor(){
    super();

    this.state = {
      image: data.image_data.hdurl,
      track: data.track_data,
      isModalOpen: false,
    }

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render(){
    
    const informationModalStyle = {
      position: 'fixed',
      bottom: '8px',
      right: 0,
      marginBottom: 5,
    }

    return(
      <div>
        <Image image={this.state.image}/>
        <button className='informationModal' style={informationModalStyle} onClick={this.toggleModal}>
          Learn more
        </button>
        <Track track={this.state.track}/>
       <InformationModal
        show={this.state.isModalOpen}
        onClose={this.toggleModal} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
