import React, { useState } from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  padding-bottom: 20px;
`;
const Userdesc = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Optional = styled.p`
  ${({ type }) =>
    type === "feed"
      ? `font-size: var(--font-14); font-weight: var(--font-regular);`
      : type === "hover"
      ? `font-size: var(--font-18); font-weight: var(--font-regular);`
      : `font-size: var(--font-16); font-weight: var(--font-regular);`}
  color: var(--gray-color);
  cursor: pointer;
`;

const UserInfo = ({ profile }) => {
  return (
    <Wrapper>
      <ProfileImg size={"40"} type={"active"} url={profile.profilePhoto} />
      <Userdesc>
        <UserId
          type={"feed"}
          userNickname={profile.userId}
          createDate={new Date(profile.createdAt)}
          follwed={"팔로우"}
          hover={true}
        />
        <Optional>{profile.userName && profile.userName}</Optional>
      </Userdesc>
    </Wrapper>
  );
};

export default UserInfo;
