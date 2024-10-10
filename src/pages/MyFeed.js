import React, { useState } from "react";
import styled from "styled-components";
import MyPic from "../components/MyFeed/MyPic";
import MyProfile from "../components/MyFeed/MyProfile";
import MyHighlight from "../components/MyFeed/MyHighlight";
import MyFeedTabBar from "../components/MyFeed/MyFeedTabBar";
import MyPost from "../components/MyFeed/MyPost";
import MyPostItem from "../components/MyFeed/MyPostItem";
import TimeLine from "../components/Detail/TimeLine";

const Wrapper = styled.div`
  width: 934px;
  min-height: 100vh;
  height: fit-content;
  margin: 0 auto;
  background: ${({ theme }) => theme.bgColor};
  color: ${({ theme }) => theme.fontColor};

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const MyFeed = () => {
  return (
    <Wrapper>
      <MyPic />
      <MyProfile />
      <MyHighlight />
      <MyFeedTabBar />
      <TimeLine />
      <MyPost />
    </Wrapper>
  );
};

export default MyFeed;
