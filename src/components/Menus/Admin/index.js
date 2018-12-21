import React from "react";
import { withRouter } from "react-router-dom";
import Link from "../../Link";
import { Menu, Icon } from "antd";

const AdminMenu = ({ data, location }) => (
  <Menu
    mode="inline"
    selectedKeys={[location.pathname]}
    style={{ height: "100%" }}
  >
    {data.map(item => (
      <Menu.Item key={item.path}>
        <Link to={item.path}>
          {item.icon && <Icon type={item.icon} />}
          <span>{item.name}</span>
        </Link>
      </Menu.Item>
    ))}
  </Menu>
);

export default withRouter(AdminMenu);
