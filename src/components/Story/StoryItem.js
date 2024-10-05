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

const StoryItem = () => {
  return (
    <Wrapper>
      <ProfileImg
        url={"/images/userImgs/user123456/profile-photo.jpg"}
        size={80}
        type={"active"}
      />
      <UserNameSection>
        <p>CourtneyHenry</p>
      </UserNameSection>
    </Wrapper>
  );
};

export default StoryItem;
