import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './Image';
import Track from './Track';
import InformationModal from './InformationModal'
import data from '../../dailyData.json';

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
        <span className='informationModal' style={informationModalStyle}
          onClick={this.toggleModal}>
          <img src={require('../../public/ic_info_black_24dp_2x.png')} />
        </span>
        <Track track={this.state.track}/>
       <InformationModal
        show={this.state.isModalOpen}
        onClose={this.toggleModal} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
