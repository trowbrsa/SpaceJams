import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FirstTimeVisitorModal from './FirstTimeVisitorModal/FirstTimeVisitorModal';
import Image from './Image/Image';
import InformationModal from './InformationModal/InformationModal';
import Loading from './Loading/Loading';
import Loaded from './Loaded/Loaded';
import Track from './Track/Track';
import data from '../../dailyData.json';
import './image.scss';

class App extends Component {
  constructor(props){
    super(props);

    this.setLoadedBackground = this.setLoadedBackground.bind(this);

    this.state = {
      isLoading: true,
    }
  }

  setLoadedBackground(e){
    e.preventDefault();
    console.log("no longer loading!");
    this.setState({
      isLoading: false
    })
  }

  render(){

    const isLoading = this.state.isLoading;

    return(
      <div>
        {isLoading ? (
          <Loading />
        ) : (
          <Loaded
            setLoadedBackground = {this.setLoadedBackground}
            isLoading = {this.state.isLoading}
          />
        )}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
