import React from "react";
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

const UserInfo = ({
  userName,
  userNickname,
  userId,
  location,
  type,
  createDate,
  followed,
}) => {
  return (
    <Wrapper>
      <ProfileImg
        size={"45"}
        type={"active"}
        url={"/images/userImgs/user123456/profile-photo.jpg"}
      />
      <Userdesc>
        <UserId
          type={"feed"}
          userNickname={"Hoon"}
          createDate={"24-09-30"}
          follwed={"팔로우"}
        />
        <Optional type={type}>
          {userName ? userName : location ? location : null}
        </Optional>
      </Userdesc>
    </Wrapper>
  );
};

export default UserInfo;
