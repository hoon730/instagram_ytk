import React from "react";
import styled from "styled-components";
import SideBar from "../components/common/Sidebar/SideBar";
import StoryList from "../components/Story/StoryList";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
`;

const Main = () => {
  return (
    <Wrapper>
      <SideBar />
      <StoryList />
    </Wrapper>
  );
};

export default Main;
