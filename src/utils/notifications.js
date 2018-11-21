import { notification } from "antd";

export default (type, message, description) => {
  notification[type]({
    message: message,
    description: description
  });
};
