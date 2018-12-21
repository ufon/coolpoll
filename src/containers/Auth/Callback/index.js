import React, { Component } from "react";
import { Row, Card, Col } from "antd";
class CallbackPage extends Component {
  state = {
    error: false
  };

  componentWillMount() {
    try {
      const { token } = this.props.match.params;
      window.opener.postMessage({ token }, process.env.REACT_APP_URL);
      window.opener.focus();
      window.close();
    } catch (err) {
      this.setState({ error: true });
    }
  }
  render() {
    return (
      <Row type="flex" style={{ margin: "50px 0" }} justify="center">
        <Col xs={24} md={12}>
          <Card title="Callback">
            <h1>{this.state.error ? "Error" : "Success"}</h1>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CallbackPage;
