import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
ReactDOM.hydrate(<App/>, document.getElementById('root'));

if (module.hot) {
  console.log("%$%$%$%$%$%$%$%$");
  module.hot.accept();
}