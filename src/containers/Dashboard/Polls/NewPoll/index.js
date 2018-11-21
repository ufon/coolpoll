import React, { Component, Fragment } from "react";
import SortableList from "../../../../components/SortableList";
import notify from "../../../../utils/notifications";
import nanoid from "nanoid";
import { Button, Input } from "antd";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_POLL = gql`
  mutation CreatePoll($question: String!, $options: [OptionInput!]!) {
    createPoll(question: $question, options: $options) {
      id
    }
  }
`;

class NewPoll extends Component {
  state = {
    question: "",
    answer: "",
    order: [],
    options: []
  };

  addOption = () => {
    const id = `option_${nanoid()}`;
    this.setState({
      order: [...this.state.order, id],
      options: [...this.state.options, { id, value: "" }]
    });
  };

  deleteOption = id =>
    this.setState({
      order: this.state.order.filter(optionID => optionID !== id),
      options: this.state.options.filter(({ id: optionID }) => optionID !== id)
    });

  handleOrderChange = order => {
    this.setState({
      order
    });
  };

  handleOptionValueChange = (id, value) => {
    const index = this.state.options.findIndex(option => option.id === id);
    const options = this.state.options;
    options[index].value = value;
    this.setState({
      options
    });
  };

  handleAnswerChange = e => {
    this.setState({
      answer: e.target.value
    });
  };

  render() {
    const { options, answer, question, order } = this.state;
    return (
      <Mutation mutation={ADD_POLL}>
        {(createPoll, { loading, error }) => (
          <Fragment>
            <Input
              placeholder="Poll question"
              onChange={e => {
                this.setState({ question: e.target.value });
              }}
              style={{ margin: "20px 0" }}
            />
            <p>Please, choose the correct answer by radio button.</p>
            <SortableList
              options={options}
              order={order}
              answer={answer}
              onOptionDelete={this.deleteOption}
              onOrderChange={this.handleOrderChange}
              onAnswerChange={this.handleAnswerChange}
              onAddOption={this.addOption}
              onOptionValueChange={this.handleOptionValueChange}
            />
            <Button
              onClick={async () => {
                try {
                  const { data: poll } = await createPoll({
                    variables: {
                      question,
                      options: options.map(e => ({ value: e.value }))
                    }
                  });
                  notify("success", "Poll was successfully created!", "");
                  console.log(poll);
                } catch (e) {
                  console.log(e.message);
                  notify("error", "Bad request 500", e.message);
                }
              }}
              style={{ margin: "20px 0" }}
            >
              Create poll!
            </Button>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default NewPoll;
