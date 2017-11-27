import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/Image';
import Track from './components/Track';
import InformationIcon from './components/InformationIcon';
import InformationModal from './components/InformationModal'
import data from '../dailyData.json';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      image: data.image_data.hdurl,
      track: data.track_data,
      isModalOpen: false,
    }
  }

  toggleModal = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }


  render(){
    return(
      <div>
        <Image image={this.state.image}/>
        <button className='informationModal'
          onClick={this.toggleModal}>
          Learn more
        </button>
        <Track track={this.state.track}/>
       <InformationModal
        show={this.state.isModalOpen}
        onClose={this.toggleModal} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
