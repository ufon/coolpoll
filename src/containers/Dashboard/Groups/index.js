import React, { Component, Fragment } from "react";
import notify from "utils/notifications";
import { Button, Input, Popover, Switch, Col, Row, Card } from "antd";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const GET_GROUPS = gql`
  {
    user {
      id
      groups {
        id
        name
        published
        polls {
          question
        }
      }
    }
  }
`;

const ADD_GROUP = gql`
  mutation CreateGroup($name: String!) {
    createGroup(name: $name) {
      id
    }
  }
`;

const PUBLISH_GROUP = gql`
  mutation Publish($id: String!) {
    publishGroup(id: $id)
  }
`;

class NewGroup extends Component {
  state = {
    name: ""
  };

  render() {
    const { name } = this.state;
    return (
      <>
        <Input
          placeholder="Group name"
          onChange={e => {
            this.setState({ name: e.target.value });
          }}
        />
        <Mutation mutation={ADD_GROUP}>
          {(createGroup, { loading, error }) => (
            <Button
              loading={loading}
              onClick={async () => {
                try {
                  const { data: group } = await createGroup({
                    variables: {
                      name
                    }
                  });
                  notify("success", "Group was successfully created!", "");
                  console.log(group);
                } catch (e) {
                  console.log(e.message);
                  notify("error", "Bad request 500", e.message);
                }
              }}
              style={{ margin: "20px 0" }}
            >
              Create group!
            </Button>
          )}
        </Mutation>

        <Row gutter={16}>
          <Query query={GET_GROUPS} pollInterval={1500}>
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                data.user &&
                data.user.groups.map(group => (
                  <Col key={group.id} lg={8} md={12}>
                    <Card
                      style={{ marginBottom: "20px" }}
                      actions={[
                        <Popover content="Publish group" trigger="hover">
                          <Mutation mutation={PUBLISH_GROUP}>
                            {(publishGroup, { loading, error }) => (
                              <Switch
                                loading={loading}
                                disabled={group.published}
                                defaultChecked={group.published}
                                onChange={async () => {
                                  try {
                                    await publishGroup({
                                      variables: {
                                        id: group.id
                                      }
                                    });
                                    notify(
                                      "success",
                                      "Group was successfully published!",
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
                      <h4>{group.name}</h4>
                    </Card>
                  </Col>
                ))
              );
            }}
          </Query>
        </Row>
      </>
    );
  }
}

export default NewGroup;
