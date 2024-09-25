import React from "react";
import styled from "styled-components";
import UserImg from "./UserImg";

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`;
const Userdesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserId = styled.span`
  font-size: var(--font-size-16);
  font-weight: var(--font-bold);
`;
const Optional = styled.p`
  font-size: var(--font-size-16);
  font-weight: var(--font-regular);
  color: var(--gray-color);
`;

const UserInfo = ({
  userName,
  userNickname,
  profilePhoto,
  userId,
  location,
}) => {
  return (
    <Wrapper>
      <UserImg />
      <Userdesc>
        <UserId>{userId}</UserId>
        <Optional>{userNickname}</Optional>
      </Userdesc>
    </Wrapper>
  );
};

export default UserInfo;
