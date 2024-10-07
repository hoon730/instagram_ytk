import React, { useState } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import MyPost from "../components/MyFeed/MyPost";
import MyPostItem from "../components/MyFeed/MyPostItem";

const Wrapper = styled.div`
  width: 936px;
  height: 100vh;
  margin: 0 auto;
  /* border: 1px solid lightgray; */
`;

const MyFeed = () => {
  return (
    <Wrapper>
      <MyPic />
      <MyProfile />
      <MyHighlight />
      <MyFeedTabBar />
      <MyPost />
    </Wrapper>
  );
};

export default MyFeed;
