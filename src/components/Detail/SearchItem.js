import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "../User/UserId";

import { IoCloseOutline } from "react-icons/io5";

const UserProfile = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
`;

const UserDetail = styled.div`
  display: flex;
  gap: 15px;
`;
const Userinfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const UserName = styled.span`
  font-size: var(--font-14);
  color: var(--gray-color);
`;

const Btns = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const FollowBtn = styled.button`
  font-size: var(--font-14);
  font-weight: var(--font-bold);
  color: var(--sub-purple-color);
  transition: all 0.3s;
  padding: 7px 10px;

  &:hover {
    background: var(--light-gray-color);
    border-radius: var(--border-radius-8);
  }
`;

const CloseBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: var(--font-22);
  }
`;

const SearchItem = ({ userName, userNickName, followed, url }) => {
  return (
    <UserProfile>
      <UserDetail>
        <ProfileImg type={"active"} size={"44"} url={url} />
        <Userinfo>
          <UserId type={"feed"} userNickname={userNickName} />
          <UserName>{userName}</UserName>
        </Userinfo>
      </UserDetail>
      <Btns>
        <FollowBtn>{followed ? "팔로우" : null}</FollowBtn>
        <CloseBtn>
          <IoCloseOutline />
        </CloseBtn>
      </Btns>
    </UserProfile>
  );
};

export default SearchItem;
