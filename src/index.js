import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import "antd/dist/antd.css";
import GlobalStyle from "./global-styles";

ReactDOM.render(
  <React.Fragment>
    <App />
    <GlobalStyle />
  </React.Fragment>,
  document.getElementById("root")
);
