import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import HomePage from '../../../containers/HomePage';
import Login from '../../forms/Login';

const layout = () => (
    <div>
        <Switch>
            <Route
                exact
                path="/"
                component={Login}
            />
            <Route
                path="/tickets"
                component={HomePage}
            />
        </Switch>
    </div>
);

export default withRouter(layout);
