import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
// import apolloClient from '../../utils/apolloClient';

// TODO: normal src resolvers

import Dashboard from '../Dashboard';
import Auth from '../Auth';
import Poll from '../Poll';
import NotFound from '../NotFound';

const App = () => (
  // <ApolloProvider client={apolloClient}>
  <BrowserRouter>
    <Fragment>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Route path="/poll/:id" component={Poll} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Fragment>
  </BrowserRouter>
  // </ApolloProvider>
);

export default App;
