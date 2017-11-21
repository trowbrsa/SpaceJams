import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image';
import Track from './components/track';

class App extends Component {
  // verify if parent should own state

  render(){
    return(
      <div>
       <Image />
       <Track />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
