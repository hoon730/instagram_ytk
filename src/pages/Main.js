import React from "react";
import styled from "styled-components";
import SideBar from "../components/Common/Sidebar/SideBar";
import HotHashtag from "../components/HotHashtag";
import MainHeader from "../components/Main/MainHeader";
import FeedContent from "../components/Main/FeedContent";
import StoryContent from "../components/Story/StoryContent";

const Wrapper = styled.div`
  display: flex;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const MainContent = styled.div`
  display: flex;
`;

const FeedSection = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 380px);
`;

const Main = () => {
  return (
    <Wrapper>
      {/* <SideBar /> */}
      <MainSection>
        <MainHeader />
        <MainContent>
          <FeedSection>
            <StoryContent />
            <FeedContent />
          </FeedSection>
          <HotHashtag />
        </MainContent>
      </MainSection>
    </Wrapper>
  );
};

export default Main;
