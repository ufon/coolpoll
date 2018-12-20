import React, { Component, Fragment } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { Card, Col, Row, Icon, Switch, Popover } from "antd";
import { withRouter } from "react-router-dom";
import notify from "utils/notifications";
import { Mutation } from "react-apollo";

const GET_POLLS = gql`
  {
    user {
      id
      polls {
        id

        answer
        question
        published
      }
    }
  }
`;

const PUBLISH_POLL = gql`
  mutation Publish($id: String!) {
    publishPoll(id: $id)
  }
`;
class AllPolls extends Component {
  render() {
    return (
      <Query query={GET_POLLS} pollInterval={1500}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return (
            <Fragment>
              <Row type="flex" gutter={16}>
                {data.user &&
                  data.user.polls.map(poll => (
                    <Col key={poll.id} lg={8} md={12}>
                      <Card
                        style={{ marginBottom: "20px" }}
                        actions={[
                          <Popover content="Edit poll" trigger="hover">
                            <Icon
                              type="edit"
                              onClick={() =>
                                this.props.history.push(
                                  `/admin/poll/${poll.id}`
                                )
                              }
                            />
                          </Popover>,
                          <Popover content="Go to poll page" trigger="hover">
                            <Icon
                              onClick={() =>
                                this.props.history.push(`/poll/${poll.id}`)
                              }
                              type="eye"
                            />
                          </Popover>,
                          <Popover content="Publish poll" trigger="hover">
                            <Mutation mutation={PUBLISH_POLL}>
                              {(publishPoll, { loading, error }) => (
                                <Switch
                                  loading={loading}
                                  disabled={poll.published}
                                  defaultChecked={poll.published}
                                  onChange={async () => {
                                    try {
                                      await publishPoll({
                                        variables: {
                                          id: poll.id
                                        }
                                      });
                                      notify(
                                        "success",
                                        "Poll was successfully published!",
                                        ""
                                      );
                                    } catch (e) {
                                      console.log(e.message);
                                      notify(
                                        "error",
                                        "Bad request 500",
                                        e.message
                                      );
                                    }
                                  }}
                                />
                              )}
                            </Mutation>
                          </Popover>
                        ]}
                      >
                        <h4>{poll.question}</h4>
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
