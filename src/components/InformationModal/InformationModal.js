import React from 'react';
import PropTypes from 'prop-types';

import './informationalModal.scss';
import closeIcon from '../../../public/ic_close_white_18dp_2x.png';
import icon from '../../../public/ic_info_black_24px.svg';
import spaceFont from '../../../public/space_age.ttf';

class InformationModal extends React.Component {
  constructor(props){
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      modalVisible: false,
      selectedOption: 'tab1'
    };
  }

  handleClick() {
    if(!this.state.modalVisible){
      document.addEventListener('click', this.handleOutsideClick, false);
    } else {
      document.removeEventListener('click', this.handleOutsideClick, false);
    }
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
    }));
  }

  handleOutsideClick(e){
    if (this.node.contains(e.target)) {
      return;
    }
    this.handleClick();
  }

  handleChange(changeEvent){
    this.setState({
      selectedOption: changeEvent.target.value
    })
  }

  render() {
    let hideWhileLoading = {
      opacity: this.props.isLoading === true ? null : 0
    }
    return (
      <div
        className="modal-wrapper"
        ref={node => {this.node = node;}}>
        <span className='informationIcon' onClick={this.handleClick}>
          <img
            src={icon}
            alt="more info"
            style={hideWhileLoading}
          />
        </span>
        {this.state.modalVisible && (
          <div className="modal">
            <span className='closeIcon'
              onClick={this.handleClick}>
              <img src={closeIcon} alt="close modal" />
            </span>
            <div>
              <h1>Space Jamz</h1>
              <input id="tab1" type="radio" value="tab1"
                     onChange={this.handleChange}
                     checked={this.state.selectedOption === 'tab1'} />
              <label htmlFor="tab1">Image Info</label>

              <input id="tab2" type="radio" value="tab2"
                    onChange={this.handleChange}
                    checked={this.state.selectedOption === 'tab2'}/>
                  <label htmlFor="tab2">Song Info</label>

              <input id="tab3" type="radio" value="tab3"
                     onChange={this.handleChange}
                     checked={this.state.selectedOption === 'tab3'}/>
              <label htmlFor="tab3">About</label>

              <section id="imageInfo">
                <p className="imageHeader">
                  {this.props.imageTitle}
                </p>
                <p>
                  {this.props.imageExplanation}
                </p>
                {this.props.copyright && <p>Image copyright: {this.props.copyright}</p>}
              </section>
              <section id="nlp">
                <p className="trackHeader">
                  Track Name: {this.props.trackName}
                </p>
                <p className="trackArtist">
                  Artist: {this.props.trackArtist}
                </p>
                <p className="trackAlbum">
                  Album: {this.props.trackAlbum}
                </p>
                <p className="songOverview">How did this song get chosen?</p>
                <p>The image title and body of text sent by NASA for the Astronomy Photo of the Day is sent through
                a natural language processing library that determines the main keyword(s) of the image.
                Those keywords are sent individually, one by one, to Spotify, until Spotify finds an associated song.
                </p>
                <p>These are the top 3 keywords the natural language processing library found for this image:</p>
                  <ul>
                    <li>{this.props.nlpData0Name}</li>
                    <li>{this.props.nlpData1Name}</li>
                    <li>{this.props.nlpData2Name}</li>
                  </ul>
                  <p>Spotify was able to find a song with one of the above keywords.</p>
              </section>
              <section id="about">
                <p>Space Jamz is a project that aims to pair images from <a href="https://apod.nasa.gov/apod/astropix.html">NASA's Astronomy Picture
                  of the Day</a> with a corresponding song from Spotify. To determine a corresponding song,
                  the image's title and caption are sent through <a href="https://cloud.google.com/natural-language">Google's Natural Language Processing library</a>.
                </p>
                <p>This project was created with loves of love by Sarah Trowbridge, a developer in Seattle, Washington.
                  Get in touch with her at trowbrsa@gmail.com or @SarahInSEA.
                </p>
              </section>
            </div>
          </div>
        )}
    </div>
    );
  }
}


export default InformationModal;
