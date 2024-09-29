import React from "react";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import SlideButton from "../Common/SlideButton";

const Wrapper = styled.div`
  width: calc(100% - 100px);
  height: 180px;
  margin: 0 auto;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StorySection = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
`;

const styles = {
  bgsize: 26,
  bgcolor: "--light-gray-color",
  fontcolor: "--bg-white-color",
};

const StoryContent = () => {
  return (
    <Wrapper>
      <SlideButton type={"left"} {...styles} />
      <StorySection>
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </StorySection>
      <SlideButton type={"right"} />
    </Wrapper>
  );
};

export default StoryContent;
