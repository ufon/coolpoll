import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { Card, Col, Row, Radio, Button, Layout, Carousel } from "antd";
import notify from "utils/notifications";

import styled from "styled-components";
import BarChart from "components/BarChart";

const RadioGroup = Radio.Group;

const GET_GROUP_BY_ID = gql`
  query getGroup($id: ID!) {
    group(id: $id) {
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
  }
`;

const SEND_VOTE = gql`
  mutation Vote($voteInput: VoteInput!) {
    vote(voteInput: $voteInput)
  }
`;

const StyledRadioGroup = styled(RadioGroup)`
  .ant-radio-wrapper {
    display: block;
    height: 30px;
  }
`;

const StyledCarousel = styled(Carousel)`
  background: #f3f4f7;
  padding: 24px;
  .slick-slide {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
    overflow: hidden;
  }
`;

class Poll extends Component {
  state = {
    answerID: null,
    voted: false
  };

  onAnswerChange = e => {
    this.setState({
      answerID: e.target.value
    });
  };
  render() {
    const { answerID: optionId } = this.state;
    return (
      <Row gutter={16}>
        <Col lg={12} md={24}>
          <h1>{this.props.poll.question}</h1>
        </Col>
        <Col lg={12} md={24}>
          {!this.props.poll.answer || this.state.answerID ? (
            <Card>
              <StyledRadioGroup
                disabled={!!this.props.poll.answer}
                onChange={this.onAnswerChange}
                value={this.props.poll.answer || this.state.answerID}
              >
                {this.props.poll.options.map(option => (
                  <Radio key={option.id} value={option.id}>
                    {option.value}
                  </Radio>
                ))}
              </StyledRadioGroup>
              <Mutation mutation={SEND_VOTE}>
                {(Vote, { loading, error }) => (
                  <Button
                    disabled={!!this.props.poll.answer}
                    onClick={async () => {
                      try {
                        const { data: vote } = await Vote({
                          variables: {
                            voteInput: {
                              optionId,
                              pollId: this.props.poll.id
                            }
                          }
                        });
                        notify("success", "Voted successfully!", "");
                        this.setState({ voted: true });
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
            </Card>
          ) : (
            <BarChart
              data={this.props.poll.options.map(({ votes, value }) => ({
                name: value,
                value: votes
              }))}
            />
          )}
        </Col>
      </Row>
    );
  }
}

class GroupPage extends Component {
  render() {
    return (
      <Layout style={{ padding: "0 50px", background: "#fff" }}>
        <Layout.Content
          style={{
            padding: "24px 0"
          }}
        >
          <Query
            query={GET_GROUP_BY_ID}
            variables={{ id: this.props.match.params.id }}
            pollInterval={1500}
          >
            {({ loading, error, data }) => {
              if (loading) return "Loading...";
              if (error) return `Error! ${error.message}`;

              return (
                <StyledCarousel>
                  {data.group.polls.map(poll => (
                    <Poll poll={poll} />
                  ))}
                </StyledCarousel>
              );
            }}
          </Query>
        </Layout.Content>
      </Layout>
    );
  }
}

export default GroupPage;
