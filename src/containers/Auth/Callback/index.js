import React, { Component } from "react";

class CallbackPage extends Component {
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
    return <div>Success</div>;
  }
}

export default CallbackPage;
