import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card, Col, Row, Icon } from "antd";
import { withRouter } from "react-router-dom";

const GET_POLLS = gql`
  {
    user {
      id
      polls {
        id
        answer
        question
      }
    }
  }
`;

class AllPolls extends Component {
  render() {
    return (
      <Query query={GET_POLLS} pollInterval={500}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Fragment>
              <Row gutter={16}>
                {data.user &&
                  data.user.polls.map(poll => (
                    <Col lg={8} md={12}>
                      <Card
                        style={{ marginBottom: "20px" }}
                        title={poll.question}
                        actions={[
                          <Icon type="edit" />,
                          <Icon
                            onClick={() =>
                              this.props.history.push(`/poll/${poll.id}`)
                            }
                            type="eye"
                          />
                        ]}
                      >
                        Card content
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(AllPolls);
