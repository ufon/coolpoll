// Forked from: https://github.com/chenglou/react-motion/tree/master/demos/demo8-draggable-list
// Original: http://framerjs.com/examples/preview/#list-sorting.framer

import React, { Fragment } from "react";
import { Spring } from "react-spring";
import { Input, Icon, Radio } from "antd";
import { Button } from "antd";
import styled from "styled-components";

const RadioGroup = Radio.Group;

const ListWrapper = styled.div`
  height: ${props => (props.height ? `${props.height}px` : "auto")};
  transition: height 300ms ease-in-out;
`;

const ListItem = styled.div`
  position: absolute;
  overflow: visible;
  pointer-events: auto;
  transform-origin: 50% 50% 0px;
  border-radius: 4px;
  color: rgb(153, 153, 153);
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const clamp = (n, min, max) => Math.max(Math.min(n, max), min);

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

export default class SortableList extends React.Component {
  state = {
    mouseY: 0,
    topDeltaY: 0,
    isPressed: false,
    originalPosOfLastPressed: 0
  };

  componentDidMount() {
    window.addEventListener("touchmove", this.handleTouchMove);
    window.addEventListener("touchend", this.handleMouseUp);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);
  }

  handleTouchStart = (key, pressLocation, e) =>
    this.handleMouseDown(key, pressLocation, e.touches[0]);

  handleTouchMove = e =>
    e.preventDefault() || this.handleMouseMove(e.touches[0]);

  handleMouseUp = () => this.setState({ isPressed: false, topDeltaY: 0 });

  handleMouseDown = (pos, pressY, { pageY }) =>
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos
    });

  handleMouseMove = ({ pageY }) => {
    const { isPressed, topDeltaY, originalPosOfLastPressed } = this.state;
    const { order } = this.props;
    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, order.length - 1);
      let newOrder = order;
      if (currentRow !== order.indexOf(originalPosOfLastPressed))
        newOrder = reinsert(
          order,
          order.indexOf(originalPosOfLastPressed),
          currentRow
        );
      this.setState({ mouseY: mouseY });
      this.props.onOrderChange(newOrder);
    }
  };

  render() {
    const { mouseY, isPressed, originalPosOfLastPressed } = this.state;
    const { options, order } = this.props;
    return (
      <Fragment>
        {order.length < 5 && (
          <Button
            onClick={() => {
              this.props.onAddOption();
            }}
            type="primary"
          >
            Add option
            <Icon type="plus" />
          </Button>
        )}
        <ListWrapper height={order.length * 100}>
          <RadioGroup
            onChange={this.props.onAnswerChange}
            value={this.props.answer}
          >
            {options.map(option => {
              const active =
                originalPosOfLastPressed === option.id && isPressed;
              const style = active
                ? { scale: 1.1, shadow: 16, y: mouseY }
                : { scale: 1, shadow: 1, y: order.indexOf(option.id) * 100 };
              return (
                <Spring
                  immediate={name => active && name === "y"}
                  to={style}
                  key={option.id}
                >
                  {({ scale, shadow, y }) => (
                    <ListItem
                      onMouseDown={this.handleMouseDown.bind(
                        null,
                        option.id,
                        y
                      )}
                      onTouchStart={this.handleTouchStart.bind(
                        null,
                        option.id,
                        y
                      )}
                      style={{
                        boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 *
                          shadow}px 0px`,
                        transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                        zIndex:
                          option.id === originalPosOfLastPressed
                            ? 99
                            : option.id
                      }}
                    >
                      <Radio value={option.id} />

                      <Input
                        onChange={e =>
                          this.props.onOptionValueChange(
                            option.id,
                            e.target.value
                          )
                        }
                        placeholder={`${option.id} Enter poll option here`}
                        size="large"
                      />
                      <Button
                        type="primary"
                        style={{ margin: "0 10px" }}
                        onClick={() => {
                          this.props.onOptionDelete(option.id);
                        }}
                        size="small"
                      >
                        <Icon type="close" />
                      </Button>
                    </ListItem>
                  )}
                </Spring>
              );
            })}
          </RadioGroup>
        </ListWrapper>
      </Fragment>
    );
  }
}
