import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import { ApolloProvider } from "react-apollo";

import apolloClient from "utils/apolloClient";
import PrivateRoute from "utils/withAuth";

import Dashboard from "containers/Dashboard";
import Auth from "containers/Auth";
import Poll from "containers/Poll";
import Group from "containers/Group";

import NotFound from "../NotFound";

import Header from "components/Header";
import Footer from "components/Footer";

const App = ({ match }) => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header />
        <Switch>
          <PrivateRoute path="/admin" component={Dashboard} />
          <Route exact path={"/"} render={() => <Redirect to={"/admin"} />} />
          <Route path="/signin" component={Auth} />
          <PrivateRoute path="/poll/:id" component={Poll} />
          <PrivateRoute path="/group/:id" component={Group} />

          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Layout>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
