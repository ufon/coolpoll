import React from "react";
import { withRouter } from "react-router-dom";
import Link from "../../Link";
import { Menu, Button, Icon } from "antd";
import UserWithAvatar from "../../UserWithAvatar";

const MainMenu = ({
  data,
  user = false,
  location,
  onLoginClick,
  onLogoutClick
}) => (
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
      {!user && (
        <Button onClick={onLoginClick} size="large">
          <Icon type="github" />
          Sign in with Github
        </Button>
      )}
      {user && (
        <UserWithAvatar
          avatar={user.avatar}
          fullName={user.name}
          userName={user.github_username}
          onLogout={onLogoutClick}
        />
      )}
    </Menu.Item>
  </Menu>
);

export default withRouter(MainMenu);
