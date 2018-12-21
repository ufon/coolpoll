import React, { Component } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const DATA = [
  { name: "Page A", value: 2400 },
  { name: "Page B", value: 1398 },
  { name: "Page C", value: 9800 },
  { name: "Page D", value: 3908 },
  { name: "Page E", value: 4800 },
  { name: "Page F", value: 3800 },
  { name: "Page G", value: 4300 }
];

class SimpleBarChart extends Component {
  state = {
    data: this.props.data || DATA
  };

  getPath = (x, y, width, height) => {
    return `M${x},${y + height}
            C${x + width / 3},${y + height} ${x + width / 2},${y +
      height / 3} ${x + width / 2}, ${y}
            C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y +
      height} ${x + width}, ${y + height}
            Z`;
  };

  TriangleBar = props => {
    const { fill, x, y, width, height } = props;

    return (
      <path d={this.getPath(x, y, width, height)} stroke="none" fill={fill} />
    );
  };

  render() {
    const { data } = this.state;
    return (
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="value"
          fill="#8884d8"
          shape={this.TriangleBar}
          label={{ position: "top" }}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    );
  }
}

export default SimpleBarChart;
