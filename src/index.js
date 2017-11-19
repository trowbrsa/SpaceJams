import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Image from './components/image';

class App extends Component {
  render(){
    return(
      <div>
        <Image />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
