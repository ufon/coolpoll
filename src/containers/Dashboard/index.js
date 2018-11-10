import React, { Fragment } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";

import Polls from "./Polls";
import Settings from "./Settings";

import AdminMenu from "../../components/Menus/Admin";

const { Content, Sider } = Layout;

const ADMIN_MENU = [
  { id: 0, name: "Pools", icon: "notification", path: "/admin/polls" },
  { id: 1, name: "Settings", icon: "setting", path: "/admin/settings" }
];
class DashboardContainer extends React.Component {
  render() {
    const { match } = this.props;
    return (
      <Fragment>
        <Content style={{ padding: "0 50px" }}>
          <Layout style={{ padding: "24px 0", background: "#fff" }}>
            <Sider width={200} style={{ background: "#fff" }}>
              <AdminMenu data={ADMIN_MENU} />
            </Sider>
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Switch>
                <Route
                  exact
                  path={`${match.path}`}
                  render={() => <Redirect to={`${match.path}/polls`} />}
                />
                <Route path={`${match.path}/polls`} component={Polls} />
                <Route path={`${match.path}/settings`} component={Settings} />
              </Switch>
            </Content>
          </Layout>
        </Content>
      </Fragment>
    );
  }
}

export default DashboardContainer;