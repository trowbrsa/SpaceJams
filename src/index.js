import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image';

class App extends Component {
  render(){
    return(
      <div>
        <h1>Howdy from React!</h1>
        <Image />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
