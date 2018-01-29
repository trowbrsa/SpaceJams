import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstTimeVisitorModal from './FirstTimeVisitorModal';
import Image from './Image';
import InformationModal from './InformationModal'
import Track from './Track';
import data from '../../dailyData.json';

class App extends Component {
  constructor(){
    super();

    this.state = {
      songAvailable: data.songAvailable,
      image: data.image_data.hdurl,
      imageTitle: data.image_data.title,
      explanation: data.image_data.explanation,
      copyright: data.image_data.copyright,
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
      nlpresult3Salience: data.nlp_data3.salience,
      takenTour: false,
    }
  }

  componentDidMount(){
    // if (localStorage.getItem("takenTour") !== null) {
    //   this.setState({
    //     takenTour: true
    //   })
    // }
    // localStorage.setItem("takenTour", true);
  }

  render(){

    return(
      <div>
        {!this.state.takenTour &&
        <FirstTimeVisitorModal />}
        {!this.state.songAvailable &&
         <h1>Song is not available!</h1>
        }
        <Track
          trackUri={this.state.trackUri}
        />
       <InformationModal
          imageTitle={this.state.imageTitle}
          imageExplanation={this.state.explanation}
          copyright={this.state.copyright}
          trackName={this.state.trackName}
          trackArtist={this.state.trackArtist}
          trackAlbum={this.state.trackAlbum}
          show={this.state.isModalOpen}
          nlpData0Name={this.state.nlpResult0Name}
          nlpData0Salience={this.state.nlpResult0Salience}
          nlpData1Name={this.state.nlpResult1Name}
          nlpData1Salience={this.state.nlpResult1Salience}
          nlpData2Name={this.state.nlpResult2Name}
          nlpData2Salience={this.state.nlpResult2Salience}
          nlpData3Name={this.state.nlpResult2Name}
          nlpData3Salience={this.state.nlpResult3Salience}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
