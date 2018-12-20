import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import AddPollForm from "components/AddPollForm";

const UPDATE_POLL = gql`
  mutation UpdatePoll($updatePollInput: UpdatePollInput!) {
    updatePoll(updatePollInput: $updatePollInput) {
      id
    }
  }
`;

const GET_POLL_BY_ID = gql`
  query getPoll($id: ID!) {
    poll(id: $id) {
      id
      answer
      published
      question
      options {
        id
        value
      }
    }
  }
`;

class EditPoll extends Component {
  render() {
    return (
      <Query
        query={GET_POLL_BY_ID}
        variables={{ id: this.props.match.params.id }}
      >
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;
          return (
            <Mutation mutation={UPDATE_POLL}>
              {(updatePoll, { loading, error }) => (
                <AddPollForm
                  isUpdate
                  id={this.props.match.params.id}
                  published={data.poll.published}
                  order={data.poll.options.map(({ id }) => id)}
                  question={data.poll.question}
                  options={[...data.poll.options]}
                  onSave={updatePoll}
                />
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default EditPoll;
