import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3px;
`;

const ImgSection = styled.div`
  border: 1px solid #f00;
  width: fit-content;
`;

const ActivationArea = styled.span`
  display: inline-block;
  width: 96px;
  height: 96px;
  background: linear-gradient(45deg, #f9ce34, #ee2a7b, #6228d7);
  border-radius: 50%;
  position: relative;
`;

const BoundaryLine = styled.span`
  display: inline-block;
  width: 90px;
  height: 90px;
  background: #fff;
  border-radius: 50%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ProfileImg = styled.span`
  display: inline-block;
  width: 86px;
  height: 86px;
  background: url("/images/userImgs/user123456/profile-photo.png") center/cover
    no-repeat;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const UserNameArea = styled.div`
  border: 1px solid #f00;
  width: fit-content;
  p {
    font-size: 12px;
  }
`;

const StoryItem = () => {
  return (
    <Wrapper>
      <ImgSection>
        <ActivationArea>
          <BoundaryLine>
            <ProfileImg></ProfileImg>
          </BoundaryLine>
        </ActivationArea>
      </ImgSection>
      <UserNameArea>
        <p>CourtneyHenry</p>
      </UserNameArea>
    </Wrapper>
  );
};

export default StoryItem;
