import React from "react";
import styled from "styled-components";
import StoryItem from "./StoryItem";
import SlideButton from "../common/SlideButton";

const Wrapper = styled.div`
  width: 1000px;
  margin: 16px auto 24px;
  padding: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #f00;
`;

const StoryContent = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 20px;
  border: 1px solid #0f0;
`;

const styles = {
  bgsize: 26,
  bgcolor: "--light-gray-color",
  fontcolor: "--bg-white-color",
};

const StoryList = () => {
  return (
    <Wrapper>
      <SlideButton type={"left"} {...styles} />
      <StoryContent>
        <StoryItem />
        <StoryItem />
        <StoryItem />
      </StoryContent>
      <SlideButton type={"right"} />
    </Wrapper>
  );
};

export default StoryList;
