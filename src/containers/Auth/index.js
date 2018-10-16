import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';

const AuthContainer = ({ match }) => (
  <Fragment>
    <Switch>
      <Route
        exact
        path={`${match.path}`}
        render={() => <Redirect to={`${match.path}/login`} />}
      />
      <Route path={`${match.path}/login`} component={Login} />
      <Route path={`${match.path}/register`} component={Register} />
    </Switch>
  </Fragment>
);

export default AuthContainer;
