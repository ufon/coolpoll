import { Layout } from "antd";

import MainMenu from "../Menus/Main";

import localStorage from "../../utils/localStorage";

import gql from "graphql-tag";

import React, { Component, Fragment } from "react";

import { Query } from "react-apollo";

import { withRouter, Redirect } from "react-router-dom";

const MAIN_MENU = [
  { id: 0, name: "About", path: "/about" },
  { id: 1, name: "Github", path: "https://github.com" }
];

const GET_PROFILE = gql`
  {
    user {
      id
      email
      profile {
        name
        github_username
        avatar
      }
    }
  }
`;
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.read()
    };
  }

  componentDidMount() {
    window.addEventListener("message", this.listener);
  }

  listener = ({ origin, data }) => {
    if (origin !== process.env.REACT_APP_URL) return;
    if (data.token) {
      localStorage.write(data.token);
      this.setState({ isAuthenticated: true });
      let redirect = sessionStorage.getItem("auth:redirect");
      if (redirect) {
        this.props.history.push(redirect);
      } else {
        this.props.history.push("/admin");
      }
    }
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
    const { isAuthenticated } = this.state;
    return (
      <Layout.Header>
        {isAuthenticated ? (
          <Query query={GET_PROFILE}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) {
                this.setState({ isAuthenticated: false });
                localStorage.delete();
                return <Redirect to="/signin" />;
              }
              return (
                <Fragment>
                  {data.user && (
                    <MainMenu
                      onLoginClick={() => this.openPopup("/auth/github")}
                      onLogoutClick={() => {
                        this.setState({ isAuthenticated: false });
                        localStorage.delete();
                        this.props.history.push("/signin");
                      }}
                      data={MAIN_MENU}
                      user={data.user.profile}
                    />
                  )}
                </Fragment>
              );
            }}
          </Query>
        ) : (
          <MainMenu
            onLoginClick={() => this.openPopup("/auth/github")}
            data={MAIN_MENU}
          />
        )}
      </Layout.Header>
    );
  }
}

export default withRouter(Header);
