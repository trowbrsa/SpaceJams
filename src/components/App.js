import AppRoot from './AppRoot/AppRoot';
import React from 'react';
import ReactDOM from 'react-dom';

const app = {
  initialize() {
    ReactDOM.render(<AppRoot/>, document.getElementById('root'));
  }
};

app.initialize();
