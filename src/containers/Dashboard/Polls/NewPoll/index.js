import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import AddPollForm from "components/AddPollForm";

const ADD_POLL = gql`
  mutation CreatePoll($createPollInput: CreatePollInput!) {
    createPoll(createPollInput: $createPollInput) {
      id
      options {
        id
      }
    }
  }
`;

class NewPoll extends Component {
  render() {
    return (
      <Mutation mutation={ADD_POLL}>
        {addPoll => <AddPollForm onSave={addPoll} />}
      </Mutation>
    );
  }
}

export default NewPoll;
