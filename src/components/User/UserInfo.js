import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";
import UserId from "./UserId";

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
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
`;



const UserInfo = ({ userName, userNickname, userId, location, type }) => {
  return (
    <Wrapper>
      <ProfileImg
        size={"55"}
        type={"active"}
        url={"/images/userImgs/user123456/profile-photo.jpg"}
      />
      <Userdesc>
        <UserId type={type} userNickname={userNickname}/>
        <Optional type={type}>{userName}</Optional>
      </Userdesc>
    </Wrapper>
  );
};

export default UserInfo;
