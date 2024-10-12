import React from "react";
import styled from "styled-components";
import StoryHeader from "./StoryHeader";
import StoryFooter from "./StoryFooter";

const Wrapper = styled.div`
  width: ${({ size }) => `${size || 501}`}px;
  height: ${({ size }) => `${size || 891}`}px;
  border-radius: 10px;
  border: 1px solid red;
  background: pink;
`;

const StoryMedia = styled.div``;

const ClickStory = ({ url, onClick }) => {
  // const showStory = () => {
  //   onClick();
  // };
  return (
    <Wrapper>
      <StoryHeader />
      <StoryMedia src={url} alt="storymedia"></StoryMedia>
      <StoryFooter />
    </Wrapper>
  );
};

export default ClickStory;
