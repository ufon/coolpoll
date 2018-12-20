import React from "react";
import { Row, Card, Col } from "antd";

const LoginPage = () => (
  <Row type="flex" style={{ margin: "50px 0" }} justify="center">
    <Col xs={24} md={12}>
      <Card title="Sign in">
        <p>For using the system you should sign in.</p>
      </Card>
    </Col>
  </Row>
);

export default LoginPage;
