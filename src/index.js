/* eslint-disable import/default */

import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import configureStore from './store/configureStore';
require('./favicon.ico'); // Tell webpack to load favicon.ico
import './styles/styles.scss'; // Yep, that's right. You can import SASS/CSS files too! Webpack will run the associated loader and plug this into the page.
import { syncHistoryWithStore } from 'react-router-redux';
import runtime from 'serviceworker-webpack-plugin/lib/runtime';

const store = configureStore();

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

if('serviceWorker' in navigator && (window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost')) {
  /* eslint-disable */
  const registration = runtime.register();
  /* eslint-enable */
  
  /* navigator.serviceWorker.register('/sw-dev.js', {scope:'/'})
  .then((reg) => {
    console.log('Registration succeeded. Scope is: ', reg.scope);
  }).catch((error) => {
    console.log('Registration failed: ', error);
  });
  */
}

render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>, document.getElementById('app')
);
