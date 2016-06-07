import React from 'react';
import { Route } from 'react-router';
import App from './containers/App';
import LayoutPage from './containers/LayoutPage';

export default (
    <Route path="/" component={App}>
        <Route path="/layout" component={LayoutPage} />
    </Route>
);
