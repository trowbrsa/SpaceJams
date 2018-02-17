import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import data from '../../dailyData.json';
import MainScreen from './MainScreen';

const App = () => {

  return(
    <MainScreen/>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
