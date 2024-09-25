import React from "react";
import styled from "styled-components";
import SideBar from "../components/Common/Sidebar/SideBar";
import HotHashtag from "../components/HotHashtag";
import UserImg from "../components/User/UserImg";
import MainHeader from "../components/Main/MainHeader";
import FeedContent from "../components/Main/FeedContent";

const Wrapper = styled.div`
  display: flex;
`;

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const MainContent = styled.div`
  display: flex;
`;

const FeedSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Main = () => {
  return (
    <Wrapper>
      <SideBar />
      <MainSection>
        <MainHeader />
        <MainContent>
          <FeedSection>
            <div style={{ height: "214px" }}>StoryContent</div>
            <FeedContent />
          </FeedSection>
          <HotHashtag />
        </MainContent>
      </MainSection>
    </Wrapper>
  );
};

export default Main;
