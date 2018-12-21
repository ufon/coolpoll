import React, { Component, Fragment } from "react";
import SortableList from "components/SortableList";
import notify from "utils/notifications";
import nanoid from "nanoid";
import { Button, Input, Popover, Switch } from "antd";

class AddPollForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      published: this.props.published || false,
      order: this.props.order || [],
      answer: "",
      question: this.props.question || "",
      options: this.props.options || []
    };
  }

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
    const { options, answer, question, order, published } = this.state;
    const { onSave, isUpdate, id } = this.props;
    return (
      <Fragment>
        <Input
          placeholder="Poll question"
          onChange={e => {
            this.setState({ question: e.target.value });
          }}
          value={question}
          style={{ marginBottom: "20px" }}
        />
        <Popover content="Publish poll after creating?" trigger="hover">
          <Switch
            defaultChecked={published}
            onChange={published => this.setState({ published })}
            style={{ marginBottom: "20px" }}
          />
        </Popover>
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
              const { data: poll } = await onSave({
                variables: {
                  [isUpdate ? "updatePollInput" : "createPollInput"]: {
                    ...(isUpdate && { id }),
                    question,
                    options: options.map(e => ({ value: e.value }))
                  }
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
          Save poll!
        </Button>
      </Fragment>
    );
  }
}

export default AddPollForm;
