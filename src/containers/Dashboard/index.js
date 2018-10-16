import React, { Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Pools from './Polls';
import Settings from './Settings';

const DashboardContainer = ({ match }) => (
  <Fragment>
    <Switch>
      <Route path={`/`} component={Pools} />
      <Route path={`/settings`} component={Settings} />
    </Switch>
  </Fragment>
);

export default DashboardContainer;
