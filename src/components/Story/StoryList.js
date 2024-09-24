import React from "react";
import styled from "styled-components";
import StoryItem from "./StoryItem";

const Wrapper = styled.div`
  width: 630px;
  margin: 16px 0 24px;
  padding: 8px 0;
  display: flex;
`;

const StoryList = () => {
  return (
    <Wrapper>
      <StoryItem />
    </Wrapper>
  );
};

export default StoryList;
