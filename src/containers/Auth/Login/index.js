import React from "react";
import { Row, Card, Icon, Col, Button } from "antd";

const LoginPage = () => (
  <Row type="flex" style={{ margin: "50px 0" }} justify="center">
    <Col xs={24} md={12}>
      <Card title="Sign in">
        <Button size="large">
          <Icon type="github" />
          Sign in with Github
        </Button>
      </Card>
    </Col>
  </Row>
);

export default LoginPage;
