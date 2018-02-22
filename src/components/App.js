import Container from './Container/Container';
import React from 'react';
import ReactDOM from 'react-dom';

const app = {
  initialize() {
    ReactDOM.render(<Container/>, document.getElementById('root'));
  }
};

app.initialize();
