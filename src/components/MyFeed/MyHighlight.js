import React from "react";
import styled from "styled-components";
import StoryItem from "../Story/StoryItem";
import AddHighlight from "../Story/AddHighlight";

const Wrapper = styled.div`
  width: 100%;
  height: 130px;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
`;

const HighlightBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 50px;
  margin: 0 70px;
  /* border: 1px solid red; */
`;

const MyHighlight = () => {
  return (
    <Wrapper>
      <HighlightBox>
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <StoryItem />
        <AddHighlight />
      </HighlightBox>
    </Wrapper>
  );
};

export default MyHighlight;
