import React from 'react';
import ReactDOM from 'react-dom';
import App from './features/App';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import '../public/index.css';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
