import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Callback from "./Callback";

const AuthContainer = ({ match }) => (
  <Fragment>
    <Switch>
      <Route exact path={`${match.path}`} component={Login} />
      <Route path={`${match.path}/:token`} component={Callback} />
    </Switch>
  </Fragment>
);

export default AuthContainer;
