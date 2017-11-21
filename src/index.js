import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image';
import Track from './components/track';

class App extends Component {
  render(){
    return(
      <div>
       a plain hello
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
