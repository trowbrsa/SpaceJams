import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InformationModal from '../InformationModal/InformationModal';
import Track from '../Track/Track';
import data from '../../../dailyData.json';
import style from './container.scss';

class Container extends Component {
  constructor(props){
    super(props);

    this.state = {
      image: data.image_data.hdurl,
      imageTitle: data.image_data.title,
      explanation: data.image_data.explanation,
      copyright: data.image_data.copyright,
      trackUri: data.track_data.uri,
      trackName: data.track_data.name,
      trackAlbum: data.track_data.album,
      trackArtist: data.track_data.artist,
      songAvailable: data.track_data.song_available,
      isModalOpen: false,
      nlpResult0Name: data.nlp_data0.name,
      nlpResult0Salience: data.nlp_data0.salience,
      nlpResult1Name: data.nlp_data1.name,
      nlpResult1Salience: data.nlp_data1.salience,
      nlpResult2Name: data.nlp_data2.name,
      nlpResult2Salience: data.nlp_data2.salience,
      nlpResult3Name: data.nlp_data3.name,
      nlpresult3Salience: data.nlp_data3.salience,
      loaded: false
    }
    this.image = data.image_data.hdurl;
  }

  componentDidMount() {
    const backgroundImage = new Image();
    backgroundImage.src = this.image;
    backgroundImage.opacity = 0;

    backgroundImage.onload = () => {
      this.container.setAttribute(
        'style',
        `
          background: #000 url('${this.image}') no-repeat center center;
          background-size: cover;
          background-attachment: fixed;
          min-height: 100%;
          min-width: 1024px;
          width: 100%;
          height: auto;
          position: fixed;
          opacity: 1;
          transition: opacity 10s ease-in;
          visibility: visible;
        `
      );
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    return (
      <div className='wrapper'>
        <div className='intro-text'>Space Jamz</div>
        <div 
          ref={container => this.container = container} 
          className='hide-until-loaded'>
        </div>
        <div>
          <Track
            loaded={this.state.loaded}
            trackUri={this.state.trackUri}
          />
          <InformationModal
            loaded={this.state.loaded}
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
            songAvailable={this.state.songAvailable}
        />
        </div>
    </div>
    );
  }
}

export default Container;
