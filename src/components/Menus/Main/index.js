import React from "react";
import { withRouter } from "react-router-dom";
import Link from "../../Link";
import { Menu, Button, Icon } from "antd";

const MainMenu = ({ data, location, onLoginClick }) => (
  <Menu
    theme="dark"
    mode="horizontal"
    selectedKeys={[location.pathname]}
    style={{ lineHeight: "64px", display: "flex" }}
  >
    {data.map(item => (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{item.name}</Link>
      </Menu.Item>
    ))}
    <Menu.Item style={{ marginLeft: "auto" }}>
      <Button onClick={onLoginClick} size="large">
        <Icon type="github" />
        Sign in with Github
      </Button>
    </Menu.Item>
  </Menu>
);

export default withRouter(MainMenu);
