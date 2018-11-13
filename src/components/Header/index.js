import { Layout } from "antd";

import MainMenu from "../Menus/Main";

import localStorage from "../../utils/localStorage";

import React, { Component } from "react";

const MAIN_MENU = [
  { id: 0, name: "About", path: "/about" },
  { id: 1, name: "Github", path: "https://github.com" }
];

class Header extends Component {
  componentDidMount() {
    window.addEventListener("message", this.listener);

    // if (this.props.auth.isAuthenticated) {
    //   this.props.goDashboard();
    // }
  }

  listener = ({ origin, data }) => {
    if (origin !== process.env.REACT_APP_URL) return;
    if (data.token) localStorage.write(data.token);
  };

  openPopup = url => {
    const w = 500;
    const h = 600;
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;

    return window.open(
      process.env.REACT_APP_GRAPHQL_URL + url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };

  render() {
    return (
      <Layout.Header>
        <MainMenu
          onLoginClick={() => this.openPopup("/auth/github")}
          data={MAIN_MENU}
        />
      </Layout.Header>
    );
  }
}

export default Header;
