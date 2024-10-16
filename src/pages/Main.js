import React from "react";
import styled from "styled-components";
import HotHashtag from "../components/HotHashtag";
import MainHeader from "../components/Main/MainHeader";
import FeedContent from "../components/Main/FeedContent";
import StoryContent from "../components/Story/StoryContent";

const Wrapper = styled.div`
  display: flex;
`;

const MainHeaderMargin = styled.div`
  height: 85px;
  @media screen and (max-width: 630px) {
    height: 74px;
  }
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
  background: ${({ theme }) => theme.bgColor};
  margin-bottom: 70px;
`;

const FeedSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 380px);
  margin: 0 auto;
  @media screen and (max-width: 1350px) {
    width: 100%;
  }
`;

const HotHashtagMargin = styled.div`
  width: 380px;
  @media screen and (max-width: 1170px) {
    display: none;
  }
`;

const Main = () => {
  return (
    <Wrapper>
      <MainSection>
        <MainHeader />
        <MainHeaderMargin />
        <MainContent>
          <FeedSection>
            <StoryContent />
            <FeedContent />
          </FeedSection>
          <HotHashtag />
          <HotHashtagMargin />
        </MainContent>
      </MainSection>
    </Wrapper>
  );
};

export default Main;
