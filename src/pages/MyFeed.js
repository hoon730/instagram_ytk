import React, { useState } from "react";
import styled from "styled-components";
import SideBar from "../components/Common/Sidebar/SideBar";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import MyPost from "../components/MyFeed/MyPost";
import MyPostItem from "../components/MyFeed/MyPostItem";

const Container = styled.div`
  display: flex;
`;

const Wrapper = styled.div`
  width: 936px;
  height: 100vh;
  margin: 0 auto;
  /* border: 1px solid lightgray; */
`;

const MyFeed = () => {
  return (
    <Container>
      <SideBar />
      <Wrapper>
        <MyPic />
        <MyProfile />
        <MyHighlight />
        <MyFeedTabBar />
        <MyPost>
          <MyPostItem />
        </MyPost>
      </Wrapper>
    </Container>
  );
};

export default MyFeed;
