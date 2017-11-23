import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/Image';
import Track from './components/Track';
import data from '../dailyData.json';

class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      image: data.image_data.hdurl,
      track: data.track_data
    }
  }


  render(){
    return(
      <div>
       <Image image={this.state.image}/>
       <Track track={this.state.track}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
