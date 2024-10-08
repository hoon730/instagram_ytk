import React from "react";
import styled from "styled-components";
import ProfileImg from "../Profile/ProfileImg";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const UserNameSection = styled.div`
  width: fit-content;
  p {
    font-size: 12px;
    color: ${({ theme }) => theme.fontColor};
  }
`;

const StoryItem = ({ userId, imgPath }) => {
  return (
    <Wrapper>
      <ProfileImg url={imgPath} size={80} type={"active"} hover={"noHover"} />
      <UserNameSection>
        <p>{userId}</p>
      </UserNameSection>
    </Wrapper>
  );
};

export default StoryItem;
