import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";

const Wrapper = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

const UserNameSection = styled.div`
  width: 100%;
  p {
    width: 100%;
    font-size: 12px;
    color: ${({ theme }) => theme.fontColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
`;

const StoryItem = ({ userId, imgPath, type }) => {
  return (
    <Wrapper>
      <ProfileImg url={imgPath} size={80} type={type} hover={"noHover"} />
      <UserNameSection>
        <p>{userId}</p>
      </UserNameSection>
    </Wrapper>
  );
};

export default StoryItem;
