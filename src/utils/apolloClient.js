import ApolloClient from "apollo-boost";
import localStorage from "./localStorage";

const GRAPHQL_URL = `${process.env.REACT_APP_GRAPHQL_URL}/api/graphql`;

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  request: operation => {
    const token = localStorage.read();
    let headers = {};
    if (token) {
      headers = { authorization: `Bearer ${token}` };
    }
    operation.setContext({ headers });
  }
});

export default client;
