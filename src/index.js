import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore';

const store = configureStore();

require('./style/bootstrap/css/bootstrap.min.css');
require('./style/font-awesome/css/font-awesome.min.css');
require('./style/application.scss');

render(
  <Root store={store} />,
  document.getElementById('root')
);
