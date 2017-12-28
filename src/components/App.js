import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';
import Track from './Track';
import InformationModal from './InformationModal'
import data from '../../dailyData.json';
import icon from '../../public/ic_info_black_24dp_2x.png';

class App extends Component {
  constructor(){
    super();

    this.state = {
      image: data.image_data.hdurl,
      trackUri: data.track_data.uri,
      trackName: data.track_data.name,
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
      bottom: '1px',
      right: 0,
    }

    return(
      <div>
        <Image image={this.state.image}/>
        <span className='informationModal' style={informationModalStyle}
          onClick={this.toggleModal}>
          <img src={icon} alt="more info" />
        </span>
        <Track
          trackUri={this.state.trackUri}
          trackName={this.state.trackName}
        />
       <InformationModal
        show={this.state.isModalOpen}
        onClose={this.toggleModal} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
