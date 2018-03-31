import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InformationModal from '../InformationModal/InformationModal';
import Track from '../Track/Track';
import data from '../../../dailyData.json';
import '../../assets/fonts/_nasa.scss';
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
      isLoading: true
    }
    this.image = data.image_data.hdurl;
  }

  componentDidMount() {
    const backgroundImage = new Image();
    backgroundImage.src = this.image;

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
        `
      );
      // add this class to the actual black screen
      //this.backgroundImage.classList.add('fade-out');

      this.setState({
        isLoading: false
      });
    }
  }

  render() {
    return (
      <div style={{height: '100vh', backgroundColor: '#000'}}>
        <div ref={container => this.container = container} />
        {this.state.isLoading ? 'Space Jamz' :
          <div>
            <Track
              trackUri={this.state.trackUri}
              isLoading={this.props.isLoading}
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
              songAvailable={this.state.songAvailable}
          />
          </div>}
        <h1 style={{color: 'white', fontFamily: 'nasaFont'}}>Space Jamz</h1>
      </div>
    );
  }
}

export default Container;
