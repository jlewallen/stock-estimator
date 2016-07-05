import React from 'react';
import { Route, IndexRedirect } from 'react-router';
import App from './containers/App';
import LayoutPage from './containers/LayoutPage';

export default (
    <Route path="/" component={App}>
        <IndexRedirect to="/layout" />
        <Route path="/layout" component={LayoutPage} />
    </Route>
);
