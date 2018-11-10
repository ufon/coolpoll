import React from "react";
import { Layout } from "antd";

import MainMenu from "../Menus/Main";

const MAIN_MENU = [
  { id: 0, name: "About", path: "/about" },
  { id: 1, name: "Github", path: "https://github.com" }
];

const Header = () => (
  <Layout.Header>
    <MainMenu data={MAIN_MENU} />
  </Layout.Header>
);

export default Header;
