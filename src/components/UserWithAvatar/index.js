import React from "react";
import { Avatar } from "antd";
import { Popover, Button } from "antd";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const Name = styled.div`
  padding-bottom: 10px;
  padding-right: 15px;
  line-height: 1;
  color: white;
  font-size: 16px;
`;

const UserName = styled.div`
  color: rgba(255, 255, 255, 0.6);
  line-height: 1;
  font-size: 12px;
`;

const UserMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: between;
  width: 150px;
  button {
    margin: 5px 0;
  }
`;

const UserWithAvatar = ({ avatar, fullName, userName, onLogout }) => {
  return (
    <Container>
      <Popover
        content={
          <UserMenu>
            <Button onClick={onLogout}>My polls</Button>
            <Button onClick={onLogout}>Logout</Button>
          </UserMenu>
        }
        trigger="click"
      >
        <Name>{fullName}</Name>
        <UserName>{userName}</UserName>
      </Popover>
      <Avatar size={36} src={avatar} />
    </Container>
  );
};

export default UserWithAvatar;
