import React, { Component } from "react";
import { Layout } from "antd";

import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Card, Col, Row, Icon, Radio, Button } from "antd";
import notify from "../../utils/notifications";

import styled from "styled-components";

const RadioGroup = Radio.Group;

const GET_POLL_BY_ID = gql`
  query getPoll($id: ID!) {
    poll(id: $id) {
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
`;

const SEND_VOTE = gql`
  mutation Vote($pollID: ID!, $optionID: ID!) {
    vote(pollId: $pollID, optionId: $optionID)
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  .ant-radio-wrapper {
    display: block;
    height: 30px;
  }
`;

class PollPage extends Component {
  state = {
    answerID: null
  };

  onAnswerChange = e => {
    this.setState({
      answerID: e.target.value
    });
  };

  render() {
    const { answerID: optionID } = this.state;

    return (
      <Layout style={{ padding: "0 50px", background: "#fff" }}>
        <Layout.Content
          style={{
            padding: "24px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Query
            query={GET_POLL_BY_ID}
            variables={{ id: this.props.match.params.id }}
          >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <Row style={{ width: "100%" }} gutter={16}>
                  <Col lg={12} md={24}>
                    <h1>{data.poll.question}</h1>
                  </Col>
                  <Col lg={12} md={24}>
                    <Card>
                      <StyledRadioGroup
                        disabled={!!data.poll.answer}
                        onChange={this.onAnswerChange}
                        value={data.poll.answer || this.state.answerID}
                      >
                        {data.poll.options.map(option => (
                          <Radio key={option.id} value={option.id}>
                            {option.value}
                          </Radio>
                        ))}
                      </StyledRadioGroup>
                      <div>
                        <Mutation mutation={SEND_VOTE}>
                          {(Vote, { loading, error }) => (
                            <Button
                              disabled={!!data.poll.answer}
                              onClick={async () => {
                                try {
                                  const { data: vote } = await Vote({
                                    variables: {
                                      optionID,
                                      pollID: this.props.match.params.id
                                    }
                                  });
                                  notify("success", "Voted successfully!", "");
                                  console.log(vote);
                                } catch (e) {
                                  console.log(e.message);
                                  notify("error", "Bad request 500", e.message);
                                }
                              }}
                            >
                              Vote
                            </Button>
                          )}
                        </Mutation>
                      </div>
                    </Card>
                  </Col>
                </Row>
              );
            }}
          </Query>
        </Layout.Content>
      </Layout>
    );
  }
}

export default PollPage;
