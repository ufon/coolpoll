import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import FontFaceObserver from "fontfaceobserver";
import "antd/dist/antd.css";
import "./fonts/BasisGrotesquePro.css";
import GlobalStyle from "./global-styles";

const fontObserver = new FontFaceObserver("Basis Grotesque Pro", {});

fontObserver.load().then(() => {
  document.body.classList.add("fontLoaded");
});

ReactDOM.render(
  <React.Fragment>
    <App />
    <GlobalStyle />
  </React.Fragment>,
  document.getElementById("root")
);
