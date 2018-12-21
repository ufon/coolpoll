import React, { Component, Fragment } from "react";
import notify from "utils/notifications";
import {
  Button,
  Input,
  Popover,
  Switch,
  Col,
  Row,
  Card,
  Modal,
  Tag,
  Select
} from "antd";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";

const GET_GROUP_BY_ID = gql`
  query getGroup($id: ID!) {
    group(id: $id) {
      id
      name
      polls {
        id
        answer
        question
        options {
          id
          value
          votes
        }
      }
    }
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

const ADD_POLL_TO_GROUP = gql`
  mutation AddPollToGroup($addPollInput: AddPollInput!) {
    addPollToGroup(addPollInput: $addPollInput)
  }
`;

const DELETE_POLL_FROM_GROUP = gql`
  mutation RemovePollFromGroup($removePollInput: RemovePollInput!) {
    removePollFromGroup(removePollInput: $removePollInput)
  }
`;

class NewGroup extends Component {
  state = {
    name: "",
    visible: false,
    groupId: ""
  };

  showModal = groupId => {
    this.setState({
      visible: true,
      groupId
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { name } = this.state;
    console.log(this.state.groupId);
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
          <Query query={GET_GROUPS}>
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
                        </Popover>,
                        <Button
                          disabled={group.published}
                          type="primary"
                          onClick={() => this.showModal(group.id)}
                        >
                          Add poll
                        </Button>
                      ]}
                    >
                      <h4>{group.name}</h4>
                    </Card>
                  </Col>
                ))
              );
            }}
          </Query>
          <Modal
            title="Add To Group"
            visible={this.state.visible}
            onOk={this.handleOk}
          >
            <Mutation mutation={DELETE_POLL_FROM_GROUP}>
              {(delPollFromGroup, { loading, error }) => (
                <Mutation mutation={ADD_POLL_TO_GROUP}>
                  {(addPollToGroup, { loading, error }) => (
                    <Query
                      query={GET_GROUP_BY_ID}
                      variables={{ id: this.state.groupId }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return "Loading...";
                        if (error) return `Error! ${error.message}`;
                        return (
                          data.user && (
                            <AddPollToGroup
                              polls={data.user.polls.filter(
                                ({ published }) => published === false
                              )}
                              groupPolls={data.group.polls}
                              groupId={data.group.id}
                              addPollToGroup={addPollToGroup}
                              delPollFromGroup={delPollFromGroup}
                            />
                          )
                        );
                      }}
                    </Query>
                  )}
                </Mutation>
              )}
            </Mutation>
          </Modal>
        </Row>
      </>
    );
  }
}

class AddPollToGroup extends Component {
  state = {
    selectedId: ""
  };
  render() {
    console.log(this.state);
    return (
      <>
        <div style={{ display: "flex" }}>
          <Select
            placeholder="Add poll to group"
            style={{ width: "100%" }}
            onChange={e => this.setState({ selectedId: e })}
          >
            {this.props.polls.map(poll => (
              <Select.Option key={poll.id} value={poll.id}>
                {poll.question} ({poll.id})
              </Select.Option>
            ))}
          </Select>
          <Button
            onClick={async () => {
              try {
                const { data: poll } = await this.props.addPollToGroup({
                  variables: {
                    addPollInput: {
                      groupId: this.props.groupId,
                      pollId: this.state.selectedId
                    }
                  }
                });
                notify("success", "Poll was successfully added to Group!", "");
                console.log(poll);
              } catch (e) {
                console.log(e.message);
                notify("error", "Bad request 500", e.message);
              }
            }}
          >
            Add
          </Button>
        </div>
        {this.props.groupPolls.map(poll => (
          <Tag
            closable
            key={poll.id}
            onClose={async () => {
              try {
                await this.props.delPollFromGroup({
                  variables: {
                    removePollInput: {
                      groupId: this.props.groupId,
                      pollId: poll.id
                    }
                  }
                });
                notify(
                  "success",
                  "Poll was successfully deleted from Group!",
                  ""
                );
                console.log(poll);
              } catch (e) {
                console.log(e.message);
                notify("error", "Bad request 500", e.message);
              }
            }}
          >
            {poll.question}
          </Tag>
        ))}
      </>
    );
  }
}

export default NewGroup;
