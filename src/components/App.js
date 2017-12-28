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
      imageTitle: data.image_data.title,
      explanation: data.image_data.explanation,
      trackUri: data.track_data.uri,
      trackName: data.track_data.name,
      trackAlbum: data.track_data.album,
      trackArtist: data.track_data.artist,
      isModalOpen: false,
      nlpResult0Name: data.nlp_data0.name,
      nlpResult0Salience: data.nlp_data0.salience,
      nlpResult1Name: data.nlp_data1.name,
      nlpResult1Salience: data.nlp_data1.salience,
      nlpResult2Name: data.nlp_data2.name,
      nlpResult2Salience: data.nlp_data2.salience,
      nlpResult3Name: data.nlp_data3.name,
      nlpresult3Salience: data.nlp_data3.salience
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
        />
       <InformationModal
        imageTitle={this.state.imageTitle}
        imageExplanation={this.state.explanation}
        trackName={this.state.trackName}
        trackArtist={this.state.trackArtist}
        trackAlbum={this.state.trackAlbum}
        show={this.state.isModalOpen}
        nlpData0Name={this.state.nlpResult0Name}
        nlpData0Salience={this.state.nlpResult0Salience}
        nlpData1Name={this.state.nlpData1}
        nlpData1Salience={this.state.nlpResult1Salience}
        nlpData2Name={this.state.nlpData2}
        nlpData2Salience={this.state.nlpResult2Salience}
        nlpData3Name={this.state.nlpData3}
        nlpData3Salience={this.state.nlpResult3Salience}
        onClose={this.toggleModal} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
