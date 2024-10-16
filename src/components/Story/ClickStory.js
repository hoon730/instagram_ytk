import React from "react";
import styled from "styled-components";
import StoryHeader from "./StoryHeader";
import StoryFooterDm from "./StoryFooterDm";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 501}`}px;
  /* height: ${({ size }) => `${size || 891}`}px; */
  height: 891px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  background: pink;
`;

const StoryHeadFoot = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 2;
`;

const StoryMedia = styled.img``;

const ClickStory = ({ url, onClick }) => {
  // const showStory = () => {
  //   onClick();
  // };
  return (
    <Wrapper>
      <StoryHeadFoot>
        <StoryHeader />
        <StoryFooterDm />
      </StoryHeadFoot>
      <StoryMedia src={url} alt="storymedia"></StoryMedia>
    </Wrapper>
  );
};

export default ClickStory;
