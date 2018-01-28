import React from 'react';
import PropTypes from 'prop-types';
import style from './informationModal.css';
import './informationalModal.scss';
import closeIcon from '../../public/ic_close_white_24dp_2x.png';
import icon from '../../public/ic_info_black_24dp_2x.png';

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
    return (
      <div
        className="modal-wrapper"
        ref={node => {this.node = node;}}>
        <div>
          <span className='informationIcon'
            onClick={this.handleClick}>
            <img src={icon} alt="more info" />
          </span>
          {this.state.modalVisible && (
            <div className="modal">
              <div>
                <h1>Space Jams</h1>
                <main>
                  <input id="tab1" type="radio" value="tab1"
                         onChange={this.handleChange}
                         checked={this.state.selectedOption === 'tab1'} />
                  <label htmlFor="tab1">Image Info</label>

                  <input id="tab2" type="radio" value="tab2"
                        onChange={this.handleChange}
                        checked={this.state.selectedOption === 'tab2'}/>
                  <label htmlFor="tab2">NLP</label>

                  <input id="tab3" type="radio" value="tab3"
                         onChange={this.handleChange}
                         checked={this.state.selectedOption === 'tab3'}/>
                  <label htmlFor="tab3">About</label>


                 <section id="image">
                  <p>
                    {this.props.imageTitle}
                  </p>
                  <p>
                    {this.props.imageExplanation}
                  </p>
                  <p>
                    Track Name: {this.props.trackName}
                  </p>
                  <p>
                    Artist: {this.props.trackArtist}
                  </p>
                  <p>
                    Album: {this.props.trackAlbum}
                  </p>
                 </section>
                 <section id="nlp">
                   <p>
                     About NLP
                   </p>
                 </section>
                 <section id="about">
                   <p>
                     About project
                   </p>
                 </section>
               </main>
             </div>
            </div>
          )}
      </div>
    </div>
    );
  }
}


export default InformationModal;
