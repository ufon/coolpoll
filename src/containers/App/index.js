import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import { ApolloProvider } from "react-apollo";

import apolloClient from "../../utils/apolloClient";

import Dashboard from "../Dashboard";
import Auth from "../Auth";
import Poll from "../Poll";
import NotFound from "../NotFound";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

const App = ({ match }) => (
  <BrowserRouter>
    <ApolloProvider client={apolloClient}>
      <Layout style={{ height: "100vh" }}>
        <Header />
        <Switch>
          <Route path="/admin" component={Dashboard} />
          <Route path="/auth" component={Auth} />
          <Route path="/poll/:id" component={Poll} />
          <Route path="*" component={NotFound} />
        </Switch>
        <Footer />
      </Layout>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
